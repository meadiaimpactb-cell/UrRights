import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { languages, contents } from "@db/schema";

export const languagesRouter = createRouter({
  /** Public: enabled languages for the site picker. */
  list: publicQuery.query(async () => {
    return getDb()
      .select()
      .from(languages)
      .where(eq(languages.enabled, true))
      .orderBy(asc(languages.sortOrder));
  }),

  /** Admin: all languages including disabled. */
  listAll: adminQuery.query(async () => {
    return getDb().select().from(languages).orderBy(asc(languages.sortOrder));
  }),

  /** Admin: add any language. Empty content rows are created for it automatically. */
  create: adminQuery
    .input(
      z.object({
        code: z.string().min(2).max(16).toLowerCase(),
        nameEn: z.string().min(1).max(100),
        nameNative: z.string().min(1).max(100),
        dir: z.enum(["rtl", "ltr"]).default("ltr"),
        sortOrder: z.number().int().default(99),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const [existing] = await db.select().from(languages).where(eq(languages.code, input.code));
      if (existing) throw new Error("LANGUAGE_EXISTS");
      const [{ id }] = await db.insert(languages).values(input).$returningId();
      // create empty copies of every existing content key for the new language
      const keys = await db.selectDistinct({ k: contents.contentKey }).from(contents);
      for (const { k } of keys) {
        await db.insert(contents).values({ contentKey: k, lang: input.code, value: "" });
      }
      return { ok: true, id, keys: keys.length };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        nameEn: z.string().min(1).max(100).optional(),
        nameNative: z.string().min(1).max(100).optional(),
        dir: z.enum(["rtl", "ltr"]).optional(),
        enabled: z.boolean().optional(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await getDb().update(languages).set(data).where(eq(languages.id, id));
      return { ok: true };
    }),

  remove: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [lang] = await db.select().from(languages).where(eq(languages.id, input.id));
      if (lang) {
        await db.delete(contents).where(eq(contents.lang, lang.code));
        await db.delete(languages).where(eq(languages.id, input.id));
      }
      return { ok: true };
    }),
});
