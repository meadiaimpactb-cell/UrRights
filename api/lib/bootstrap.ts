/**
 * تهيئة قاعدة البيانات عند تشغيل الخادم في الإنتاج (بدون سطر أوامر على الاستضافة):
 *   1. تطبيق الهجرات من db/migrations (ينشئ/يحدّث الجداول).
 *   2. تعبئة اللغات والإعدادات والمحتوى الأساسي إن كانت الجداول فارغة.
 *   3. إنشاء حساب المدير من ADMIN_EMAIL / ADMIN_PASSWORD إن لم يكن موجودًا.
 *
 * كل الخطوات آمنة للتكرار. يمكن تعطيلها بـ AUTO_MIGRATE=false.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { count, eq, sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { languages, settings as settingsTable, users } from "@db/schema";
import { getDb } from "../queries/connection";
import { findUserByEmail } from "../queries/users";
import { hashPassword } from "../auth/password";
import { env } from "./env";

function findMigrationsFolder(): string | null {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(process.cwd(), "db/migrations"),
    path.resolve(here, "../db/migrations"),
    path.resolve(here, "../../db/migrations"),
  ];
  return candidates.find((p) => fs.existsSync(path.join(p, "meta/_journal.json"))) ?? null;
}

export async function bootstrapDatabase() {
  if (process.env.AUTO_MIGRATE === "false") return;
  const db = getDb();

  // 1) الهجرات
  const folder = findMigrationsFolder();
  if (folder) {
    await migrate(db, { migrationsFolder: folder });
    console.log("[bootstrap] migrations applied");
  } else {
    console.warn("[bootstrap] db/migrations not found — skipping migrations");
  }

  // 2) المحتوى الأساسي
  const [{ n: langCount }] = await db.select({ n: count() }).from(languages);
  if (langCount === 0) {
    const { runSeed } = await import("../../db/seed.mjs");
    await runSeed({ url: env.databaseUrl });
    console.log("[bootstrap] seed completed");
  }

  // 3) مزامنة النصوص: إضافة أي مفاتيح جديدة، وتطبيق مراجعات النصوص مرة واحدة.
  //    لا تمسّ النصوص التي عدّلها المسؤول من لوحة التحكم.
  try {
    const { syncContent, CONTENT_REVISION } = await import("../../db/seed.mjs");
    const revRow = await db
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.key, "content_revision"))
      .limit(1);
    const from = Number(revRow.at(0)?.value ?? 0) || 0;

    const res = await syncContent({ url: env.databaseUrl, revisionFrom: from });
    if (res.added || res.revised) {
      console.log(`[bootstrap] content sync: +${res.added} keys, ${res.revised} revised`);
    }
    if (from < CONTENT_REVISION) {
      await db
        .insert(settingsTable)
        .values({ key: "content_revision", value: String(CONTENT_REVISION) })
        .onDuplicateKeyUpdate({ set: { value: String(CONTENT_REVISION) } });
    }
  } catch (error) {
    console.error("[bootstrap] content sync failed:", describeDbError(error));
  }

  // 4) الإعدادات الجديدة: تُضاف بقيمها الافتراضية دون المساس بالموجود.
  try {
    const { DEFAULT_SETTINGS } = await import("../../db/seed.mjs");
    const existing = new Set((await db.select().from(settingsTable)).map((r) => r.key));
    const missing = Object.entries(DEFAULT_SETTINGS).filter(([k]) => !existing.has(k));
    if (missing.length) {
      await db.insert(settingsTable).values(missing.map(([key, value]) => ({ key, value })));
      console.log(`[bootstrap] added ${missing.length} default settings`);
    }
  } catch (error) {
    console.error("[bootstrap] settings sync failed:", describeDbError(error));
  }

  // 5) حساب المدير
  const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (email && password.length >= 8) {
    const existing = await findUserByEmail(email);
    if (!existing) {
      await db.insert(users).values({
        unionId: randomUUID(),
        name: process.env.ADMIN_NAME || "Admin",
        email,
        passwordHash: await hashPassword(password),
        role: "admin",
      });
      console.log(`[bootstrap] admin created: ${email}`);
    }
  } else {
    const [{ n: userCount }] = await db.select({ n: count() }).from(users);
    if (userCount === 0) {
      console.warn(
        "[bootstrap] no users yet — set ADMIN_EMAIL and ADMIN_PASSWORD (8+ chars) env vars to create the first admin",
      );
    }
  }
}

/**
 * يستخرج سبب الخطأ الأصلي من mysql2 (Drizzle يلفّه داخل `cause`) بدون بيانات الدخول.
 */
export function describeDbError(error: unknown): string {
  const e = error as { cause?: unknown; message?: string; code?: string; errno?: number };
  const root = (e?.cause ?? e) as { code?: string; errno?: number; message?: string; sqlMessage?: string };
  const code = root?.code ?? e?.code ?? "UNKNOWN";
  const message = root?.sqlMessage ?? root?.message ?? e?.message ?? String(error);
  return `${code}: ${message}`;
}

/** اختبار اتصال سريع بقاعدة البيانات لمسار /api/health?db=1 */
export async function checkDatabase(): Promise<{ ok: boolean; error?: string }> {
  try {
    await getDb().execute(sql`select 1`);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: describeDbError(error) };
  }
}
