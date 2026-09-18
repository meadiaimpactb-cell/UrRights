import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contents, languages } from "@db/schema";

export const contentRouter = createRouter({
  /** Public: all content entries for one language. */
  byLang: publicQuery
    .input(z.object({ lang: z.string().min(2).max(16) }))
    .query(async ({ input }) => {
      const rows = await getDb()
        .select()
        .from(contents)
        .where(eq(contents.lang, input.lang));
      const map: Record<string, string> = {};
      for (const r of rows) map[r.contentKey] = r.value;
      return map;
    }),

  /** Admin: full matrix (all keys × all languages) for the CMS editor. */
  all: adminQuery.query(async () => {
    const rows = await getDb().select().from(contents).orderBy(asc(contents.contentKey));
    return rows;
  }),

  /** Admin: create or update one entry. */
  upsert: adminQuery
    .input(
      z.object({
        key: z.string().min(1).max(120),
        lang: z.string().min(2).max(16),
        value: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .insert(contents)
        .values({ contentKey: input.key, lang: input.lang, value: input.value })
        .onDuplicateKeyUpdate({ set: { value: input.value } });
      return { ok: true };
    }),

  /** Admin: add a brand-new content key (seeded empty for every enabled language). */
  createKey: adminQuery
    .input(z.object({ key: z.string().min(1).max(120) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const langs = await db.select().from(languages);
      for (const l of langs) {
        const existing = await db.query.contents.findFirst({
          where: (t, { and, eq }) => and(eq(t.contentKey, input.key), eq(t.lang, l.code)),
        });
        if (!existing) {
          await db.insert(contents).values({ contentKey: input.key, lang: l.code, value: "" });
        }
      }
      return { ok: true, count: langs.length };
    }),

  deleteKey: adminQuery
    .input(z.object({ key: z.string().min(1).max(120) }))
    .mutation(async ({ input }) => {
      await getDb().delete(contents).where(eq(contents.contentKey, input.key));
      return { ok: true };
    }),
});
