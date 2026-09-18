import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { createRouter, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { users } from "@db/schema";

export const usersRouter = createRouter({
  /** Super admin: list all registered users. */
  list: adminQuery.query(async () => {
    return getDb().select().from(users).orderBy(asc(users.createdAt));
  }),

  /** Super admin: change a user's role (user / agent / admin). */
  setRole: adminQuery
    .input(z.object({ id: z.number(), role: z.enum(["user", "agent", "admin"]) }))
    .mutation(async ({ input, ctx }) => {
      if (input.id === ctx.user.id && input.role !== "admin") {
        throw new Error("CANNOT_DEMOTE_SELF");
      }
      await getDb().update(users).set({ role: input.role }).where(eq(users.id, input.id));
      return { ok: true };
    }),

  /** Super admin: update display name (used as agent name in chat). */
  setName: adminQuery
    .input(z.object({ id: z.number(), name: z.string().min(1).max(255) }))
    .mutation(async ({ input }) => {
      await getDb().update(users).set({ name: input.name }).where(eq(users.id, input.id));
      return { ok: true };
    }),
});
