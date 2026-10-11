import { z } from "zod";
import { and, desc, eq, gt, inArray, ne } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { chatSessions, chatMessages, chatFiles, settings } from "@db/schema";
import { translateText } from "../translate";
import { isWithinHours, parseHours } from "../lib/hours";

/** الدردشة متاحة إذا كان المفتاح اليدوي مفعّلًا ونحن داخل أوقات العمل. */
async function isChatEnabled() {
  const rows = await getDb().select().from(settings);
  const map: Record<string, string> = {};
  for (const r of rows) if (r.value != null) map[r.key] = r.value;

  if ((map.chat_enabled ?? "true") !== "true") return false;
  return isWithinHours(parseHours(map));
}

/**
 * لغة الترجمة الافتراضية للمحادثات التي لم يستلمها أحد بعد.
 * تؤخذ من إعداد عام حتى تصل أول رسالة مترجمة قبل الاستلام.
 */
async function defaultAgentLang(): Promise<string> {
  const rows = await getDb().select().from(settings);
  return rows.find((r) => r.key === "default_agent_lang")?.value || "ar";
}

/** يُلحق بكل رسالة بيانات مرفقها (الاسم والنوع ورابط التنزيل). */
async function withAttachments<T extends { attachmentId: number | null }>(msgs: T[]) {
  const ids = msgs.map((m) => m.attachmentId).filter((x): x is number => x != null);
  if (ids.length === 0) return msgs.map((m) => ({ ...m, attachment: null }));
  const files = await getDb().select().from(chatFiles).where(inArray(chatFiles.id, ids));
  return msgs.map((m) => {
    const f = m.attachmentId != null ? files.find((x) => x.id === m.attachmentId) : undefined;
    return {
      ...m,
      attachment: f
        ? { id: f.id, name: f.name, mime: f.mime, size: f.size, url: `/api/files/${f.token}` }
        : null,
    };
  });
}

/** يترجم رسائل الزائر السابقة إلى لغة الموظف عند الاستلام أو تغيير اللغة. */
async function backfillTranslations(sessionId: number, visitorLang: string, agentLang: string) {
  if (agentLang === visitorLang) return;
  const db = getDb();
  const msgs = await db
    .select()
    .from(chatMessages)
    .where(and(eq(chatMessages.sessionId, sessionId), eq(chatMessages.sender, "visitor")));
  for (const msg of msgs) {
    if (msg.translatedLang === agentLang && msg.translatedText) continue;
    const out = await translateText(msg.text, visitorLang, agentLang);
    if (!out) continue;
    await db
      .update(chatMessages)
      .set({ translatedText: out, translatedLang: agentLang })
      .where(eq(chatMessages.id, msg.id));
  }
}

function requireAgent(role: string) {
  if (role !== "agent" && role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Agents only" });
  }
}

export const chatRouter = createRouter({
  /* ------------------------------ visitor ------------------------------ */

  availability: publicQuery.query(async () => {
    return { enabled: await isChatEnabled() };
  }),

  /** Visitor starts a chat session. */
  start: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(200),
        lang: z.string().min(2).max(16).default("ar"),
      }),
    )
    .mutation(async ({ input }) => {
      if (!(await isChatEnabled())) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "CHAT_OFFLINE" });
      }
      const db = getDb();
      const [{ id }] = await db
        .insert(chatSessions)
        .values({ visitorName: input.name, visitorLang: input.lang, status: "waiting" })
        .$returningId();
      return { sessionId: id };
    }),

  /** Visitor sends a message. */
  send: publicQuery
    .input(
      z.object({
        sessionId: z.number(),
        // الرسالة قد تكون مرفقًا بلا نص
        text: z.string().max(2000).default(""),
        attachmentId: z.number().nullable().default(null),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const session = await db.query.chatSessions.findFirst({
        where: eq(chatSessions.id, input.sessionId),
      });
      if (!session || session.status === "closed") {
        throw new TRPCError({ code: "NOT_FOUND", message: "SESSION_CLOSED" });
      }
      if (!input.text.trim() && input.attachmentId == null) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "EMPTY_MESSAGE" });
      }
      // تُترجم رسالة الزائر فورًا حتى لو لم يستلم أحد المحادثة بعد،
      // فأول رسالة هي الأهم ويجب أن يفهمها الموظف لحظة فتحها.
      let translatedText: string | null = null;
      let translatedLang: string | null = null;
      const target = session.agentLang || (await defaultAgentLang());
      if (input.text.trim() && session.translateEnabled && target !== session.visitorLang) {
        translatedText = await translateText(input.text, session.visitorLang, target);
        translatedLang = translatedText ? target : null;
      }
      const [{ id }] = await db
        .insert(chatMessages)
        .values({
          sessionId: input.sessionId,
          sender: "visitor",
          text: input.text,
          lang: session.visitorLang,
          translatedText,
          translatedLang,
          attachmentId: input.attachmentId,
        })
        .$returningId();
      await db
        .update(chatSessions)
        .set({ lastMessageAt: new Date() })
        .where(eq(chatSessions.id, input.sessionId));
      return { ok: true, id };
    }),

  /** Visitor polls for new messages + session state. */
  poll: publicQuery
    .input(z.object({ sessionId: z.number(), afterId: z.number().default(0) }))
    .query(async ({ input }) => {
      const db = getDb();
      const session = await db.query.chatSessions.findFirst({
        where: eq(chatSessions.id, input.sessionId),
      });
      if (!session) throw new TRPCError({ code: "NOT_FOUND" });
      const msgs = await db
        .select()
        .from(chatMessages)
        .where(and(eq(chatMessages.sessionId, input.sessionId), gt(chatMessages.id, input.afterId)))
        .orderBy(chatMessages.id);
      return {
        session: {
          id: session.id,
          status: session.status,
          agentName: session.agentName,
          visitorLang: session.visitorLang,
        },
        messages: await withAttachments(msgs),
      };
    }),

  closeByVisitor: publicQuery
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ input }) => {
      await getDb()
        .update(chatSessions)
        .set({ status: "closed" })
        .where(eq(chatSessions.id, input.sessionId));
      return { ok: true };
    }),

  /* ------------------------------- agent ------------------------------- */

  /** Agent dashboard: queue (waiting) + my active sessions + recently closed. */
  queue: authedQuery.query(async ({ ctx }) => {
    requireAgent(ctx.user.role);
    const db = getDb();
    const waiting = await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.status, "waiting"))
      .orderBy(desc(chatSessions.lastMessageAt))
      .limit(50);
    const mine = await db
      .select()
      .from(chatSessions)
      .where(and(eq(chatSessions.status, "active"), eq(chatSessions.agentId, ctx.user.id)))
      .orderBy(desc(chatSessions.lastMessageAt))
      .limit(50);
    const closed = await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.status, "closed"))
      .orderBy(desc(chatSessions.lastMessageAt))
      .limit(20);

    // آخر رسالة لكل محادثة — حتى يرى الموظف مضمون الطلب قبل استلامه
    const ids = [...waiting, ...mine, ...closed].map((s) => s.id);
    const previews = new Map<number, { text: string; sender: string; at: Date }>();
    if (ids.length) {
      const rows = await db
        .select()
        .from(chatMessages)
        .where(and(inArray(chatMessages.sessionId, ids), ne(chatMessages.sender, "system")))
        .orderBy(desc(chatMessages.id))
        .limit(500);
      for (const r of rows) {
        // الصفوف مرتبة تنازليًا، فأول ما نصادفه لكل محادثة هو الأحدث
        if (!previews.has(r.sessionId)) {
          previews.set(r.sessionId, { text: r.text.slice(0, 120), sender: r.sender, at: r.createdAt });
        }
      }
    }
    const withPreview = (list: typeof waiting) =>
      list.map((s) => ({ ...s, preview: previews.get(s.id) ?? null }));

    return {
      waiting: withPreview(waiting),
      mine: withPreview(mine),
      closed: withPreview(closed),
      me: { id: ctx.user.id, name: ctx.user.name ?? "" },
    };
  }),

  /** Agent picks up a waiting session. */
  claim: authedQuery
    .input(z.object({ sessionId: z.number(), agentLang: z.string().min(2).max(16).default("ar") }))
    .mutation(async ({ ctx, input }) => {
      requireAgent(ctx.user.role);
      const db = getDb();
      const session = await db.query.chatSessions.findFirst({
        where: eq(chatSessions.id, input.sessionId),
      });
      if (!session) throw new TRPCError({ code: "NOT_FOUND" });
      if (session.status === "active" && session.agentId !== ctx.user.id) {
        throw new TRPCError({ code: "CONFLICT", message: "ALREADY_CLAIMED" });
      }
      const agentName = ctx.user.name?.trim() || "Agent";
      // لغة الموظف المحفوظة في حسابه هي المرجع؛ وما يرسله العميل مجرد احتياط.
      const agentLang = ctx.user.chatLang || input.agentLang;
      await db
        .update(chatSessions)
        .set({
          status: "active",
          agentId: ctx.user.id,
          agentName,
          agentLang,
        })
        .where(eq(chatSessions.id, input.sessionId));

      // ترجمة ما كتبه الزائر قبل الاستلام إلى لغة الموظف
      await backfillTranslations(input.sessionId, session.visitorLang, agentLang);
      await db.insert(chatMessages).values({
        sessionId: input.sessionId,
        sender: "system",
        text: agentName, // client renders "you are now with {name}"
        lang: "system",
      });
      return { ok: true, agentName, agentLang };
    }),

  /** Agent sends a message (auto-translated to the visitor's language). */
  agentSend: authedQuery
    .input(
      z.object({
        sessionId: z.number(),
        text: z.string().max(2000).default(""),
        attachmentId: z.number().nullable().default(null),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      requireAgent(ctx.user.role);
      const db = getDb();
      const session = await db.query.chatSessions.findFirst({
        where: eq(chatSessions.id, input.sessionId),
      });
      if (!session || session.status !== "active") {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "NOT_ACTIVE" });
      }
      if (!input.text.trim() && input.attachmentId == null) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "EMPTY_MESSAGE" });
      }
      let translatedText: string | null = null;
      let translatedLang: string | null = null;
      if (input.text.trim() && session.translateEnabled && session.agentLang !== session.visitorLang) {
        translatedText = await translateText(input.text, session.agentLang, session.visitorLang);
        translatedLang = translatedText ? session.visitorLang : null;
      }
      await db.insert(chatMessages).values({
        sessionId: input.sessionId,
        sender: "agent",
        text: input.text,
        lang: session.agentLang,
        translatedText,
        translatedLang,
        attachmentId: input.attachmentId,
      });
      await db
        .update(chatSessions)
        .set({ lastMessageAt: new Date() })
        .where(eq(chatSessions.id, input.sessionId));
      return { ok: true, translatedText };
    }),

  /** الموظف يغيّر لغة قراءته لهذه المحادثة، وتُعاد ترجمة ما سبق. */
  setAgentLang: authedQuery
    .input(z.object({ sessionId: z.number(), lang: z.string().min(2).max(16) }))
    .mutation(async ({ ctx, input }) => {
      requireAgent(ctx.user.role);
      const db = getDb();
      const session = await db.query.chatSessions.findFirst({
        where: eq(chatSessions.id, input.sessionId),
      });
      if (!session) throw new TRPCError({ code: "NOT_FOUND" });
      await db
        .update(chatSessions)
        .set({ agentLang: input.lang })
        .where(eq(chatSessions.id, input.sessionId));
      await backfillTranslations(input.sessionId, session.visitorLang, input.lang);
      return { ok: true };
    }),

  /** Agent toggles live translation for a session. */
  setTranslate: authedQuery
    .input(z.object({ sessionId: z.number(), enabled: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      requireAgent(ctx.user.role);
      await getDb()
        .update(chatSessions)
        .set({ translateEnabled: input.enabled })
        .where(eq(chatSessions.id, input.sessionId));
      return { ok: true };
    }),

  /** Agent polls one open conversation for new messages. */
  agentPoll: authedQuery
    .input(z.object({ sessionId: z.number(), afterId: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      requireAgent(ctx.user.role);
      const db = getDb();
      const session = await db.query.chatSessions.findFirst({
        where: eq(chatSessions.id, input.sessionId),
      });
      if (!session) throw new TRPCError({ code: "NOT_FOUND" });
      const msgs = await db
        .select()
        .from(chatMessages)
        .where(and(eq(chatMessages.sessionId, input.sessionId), gt(chatMessages.id, input.afterId)))
        .orderBy(chatMessages.id);
      return { session, messages: await withAttachments(msgs) };
    }),

  closeByAgent: authedQuery
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      requireAgent(ctx.user.role);
      await getDb()
        .update(chatSessions)
        .set({ status: "closed" })
        .where(eq(chatSessions.id, input.sessionId));
      return { ok: true };
    }),

  /** Admin overview: chat stats for the dashboard. */
  stats: adminQuery.query(async () => {
    const db = getDb();
    const all = await db.select().from(chatSessions);
    return {
      total: all.length,
      waiting: all.filter((s) => s.status === "waiting").length,
      active: all.filter((s) => s.status === "active").length,
      closed: all.filter((s) => s.status === "closed").length,
    };
  }),

  /** Cleanup helper for admins: close stale waiting sessions. */
  closeStale: adminQuery.mutation(async () => {
    const db = getDb();
    const stale = await db
      .select()
      .from(chatSessions)
      .where(ne(chatSessions.status, "closed"));
    const now = Date.now();
    let n = 0;
    for (const s of stale) {
      if (now - s.lastMessageAt.getTime() > 24 * 60 * 60 * 1000) {
        await db.update(chatSessions).set({ status: "closed" }).where(eq(chatSessions.id, s.id));
        n++;
      }
    }
    return { ok: true, closed: n };
  }),

  sessionsByIds: authedQuery
    .input(z.object({ ids: z.array(z.number()).max(50) }))
    .query(async ({ ctx, input }) => {
      requireAgent(ctx.user.role);
      if (input.ids.length === 0) return [];
      return getDb().select().from(chatSessions).where(inArray(chatSessions.id, input.ids));
    }),
});
