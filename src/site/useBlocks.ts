/**
 * عناصر الأقسام وأقسام الصفحة كما يضبطها المسؤول من لوحة التحكم.
 * عند تعذّر الجلب تُرجع الدوال قوائم فارغة، فتعرض المكوّنات ترتيبها الافتراضي.
 */
import { trpc } from "@/providers/trpc";

export type BlockItem = {
  id: number;
  section: string;
  itemKey: string;
  titleKey: string;
  descKey: string | null;
  icon: string;
  tint: string;
  sortOrder: number;
  enabled: boolean;
};

/** عناصر قسم واحد. `fallback` يُستخدم ريثما تصل البيانات أو إن كان القسم فارغًا. */
export function useBlocks(section: string, fallback: BlockItem[] = []): BlockItem[] {
  const q = trpc.blocks.list.useQuery(undefined, { staleTime: 60_000 });
  const rows = (q.data?.[section] ?? []) as BlockItem[];
  return rows.length ? rows : fallback;
}

/**
 * هل القسم ظاهر؟ يرجع true ريثما تصل البيانات حتى لا يومض الموقع فارغًا،
 * ويحترم بعدها قرار المسؤول.
 */
export function useSectionEnabled(key: string): boolean {
  const q = trpc.blocks.sections.useQuery(undefined, { staleTime: 60_000 });
  if (!q.data) return true;
  const row = q.data.find((s) => s.key === key);
  return row ? row.enabled : true;
}

/** ترتيب أقسام الصفحة الرئيسية كما ضبطه المسؤول. */
export function useSectionOrder(defaults: string[]): string[] {
  const q = trpc.blocks.sections.useQuery(undefined, { staleTime: 60_000 });
  if (!q.data || q.data.length === 0) return defaults;
  const known = q.data
    .filter((s) => s.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((s) => s.key)
    .filter((k) => defaults.includes(k));
  // أي قسم جديد في الكود ولم يُسجَّل بعد يبقى في مكانه الافتراضي
  const missing = defaults.filter((d) => !q.data!.some((s) => s.key === d));
  return [...known, ...missing];
}
