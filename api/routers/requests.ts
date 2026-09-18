import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { requests } from "@db/schema";

export const requestsRouter = createRouter({
  /** Public: beneficiary submits a help request. */
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(200),
        phone: z.string().max(60).default(""),
        lang: z.string().min(2).max(16).default("ar"),
        topic: z.string().max(60).default("other"),
        message: z.string().min(1).max(4000),
      }),
    )
    .mutation(async ({ input }) => {
      const [{ id }] = await getDb().insert(requests).values(input).$returningId();
      return { ok: true, id };
    }),

  /** Admin: list all requests, newest first. */
  list: adminQuery.query(async () => {
    return getDb().select().from(requests).orderBy(desc(requests.createdAt)).limit(500);
  }),

  setStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(["new", "in_progress", "closed"]) }))
    .mutation(async ({ input }) => {
      await getDb().update(requests).set({ status: input.status }).where(eq(requests.id, input.id));
      return { ok: true };
    }),

  remove: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb().delete(requests).where(eq(requests.id, input.id));
      return { ok: true };
    }),
});
