import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { users } from "@db/schema";
import { getDb } from "./queries/connection";
import { findUserByEmail } from "./queries/users";
import { hashPassword, verifyPassword } from "./auth/password";
import { sessionCookie, clearSessionCookie } from "./auth";
import { createRouter, authedQuery, publicQuery } from "./middleware";

function publicUser(u: typeof users.$inferSelect) {
  // Never send the password hash to the browser.
  const { passwordHash: _omit, ...rest } = u;
  void _omit;
  return rest;
}

export const authRouter = createRouter({
  me: authedQuery.query(({ ctx }) => publicUser(ctx.user)),

  login: publicQuery
    .input(
      z.object({
        email: z.string().trim().toLowerCase().email().max(320),
        password: z.string().min(1).max(200),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await findUserByEmail(input.email);
      const ok = user ? await verifyPassword(input.password, user.passwordHash) : false;
      if (!user || !ok) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "INVALID_CREDENTIALS" });
      }
      await getDb()
        .update(users)
        .set({ lastSignInAt: new Date() })
        .where(eq(users.id, user.id));
      ctx.resHeaders.append("set-cookie", await sessionCookie(ctx.req.headers, user.id));
      return publicUser(user);
    }),

  logout: authedQuery.mutation(async ({ ctx }) => {
    ctx.resHeaders.append("set-cookie", clearSessionCookie(ctx.req.headers));
    return { success: true };
  }),

  changePassword: authedQuery
    .input(
      z.object({
        current: z.string().min(1).max(200),
        next: z.string().min(8).max(200),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const ok = await verifyPassword(input.current, ctx.user.passwordHash);
      if (!ok) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "INVALID_CREDENTIALS" });
      }
      await getDb()
        .update(users)
        .set({ passwordHash: await hashPassword(input.next) })
        .where(eq(users.id, ctx.user.id));
      return { success: true };
    }),
});
