import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { partners } from "@db/schema";

export const partnersRouter = createRouter({
  list: publicQuery.query(async () => {
    return getDb()
      .select()
      .from(partners)
      .where(eq(partners.enabled, true))
      .orderBy(asc(partners.sortOrder));
  }),

  listAll: adminQuery.query(async () => {
    return getDb().select().from(partners).orderBy(asc(partners.sortOrder));
  }),

  create: adminQuery
    .input(
      z.object({
        nameAr: z.string().min(1).max(200),
        nameEn: z.string().max(200).default(""),
        logoUrl: z.string().max(2000).default(""),
        websiteUrl: z.string().max(2000).default(""),
        sortOrder: z.number().int().default(99),
      }),
    )
    .mutation(async ({ input }) => {
      const [{ id }] = await getDb().insert(partners).values(input).$returningId();
      return { ok: true, id };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        nameAr: z.string().min(1).max(200).optional(),
        nameEn: z.string().max(200).optional(),
        logoUrl: z.string().max(2000).optional(),
        websiteUrl: z.string().max(2000).optional(),
        sortOrder: z.number().int().optional(),
        enabled: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await getDb().update(partners).set(data).where(eq(partners.id, id));
      return { ok: true };
    }),

  remove: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb().delete(partners).where(eq(partners.id, input.id));
      return { ok: true };
    }),
});
