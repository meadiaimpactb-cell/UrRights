import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { blocks, contents, languages, pageSections } from "@db/schema";

/** الأقسام المتكرّرة التي يديرها المسؤول. */
export const SECTION_KINDS = [
  "topic",
  "service",
  "why",
  "step",
  "audience",
  "weAre",
  "weAreNot",
] as const;

/** أقسام الصفحة الرئيسية بالترتيب الافتراضي. */
export const PAGE_SECTIONS = [
  "hours",
  "topics",
  "steps",
  "services",
  "why",
  "about",
  "dawah",
  "partners",
  "cta",
] as const;

const sectionKind = z.enum(SECTION_KINDS);

/** يحوّل نصًا حرًّا إلى مفتاح آمن: حروف وأرقام وشرطات فقط. */
function slugify(raw: string, fallback: string): string {
  const s = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return s || fallback;
}

/** ينشئ صفوف المحتوى لمفتاح جديد في كل اللغات (العربية والإنجليزية بقيمة، والباقي فارغ). */
async function seedKey(key: string, valueAr: string, valueEn: string) {
  const db = getDb();
  const langs = await db.select().from(languages);
  for (const l of langs) {
    const value = l.code === "ar" ? valueAr : l.code === "en" ? valueEn : "";
    await db
      .insert(contents)
      .values({ contentKey: key, lang: l.code, value })
      .onDuplicateKeyUpdate({ set: { contentKey: key } });
  }
}

export const blocksRouter = createRouter({
  /* ------------------------------ public ------------------------------ */

  /** كل العناصر المفعّلة مرتّبة، مجمّعة حسب القسم. */
  list: publicQuery.query(async () => {
    const rows = await getDb()
      .select()
      .from(blocks)
      .where(eq(blocks.enabled, true))
      .orderBy(asc(blocks.section), asc(blocks.sortOrder), asc(blocks.id));
    const out: Record<string, typeof rows> = {};
    for (const r of rows) (out[r.section] ??= []).push(r);
    return out;
  }),

  /** حالة أقسام الصفحة الرئيسية (إظهار + ترتيب). */
  sections: publicQuery.query(async () => {
    const rows = await getDb().select().from(pageSections).orderBy(asc(pageSections.sortOrder));
    return rows;
  }),

  /* ------------------------------- admin ------------------------------ */

  listAll: adminQuery.query(async () => {
    return getDb()
      .select()
      .from(blocks)
      .orderBy(asc(blocks.section), asc(blocks.sortOrder), asc(blocks.id));
  }),

  /** إضافة عنصر جديد — يُنشئ مفاتيح نصوصه تلقائيًا في كل اللغات. */
  create: adminQuery
    .input(
      z.object({
        section: sectionKind,
        titleAr: z.string().min(1).max(500),
        titleEn: z.string().max(500).default(""),
        descAr: z.string().max(2000).default(""),
        descEn: z.string().max(2000).default(""),
        icon: z.string().max(40).default("dots"),
        tint: z.string().max(40).default("brand"),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db.select().from(blocks).where(eq(blocks.section, input.section));

      // مفتاح فريد داخل القسم
      let itemKey = slugify(input.titleEn || input.titleAr, `item${existing.length + 1}`);
      if (existing.some((b) => b.itemKey === itemKey)) itemKey = `${itemKey}-${Date.now() % 100000}`;

      const prefix = input.section === "topic" ? "topic" : input.section;
      const titleKey = input.section === "topic" ? `topic.${itemKey}` : `${prefix}.${itemKey}.title`;
      const descKey = input.section === "topic" ? `topic.${itemKey}.desc` : `${prefix}.${itemKey}.text`;
      const hasDesc = input.section !== "audience" && input.section !== "weAre" && input.section !== "weAreNot";

      await seedKey(titleKey, input.titleAr, input.titleEn || input.titleAr);
      if (hasDesc) await seedKey(descKey, input.descAr, input.descEn || input.descAr);

      const maxOrder = existing.reduce((m, b) => Math.max(m, b.sortOrder), 0);
      await db.insert(blocks).values({
        section: input.section,
        itemKey,
        titleKey,
        descKey: hasDesc ? descKey : null,
        icon: input.icon,
        tint: input.tint,
        sortOrder: maxOrder + 1,
      });
      return { ok: true, itemKey, titleKey, descKey: hasDesc ? descKey : null };
    }),

  /** تعديل أيقونة العنصر أو لونه أو إظهاره. */
  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        icon: z.string().max(40).optional(),
        tint: z.string().max(40).optional(),
        enabled: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      const patch = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));
      if (Object.keys(patch).length === 0) return { ok: true };
      await getDb().update(blocks).set(patch).where(eq(blocks.id, id));
      return { ok: true };
    }),

  /** نقل عنصر لأعلى أو لأسفل داخل قسمه. */
  move: adminQuery
    .input(z.object({ id: z.number(), dir: z.enum(["up", "down"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const row = await db.query.blocks.findFirst({ where: eq(blocks.id, input.id) });
      if (!row) throw new TRPCError({ code: "NOT_FOUND" });
      const siblings = await db
        .select()
        .from(blocks)
        .where(eq(blocks.section, row.section))
        .orderBy(asc(blocks.sortOrder), asc(blocks.id));
      const i = siblings.findIndex((b) => b.id === row.id);
      const j = input.dir === "up" ? i - 1 : i + 1;
      if (j < 0 || j >= siblings.length) return { ok: true };
      // نعيد ترقيم الجميع لتفادي تساوي الترتيب
      const reordered = [...siblings];
      [reordered[i], reordered[j]] = [reordered[j], reordered[i]];
      for (let k = 0; k < reordered.length; k++) {
        await db.update(blocks).set({ sortOrder: k + 1 }).where(eq(blocks.id, reordered[k].id));
      }
      return { ok: true };
    }),

  /** حذف عنصر ونصوصه من كل اللغات. */
  remove: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const row = await db.query.blocks.findFirst({ where: eq(blocks.id, input.id) });
      if (!row) return { ok: true };
      await db.delete(contents).where(eq(contents.contentKey, row.titleKey));
      if (row.descKey) await db.delete(contents).where(eq(contents.contentKey, row.descKey));
      await db.delete(blocks).where(eq(blocks.id, input.id));
      return { ok: true };
    }),

  /** إظهار/إخفاء قسم كامل من الصفحة الرئيسية. */
  setSection: adminQuery
    .input(
      z.object({
        key: z.string().min(1).max(40),
        enabled: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { key, ...rest } = input;
      const patch = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));
      await db
        .insert(pageSections)
        .values({ key, enabled: input.enabled ?? true, sortOrder: input.sortOrder ?? 0 })
        .onDuplicateKeyUpdate({ set: patch });
      return { ok: true };
    }),

  /** نقل قسم كامل لأعلى أو لأسفل. */
  moveSection: adminQuery
    .input(z.object({ key: z.string().min(1).max(40), dir: z.enum(["up", "down"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const rows = await db.select().from(pageSections).orderBy(asc(pageSections.sortOrder));
      const i = rows.findIndex((r) => r.key === input.key);
      if (i < 0) throw new TRPCError({ code: "NOT_FOUND" });
      const j = input.dir === "up" ? i - 1 : i + 1;
      if (j < 0 || j >= rows.length) return { ok: true };
      const reordered = [...rows];
      [reordered[i], reordered[j]] = [reordered[j], reordered[i]];
      for (let k = 0; k < reordered.length; k++) {
        await db
          .update(pageSections)
          .set({ sortOrder: k + 1 })
          .where(eq(pageSections.key, reordered[k].key));
      }
      return { ok: true };
    }),

  /** نصوص عنصر واحد بكل اللغات — لتحريرها مباشرة من محرّر الأقسام. */
  texts: adminQuery
    .input(z.object({ keys: z.array(z.string().min(1).max(120)).max(4) }))
    .query(async ({ input }) => {
      if (input.keys.length === 0) return [];
      const db = getDb();
      const out: { contentKey: string; lang: string; value: string }[] = [];
      for (const k of input.keys) {
        const rows = await db.select().from(contents).where(eq(contents.contentKey, k));
        for (const r of rows) out.push({ contentKey: r.contentKey, lang: r.lang, value: r.value });
      }
      return out;
    }),

  /** حفظ نص عنصر للغة محددة. */
  setText: adminQuery
    .input(
      z.object({
        key: z.string().min(1).max(120),
        lang: z.string().min(2).max(16),
        value: z.string().max(4000),
      }),
    )
    .mutation(async ({ input }) => {
      await getDb()
        .insert(contents)
        .values({ contentKey: input.key, lang: input.lang, value: input.value })
        .onDuplicateKeyUpdate({ set: { value: input.value } });
      return { ok: true };
    }),
});

/** يُستخدم في التهيئة: التأكد من وجود صف لكل قسم. */
export async function ensureSectionRows() {
  const db = getDb();
  const existing = new Set((await db.select().from(pageSections)).map((r) => r.key));
  const missing = PAGE_SECTIONS.filter((k) => !existing.has(k));
  if (missing.length) {
    await db
      .insert(pageSections)
      .values(missing.map((key, i) => ({ key, enabled: true, sortOrder: PAGE_SECTIONS.indexOf(key) + 1 + i * 0 })));
  }
}

/** تحقق سريع: هل جدول العناصر فارغ؟ (تستخدمه التهيئة للتعبئة الأولى) */
export async function blocksAreEmpty() {
  const rows = await getDb().select().from(blocks).limit(1);
  return rows.length === 0;
}

export type BlockRow = typeof blocks.$inferSelect;
export type { PageSection } from "@db/schema";
