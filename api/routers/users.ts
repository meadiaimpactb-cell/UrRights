import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { asc, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { createRouter, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { findUserByEmail } from "../queries/users";
import { hashPassword } from "../auth/password";
import { users } from "@db/schema";

const roleSchema = z.enum(["user", "agent", "admin"]);

const safeColumns = {
  id: users.id,
  unionId: users.unionId,
  name: users.name,
  email: users.email,
  avatar: users.avatar,
  role: users.role,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
  lastSignInAt: users.lastSignInAt,
};

export const usersRouter = createRouter({
  /** Super admin: list all registered users (without password hashes). */
  list: adminQuery.query(async () => {
    return getDb().select(safeColumns).from(users).orderBy(asc(users.createdAt));
  }),

  /** Super admin: create a user with email + password. */
  create: adminQuery
    .input(
      z.object({
        name: z.string().trim().min(1).max(255),
        email: z.string().trim().toLowerCase().email().max(320),
        password: z.string().min(8).max(200),
        role: roleSchema.default("agent"),
      }),
    )
    .mutation(async ({ input }) => {
      if (await findUserByEmail(input.email)) {
        throw new TRPCError({ code: "CONFLICT", message: "EMAIL_TAKEN" });
      }
      await getDb().insert(users).values({
        unionId: randomUUID(),
        name: input.name,
        email: input.email,
        passwordHash: await hashPassword(input.password),
        role: input.role,
      });
      return { ok: true };
    }),

  /** Super admin: change a user's role (user / agent / admin). */
  setRole: adminQuery
    .input(z.object({ id: z.number(), role: roleSchema }))
    .mutation(async ({ input, ctx }) => {
      if (input.id === ctx.user.id && input.role !== "admin") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "CANNOT_DEMOTE_SELF" });
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

  /** Super admin: set a new password for any user. */
  setPassword: adminQuery
    .input(z.object({ id: z.number(), password: z.string().min(8).max(200) }))
    .mutation(async ({ input }) => {
      await getDb()
        .update(users)
        .set({ passwordHash: await hashPassword(input.password) })
        .where(eq(users.id, input.id));
      return { ok: true };
    }),

  /** Super admin: delete a user (not yourself). */
  remove: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (input.id === ctx.user.id) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "CANNOT_DELETE_SELF" });
      }
      await getDb().delete(users).where(eq(users.id, input.id));
      return { ok: true };
    }),
});
