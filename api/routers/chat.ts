import { z } from "zod";
import { and, desc, eq, gt, inArray, ne } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { chatSessions, chatMessages, settings } from "@db/schema";
import { translateText } from "../translate";

async function isChatEnabled() {
  const db = getDb();
  const row = await db.query.settings.findFirst({
    where: eq(settings.key, "chat_enabled"),
  });
  return (row?.value ?? "true") === "true";
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
    .input(z.object({ sessionId: z.number(), text: z.string().min(1).max(2000) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const session = await db.query.chatSessions.findFirst({
        where: eq(chatSessions.id, input.sessionId),
      });
      if (!session || session.status === "closed") {
        throw new TRPCError({ code: "NOT_FOUND", message: "SESSION_CLOSED" });
      }
      let translatedText: string | null = null;
      let translatedLang: string | null = null;
      if (session.status === "active" && session.translateEnabled && session.agentLang !== session.visitorLang) {
        translatedText = await translateText(input.text, session.visitorLang, session.agentLang);
        translatedLang = translatedText ? session.agentLang : null;
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
        messages: msgs,
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
    return { waiting, mine, closed, me: { id: ctx.user.id, name: ctx.user.name ?? "" } };
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
      await db
        .update(chatSessions)
        .set({
          status: "active",
          agentId: ctx.user.id,
          agentName,
          agentLang: input.agentLang,
        })
        .where(eq(chatSessions.id, input.sessionId));
      await db.insert(chatMessages).values({
        sessionId: input.sessionId,
        sender: "system",
        text: agentName, // client renders "you are now with {name}"
        lang: "system",
      });
      return { ok: true, agentName };
    }),

  /** Agent sends a message (auto-translated to the visitor's language). */
  agentSend: authedQuery
    .input(z.object({ sessionId: z.number(), text: z.string().min(1).max(2000) }))
    .mutation(async ({ ctx, input }) => {
      requireAgent(ctx.user.role);
      const db = getDb();
      const session = await db.query.chatSessions.findFirst({
        where: eq(chatSessions.id, input.sessionId),
      });
      if (!session || session.status !== "active") {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "NOT_ACTIVE" });
      }
      let translatedText: string | null = null;
      let translatedLang: string | null = null;
      if (session.translateEnabled && session.agentLang !== session.visitorLang) {
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
      });
      await db
        .update(chatSessions)
        .set({ lastMessageAt: new Date() })
        .where(eq(chatSessions.id, input.sessionId));
      return { ok: true, translatedText };
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
      return { session, messages: msgs };
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
