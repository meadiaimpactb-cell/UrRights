import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contents, languages, questionOptions, questions } from "@db/schema";

/** ينشئ صفوف المحتوى لمفتاح جديد في كل اللغات. */
async function seedKey(key: string, valueAr: string, valueEn: string) {
  const db = getDb();
  const langs = await db.select().from(languages);
  for (const l of langs) {
    const value = l.code === "ar" ? valueAr : l.code === "en" ? valueEn || valueAr : "";
    await db
      .insert(contents)
      .values({ contentKey: key, lang: l.code, value })
      .onDuplicateKeyUpdate({ set: { contentKey: key } });
  }
}

/** مفتاح فريد لسؤال أو خيار جديد. */
function freshKey(prefix: string, taken: Set<string>): string {
  let n = 1;
  while (taken.has(`${prefix}${n}`)) n++;
  return `${prefix}${n}`;
}

export const questionsRouter = createRouter({
  /* ------------------------------ public ------------------------------ */

  /** أسئلة نوع مشكلة واحد مع خياراتها، مرتّبة والمفعّلة فقط. */
  byTopic: publicQuery
    .input(z.object({ topic: z.string().min(1).max(60) }))
    .query(async ({ input }) => {
      const db = getDb();
      const qs = await db
        .select()
        .from(questions)
        .where(eq(questions.topicKey, input.topic))
        .orderBy(asc(questions.sortOrder), asc(questions.id));
      const live = qs.filter((q) => q.enabled);
      if (live.length === 0) return [];

      const opts = await db
        .select()
        .from(questionOptions)
        .orderBy(asc(questionOptions.sortOrder), asc(questionOptions.id));
      return live.map((q) => ({
        id: q.id,
        labelKey: q.labelKey,
        required: q.required,
        options: opts
          .filter((o) => o.questionId === q.id && o.enabled)
          .map((o) => ({ id: o.id, labelKey: o.labelKey })),
      }));
    }),

  /* ------------------------------- admin ------------------------------ */

  /** كل الأسئلة والخيارات لإدارتها من اللوحة. */
  all: adminQuery.query(async () => {
    const db = getDb();
    const qs = await db
      .select()
      .from(questions)
      .orderBy(asc(questions.topicKey), asc(questions.sortOrder), asc(questions.id));
    const opts = await db
      .select()
      .from(questionOptions)
      .orderBy(asc(questionOptions.sortOrder), asc(questionOptions.id));
    return qs.map((q) => ({
      ...q,
      options: opts.filter((o) => o.questionId === q.id),
    }));
  }),

  addQuestion: adminQuery
    .input(
      z.object({
        topic: z.string().min(1).max(60),
        textAr: z.string().min(1).max(500),
        textEn: z.string().max(500).default(""),
        required: z.boolean().default(true),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db.select().from(questions).where(eq(questions.topicKey, input.topic));
      const taken = new Set(existing.map((q) => q.labelKey));
      const labelKey = freshKey(`q.${input.topic}.`, taken);
      await seedKey(labelKey, input.textAr, input.textEn);
      const maxOrder = existing.reduce((m, q) => Math.max(m, q.sortOrder), 0);
      await db.insert(questions).values({
        topicKey: input.topic,
        labelKey,
        sortOrder: maxOrder + 1,
        required: input.required,
      });
      return { ok: true, labelKey };
    }),

  updateQuestion: adminQuery
    .input(
      z.object({
        id: z.number(),
        enabled: z.boolean().optional(),
        required: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      const patch = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));
      if (Object.keys(patch).length) {
        await getDb().update(questions).set(patch).where(eq(questions.id, id));
      }
      return { ok: true };
    }),

  moveQuestion: adminQuery
    .input(z.object({ id: z.number(), dir: z.enum(["up", "down"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const row = await db.query.questions.findFirst({ where: eq(questions.id, input.id) });
      if (!row) throw new TRPCError({ code: "NOT_FOUND" });
      const siblings = await db
        .select()
        .from(questions)
        .where(eq(questions.topicKey, row.topicKey))
        .orderBy(asc(questions.sortOrder), asc(questions.id));
      const i = siblings.findIndex((q) => q.id === row.id);
      const j = input.dir === "up" ? i - 1 : i + 1;
      if (j < 0 || j >= siblings.length) return { ok: true };
      const list = [...siblings];
      [list[i], list[j]] = [list[j], list[i]];
      for (let k = 0; k < list.length; k++) {
        await db.update(questions).set({ sortOrder: k + 1 }).where(eq(questions.id, list[k].id));
      }
      return { ok: true };
    }),

  /** ترتيب أسئلة نوع مشكلة كاملًا بعد السحب والإفلات. */
  reorderQuestions: adminQuery
    .input(z.object({ ids: z.array(z.number()).max(50) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      for (let i = 0; i < input.ids.length; i++) {
        await db.update(questions).set({ sortOrder: i + 1 }).where(eq(questions.id, input.ids[i]));
      }
      return { ok: true };
    }),

  /** ترتيب خيارات سؤال كاملًا بعد السحب والإفلات. */
  reorderOptions: adminQuery
    .input(z.object({ ids: z.array(z.number()).max(50) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      for (let i = 0; i < input.ids.length; i++) {
        await db
          .update(questionOptions)
          .set({ sortOrder: i + 1 })
          .where(eq(questionOptions.id, input.ids[i]));
      }
      return { ok: true };
    }),

  /** حذف سؤال مع خياراته ونصوصه في كل اللغات. */
  removeQuestion: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const row = await db.query.questions.findFirst({ where: eq(questions.id, input.id) });
      if (!row) return { ok: true };
      const opts = await db.select().from(questionOptions).where(eq(questionOptions.questionId, row.id));
      for (const o of opts) {
        await db.delete(contents).where(eq(contents.contentKey, o.labelKey));
      }
      await db.delete(questionOptions).where(eq(questionOptions.questionId, row.id));
      await db.delete(contents).where(eq(contents.contentKey, row.labelKey));
      await db.delete(questions).where(eq(questions.id, row.id));
      return { ok: true };
    }),

  addOption: adminQuery
    .input(
      z.object({
        questionId: z.number(),
        textAr: z.string().min(1).max(500),
        textEn: z.string().max(500).default(""),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const q = await db.query.questions.findFirst({ where: eq(questions.id, input.questionId) });
      if (!q) throw new TRPCError({ code: "NOT_FOUND" });
      const existing = await db
        .select()
        .from(questionOptions)
        .where(eq(questionOptions.questionId, q.id));
      const taken = new Set(existing.map((o) => o.labelKey));
      const labelKey = freshKey(`${q.labelKey}.o`, taken);
      await seedKey(labelKey, input.textAr, input.textEn);
      const maxOrder = existing.reduce((m, o) => Math.max(m, o.sortOrder), 0);
      await db
        .insert(questionOptions)
        .values({ questionId: q.id, labelKey, sortOrder: maxOrder + 1 });
      return { ok: true, labelKey };
    }),

  updateOption: adminQuery
    .input(z.object({ id: z.number(), enabled: z.boolean() }))
    .mutation(async ({ input }) => {
      await getDb()
        .update(questionOptions)
        .set({ enabled: input.enabled })
        .where(eq(questionOptions.id, input.id));
      return { ok: true };
    }),

  moveOption: adminQuery
    .input(z.object({ id: z.number(), dir: z.enum(["up", "down"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const row = await db.query.questionOptions.findFirst({
        where: eq(questionOptions.id, input.id),
      });
      if (!row) throw new TRPCError({ code: "NOT_FOUND" });
      const siblings = await db
        .select()
        .from(questionOptions)
        .where(eq(questionOptions.questionId, row.questionId))
        .orderBy(asc(questionOptions.sortOrder), asc(questionOptions.id));
      const i = siblings.findIndex((o) => o.id === row.id);
      const j = input.dir === "up" ? i - 1 : i + 1;
      if (j < 0 || j >= siblings.length) return { ok: true };
      const list = [...siblings];
      [list[i], list[j]] = [list[j], list[i]];
      for (let k = 0; k < list.length; k++) {
        await db
          .update(questionOptions)
          .set({ sortOrder: k + 1 })
          .where(eq(questionOptions.id, list[k].id));
      }
      return { ok: true };
    }),

  removeOption: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const row = await db.query.questionOptions.findFirst({
        where: eq(questionOptions.id, input.id),
      });
      if (!row) return { ok: true };
      await db.delete(contents).where(eq(contents.contentKey, row.labelKey));
      await db.delete(questionOptions).where(eq(questionOptions.id, row.id));
      return { ok: true };
    }),
});
