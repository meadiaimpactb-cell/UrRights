/**
 * سجل التدقيق وصلاحيات الأدوار.
 *
 * التدقيق: تسجيل أي إجراء إداري مؤثّر مع منفّذه ووقته وعنوانه.
 * الفشل في الكتابة لا يُفشل العملية الأصلية — السجل مساعد لا شرط.
 */
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { auditLog, rolePermissions } from "@db/schema";
import { getDb } from "../queries/connection";

/** أقسام اللوحة التي تُضبط عليها الصلاحيات. */
export const AREAS = [
  "chat",
  "requests",
  "content",
  "sections",
  "questions",
  "languages",
  "partners",
  "settings",
  "users",
  "audit",
] as const;
export type Area = (typeof AREAS)[number];

export const ROLES = ["admin", "agent", "user"] as const;
export type Role = (typeof ROLES)[number];

/**
 * الصلاحيات الافتراضية عند أول تشغيل.
 * المدير يملك كل شيء دائمًا ولا يُحفظ له صف — يُحسب برمجيًا.
 */
export const DEFAULT_PERMISSIONS: Record<Exclude<Role, "admin">, Area[]> = {
  agent: ["chat", "requests"],
  user: [],
};

/** يستخرج عنوان الزائر من رؤوس الوكيل العكسي. */
export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim().slice(0, 60);
  return (headers.get("x-real-ip") ?? "").slice(0, 60);
}

/** يكتب حدثًا في سجل التدقيق. لا يرمي أبدًا. */
export async function audit(opts: {
  userId?: number | null;
  userName?: string;
  action: string;
  resource?: string;
  details?: unknown;
  ip?: string;
  sensitive?: boolean;
}): Promise<void> {
  try {
    await getDb()
      .insert(auditLog)
      .values({
        userId: opts.userId ?? null,
        userName: (opts.userName ?? "").slice(0, 255),
        action: opts.action.slice(0, 80),
        resource: (opts.resource ?? "").slice(0, 80),
        details: opts.details === undefined ? null : JSON.stringify(opts.details).slice(0, 4000),
        ip: opts.ip ?? "",
        sensitive: opts.sensitive ?? false,
      });
  } catch (error) {
    console.error("[audit] تعذّر تسجيل الحدث:", (error as Error)?.message);
  }
}

/** صلاحيات دور واحد كمجموعة أقسام مسموحة. */
export async function allowedAreas(role: string): Promise<Set<string>> {
  if (role === "admin") return new Set(AREAS);
  const rows = await getDb().select().from(rolePermissions).where(eq(rolePermissions.role, role));
  if (rows.length === 0) {
    // لم تُضبط بعد: نستخدم الافتراضي
    return new Set(DEFAULT_PERMISSIONS[role as Exclude<Role, "admin">] ?? []);
  }
  return new Set(rows.filter((r) => r.allowed).map((r) => r.area));
}

/** يرمي FORBIDDEN إن كان الدور لا يملك القسم. */
export async function requireArea(role: string, area: Area): Promise<void> {
  const areas = await allowedAreas(role);
  if (!areas.has(area)) {
    throw new TRPCError({ code: "FORBIDDEN", message: `NO_ACCESS:${area}` });
  }
}

/** يضمن وجود صف لكل (دور، قسم) بالقيم الافتراضية — يُستدعى عند التشغيل. */
export async function ensurePermissionRows(): Promise<number> {
  const db = getDb();
  const existing = await db.select().from(rolePermissions);
  const have = new Set(existing.map((r) => `${r.role}|${r.area}`));
  const rows: { role: string; area: string; allowed: boolean }[] = [];
  for (const role of ["agent", "user"] as const) {
    for (const area of AREAS) {
      if (have.has(`${role}|${area}`)) continue;
      rows.push({ role, area, allowed: DEFAULT_PERMISSIONS[role].includes(area) });
    }
  }
  if (rows.length) await db.insert(rolePermissions).values(rows);
  return rows.length;
}

/** قراءة المصفوفة كاملة للوحة. */
export async function permissionMatrix() {
  const db = getDb();
  const rows = await db.select().from(rolePermissions);
  const out: Record<string, Record<string, boolean>> = {};
  for (const role of ["agent", "user"] as const) {
    out[role] = {};
    for (const area of AREAS) {
      const row = rows.find((r) => r.role === role && r.area === area);
      out[role][area] = row ? row.allowed : DEFAULT_PERMISSIONS[role].includes(area);
    }
  }
  // المدير كامل الصلاحية دائمًا — يُعرض للقراءة فقط
  out.admin = Object.fromEntries(AREAS.map((a) => [a, true]));
  return out;
}

/** حفظ خانة واحدة من المصفوفة. */
export async function setPermission(role: string, area: string, allowed: boolean) {
  if (role === "admin") {
    throw new TRPCError({ code: "BAD_REQUEST", message: "ADMIN_ALWAYS_FULL" });
  }
  await getDb()
    .insert(rolePermissions)
    .values({ role, area, allowed })
    .onDuplicateKeyUpdate({ set: { allowed } });
}

export { and };
