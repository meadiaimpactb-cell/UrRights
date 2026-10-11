import { z } from "zod";
import { and, desc, eq, gte, like, lte, or, sql } from "drizzle-orm";
import { createRouter, adminQuery, authedQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { auditLog } from "@db/schema";
import {
  AREAS,
  allowedAreas,
  ensurePermissionRows,
  permissionMatrix,
  setPermission,
} from "../lib/audit";

export const adminRouter = createRouter({
  /* --------------------------- الصلاحيات --------------------------- */

  /** الأقسام المسموحة للمستخدم الحالي — تستخدمها اللوحة لإخفاء ما لا يملكه. */
  myAreas: authedQuery.query(async ({ ctx }) => {
    return [...(await allowedAreas(ctx.user.role))];
  }),

  /** مصفوفة الأدوار والصلاحيات كاملة. */
  permissions: adminQuery.query(async () => {
    await ensurePermissionRows();
    return { areas: [...AREAS], matrix: await permissionMatrix() };
  }),

  setPermission: adminQuery
    .input(
      z.object({
        role: z.enum(["agent", "user"]),
        area: z.enum(AREAS),
        allowed: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await setPermission(input.role, input.area, input.allowed);
      const { audit, clientIp } = await import("../lib/audit");
      await audit({
        userId: ctx.user.id,
        userName: ctx.user.name ?? "",
        action: "permission.change",
        resource: `${input.role}/${input.area}`,
        details: { allowed: input.allowed },
        ip: clientIp(ctx.req.headers),
        sensitive: true,
      });
      return { ok: true };
    }),

  /* -------------------------- سجل التدقيق -------------------------- */

  auditLog: adminQuery
    .input(
      z
        .object({
          q: z.string().max(200).default(""),
          action: z.string().max(80).default(""),
          userId: z.number().nullable().default(null),
          from: z.string().max(40).default(""),
          to: z.string().max(40).default(""),
          sensitiveOnly: z.boolean().default(false),
          limit: z.number().min(1).max(500).default(100),
        })
        .optional(),
    )
    .query(async ({ input: raw }) => {
      const input = {
        q: "",
        action: "",
        userId: null as number | null,
        from: "",
        to: "",
        sensitiveOnly: false,
        limit: 100,
        ...(raw ?? {}),
      };
      const db = getDb();
      const where = [];
      if (input.q.trim()) {
        const n = `%${input.q.trim()}%`;
        where.push(
          or(
            like(auditLog.userName, n),
            like(auditLog.action, n),
            like(auditLog.resource, n),
            like(auditLog.details, n),
          ),
        );
      }
      if (input.action) where.push(eq(auditLog.action, input.action));
      if (input.userId != null) where.push(eq(auditLog.userId, input.userId));
      if (input.sensitiveOnly) where.push(eq(auditLog.sensitive, true));
      if (input.from) where.push(gte(auditLog.createdAt, new Date(input.from)));
      if (input.to) {
        const end = new Date(input.to);
        end.setHours(23, 59, 59, 999);
        where.push(lte(auditLog.createdAt, end));
      }

      const rows = await db
        .select()
        .from(auditLog)
        .where(where.length ? and(...where) : undefined)
        .orderBy(desc(auditLog.createdAt))
        .limit(input.limit);

      const [{ total }] = await db
        .select({ total: sql<number>`count(*)` })
        .from(auditLog)
        .where(where.length ? and(...where) : undefined);

      return { rows, total: Number(total) };
    }),

  /** قوائم التصفية: الإجراءات والمنفّذون الموجودون فعلًا في السجل. */
  auditFilters: adminQuery.query(async () => {
    const db = getDb();
    const actions = await db
      .selectDistinct({ action: auditLog.action })
      .from(auditLog)
      .orderBy(auditLog.action);
    const actors = await db
      .selectDistinct({ userId: auditLog.userId, userName: auditLog.userName })
      .from(auditLog);
    return {
      actions: actions.map((a) => a.action).filter(Boolean),
      actors: actors.filter((a) => a.userId != null),
    };
  }),
});
