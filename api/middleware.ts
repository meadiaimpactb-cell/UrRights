import { ErrorMessages } from "@contracts/constants";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const createRouter = t.router;
export const publicQuery = t.procedure;

const requireAuth = t.middleware(async (opts) => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: ErrorMessages.unauthenticated,
    });
  }

  return next({ ctx: { ...ctx, user: ctx.user } });
});

function requireRole(role: string) {
  return t.middleware(async (opts) => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== role) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: ErrorMessages.insufficientRole,
      });
    }

    return next({ ctx: { ...ctx, user: ctx.user } });
  });
}

export const authedQuery = t.procedure.use(requireAuth);
export const adminQuery = authedQuery.use(requireRole("admin"));

/**
 * إجراء يتطلّب صلاحية قسم محدد حسب مصفوفة الأدوار.
 * المدير يملك كل الأقسام دائمًا؛ وبقية الأدوار حسب ما ضبطه المسؤول.
 */
export function areaQuery(area: string) {
  return authedQuery.use(
    t.middleware(async (opts) => {
      const { ctx, next } = opts;
      const { allowedAreas } = await import("./lib/audit");
      const areas = await allowedAreas(ctx.user!.role);
      if (!areas.has(area)) {
        throw new TRPCError({ code: "FORBIDDEN", message: `NO_ACCESS:${area}` });
      }
      return next({ ctx: { ...ctx, user: ctx.user! } });
    }),
  );
}
