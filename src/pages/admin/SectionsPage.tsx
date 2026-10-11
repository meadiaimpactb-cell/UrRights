import { useEffect, useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";
import { ICON_NAMES, TINT_NAMES, iconOf, tintOf } from "@/site/iconRegistry";
import { useDragOrder } from "./useDragOrder";

/** الأقسام المتكرّرة التي يمكن إضافة عناصر إليها. */
const KINDS = [
  { key: "topic", hasDesc: true, hasTint: true },
  { key: "step", hasDesc: true, hasTint: false },
  { key: "service", hasDesc: true, hasTint: false },
  { key: "why", hasDesc: true, hasTint: false },
  { key: "audience", hasDesc: false, hasTint: false },
  { key: "weAre", hasDesc: false, hasTint: false },
  { key: "weAreNot", hasDesc: false, hasTint: false },
] as const;

type Kind = (typeof KINDS)[number]["key"];

/* ------------------------------------------------------------------ */
/* محرّر نصوص عنصر واحد بكل اللغات                                     */
/* ------------------------------------------------------------------ */
function ItemTexts({
  titleKey,
  descKey,
  onClose,
}: {
  titleKey: string;
  descKey: string | null;
  onClose: () => void;
}) {
  const { at } = useAdminT();
  const utils = trpc.useUtils();
  const keys = descKey ? [titleKey, descKey] : [titleKey];
  const texts = trpc.blocks.texts.useQuery({ keys });
  const langs = trpc.languages.listAll.useQuery();
  const setText = trpc.blocks.setText.useMutation({
    onSuccess: () => {
      utils.blocks.texts.invalidate();
      utils.content.all.invalidate();
    },
  });

  const [draft, setDraft] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!texts.data) return;
    const d: Record<string, string> = {};
    for (const r of texts.data) d[`${r.contentKey}|${r.lang}`] = r.value;
    setDraft(d);
  }, [texts.data]);

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none bg-white text-sm";

  return (
    <div className="mt-3 pt-3 border-t border-stone-100 space-y-4">
      {(langs.data ?? []).map((l) => (
        <div key={l.code} className="grid sm:grid-cols-[90px_1fr] gap-2 sm:gap-3 items-start">
          <span className="text-sm font-black text-stone-500 pt-2.5">{l.nameNative}</span>
          <div className="space-y-2">
            {keys.map((k) => {
              const id = `${k}|${l.code}`;
              return (
                <input
                  key={id}
                  dir="auto"
                  value={draft[id] ?? ""}
                  placeholder={k === titleKey ? at("sections.titleField") : at("sections.descField")}
                  onChange={(e) => setDraft({ ...draft, [id]: e.target.value })}
                  onBlur={(e) => {
                    const original = texts.data?.find((r) => r.contentKey === k && r.lang === l.code);
                    if ((original?.value ?? "") !== e.target.value) {
                      setText.mutate({ key: k, lang: l.code, value: e.target.value });
                    }
                  }}
                  className={inputCls}
                />
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <button onClick={onClose} className="px-4 py-2 rounded-xl bg-stone-100 font-bold text-sm text-stone-600">
          {at("sections.done")}
        </button>
        <span className="text-xs text-stone-400">{at("sections.autosave")}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* نموذج إضافة عنصر                                                    */
/* ------------------------------------------------------------------ */
function AddItem({ kind, hasDesc, hasTint }: { kind: Kind; hasDesc: boolean; hasTint: boolean }) {
  const { at } = useAdminT();
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    titleAr: "",
    titleEn: "",
    descAr: "",
    descEn: "",
    icon: "dots",
    tint: "brand",
  });

  const create = trpc.blocks.create.useMutation({
    onSuccess: () => {
      utils.blocks.listAll.invalidate();
      utils.blocks.list.invalidate();
      utils.content.all.invalidate();
      setForm({ titleAr: "", titleEn: "", descAr: "", descEn: "", icon: "dots", tint: "brand" });
      setOpen(false);
    },
  });

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none bg-white text-sm";

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-2.5 rounded-xl border-2 border-dashed border-stone-300 text-stone-500 font-bold text-sm hover:border-[#2fa3c4] hover:text-[#17788f] transition"
      >
        + {at("sections.addItem")}
      </button>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-[#2fa3c4]/40 bg-[#2fa3c4]/5 p-4 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          dir="auto"
          value={form.titleAr}
          onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
          placeholder={at("sections.titleAr")}
          className={inputCls}
        />
        <input
          dir="auto"
          value={form.titleEn}
          onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
          placeholder={at("sections.titleEn")}
          className={inputCls}
        />
        {hasDesc && (
          <>
            <input
              dir="auto"
              value={form.descAr}
              onChange={(e) => setForm({ ...form, descAr: e.target.value })}
              placeholder={at("sections.descAr")}
              className={inputCls}
            />
            <input
              dir="auto"
              value={form.descEn}
              onChange={(e) => setForm({ ...form, descEn: e.target.value })}
              placeholder={at("sections.descEn")}
              className={inputCls}
            />
          </>
        )}
      </div>

      <div>
        <label className="block text-xs font-black text-stone-500 mb-1.5">{at("sections.icon")}</label>
        <div className="flex flex-wrap gap-1.5">
          {ICON_NAMES.map((n) => {
            const Ico = iconOf(n);
            return (
              <button
                key={n}
                type="button"
                title={n}
                onClick={() => setForm({ ...form, icon: n })}
                className={`w-9 h-9 rounded-xl grid place-items-center border-2 transition ${
                  form.icon === n ? "border-[#2fa3c4] bg-white" : "border-transparent bg-white/70 text-stone-400"
                }`}
              >
                <Ico size={18} />
              </button>
            );
          })}
        </div>
      </div>

      {hasTint && (
        <div>
          <label className="block text-xs font-black text-stone-500 mb-1.5">{at("sections.color")}</label>
          <div className="flex flex-wrap gap-1.5">
            {TINT_NAMES.map((n) => (
              <button
                key={n}
                type="button"
                title={n}
                onClick={() => setForm({ ...form, tint: n })}
                className={`w-9 h-9 rounded-xl border-2 ${tintOf(n)} ${
                  form.tint === n ? "border-[#22312c]" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => create.mutate({ ...form, section: kind })}
          disabled={!form.titleAr.trim() || create.isPending}
          className="px-5 py-2.5 rounded-xl bg-grad-brand-deep text-white font-black text-sm disabled:opacity-50"
        >
          {at("common.add")}
        </button>
        <button onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl bg-white font-bold text-sm text-stone-500">
          {at("common.cancel")}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* قائمة عناصر قسم واحد — سحب وإفلات لإعادة الترتيب                    */
/* ------------------------------------------------------------------ */
type BlockRow = {
  id: number;
  itemKey: string;
  titleKey: string;
  descKey: string | null;
  icon: string;
  tint: string;
  enabled: boolean;
};

function ItemList({
  items,
  kind,
  hasDesc,
  hasTint,
  label,
  editing,
  setEditing,
  onReorder,
  onUpdate,
  onRemove,
  at,
}: {
  items: BlockRow[];
  kind: Kind;
  hasDesc: boolean;
  hasTint: boolean;
  label: (key: string) => string;
  editing: number | null;
  setEditing: (id: number | null) => void;
  onReorder: (ids: number[]) => void;
  onUpdate: (patch: { id: number; icon?: string; tint?: string; enabled?: boolean }) => void;
  onRemove: (id: number) => void;
  at: (k: string) => string;
}) {
  const drag = useDragOrder(items, (ids) => onReorder(ids as number[]));

  return (
    <div className="px-5 pb-5 space-y-2.5">
      <p className="text-xs text-stone-400">{at("sections.dragHint")}</p>

      {items.map((b) => {
        const Ico = iconOf(b.icon);
        return (
          <div
            key={b.id}
            {...drag.rowProps(b)}
            className={`rounded-2xl border border-stone-200 bg-white p-3.5 cursor-grab active:cursor-grabbing transition ${drag.rowClass(
              b,
            )}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-stone-300 select-none" title={at("sections.drag")}>
                ⠿
              </span>
              <span className={`w-10 h-10 shrink-0 rounded-xl grid place-items-center ${tintOf(b.tint)}`}>
                <Ico size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate" dir="auto">
                  {label(b.titleKey) || b.itemKey}
                </div>
                {b.descKey && label(b.descKey) && (
                  <div className="text-xs text-stone-400 truncate" dir="auto">
                    {label(b.descKey)}
                  </div>
                )}
              </div>

              <button
                onClick={() => setEditing(editing === b.id ? null : b.id)}
                className="px-3 py-1.5 rounded-lg bg-[#2fa3c4]/10 text-[#17788f] font-black text-xs"
              >
                {at("sections.editTexts")}
              </button>
              <label className="flex items-center gap-1.5 cursor-pointer" title={at("sections.visible")}>
                <input
                  type="checkbox"
                  checked={b.enabled}
                  onChange={(e) => onUpdate({ id: b.id, enabled: e.target.checked })}
                  className="w-5 h-5 accent-[#2fa3c4]"
                />
              </label>
              <button
                onClick={() => {
                  if (confirm(at("sections.confirmDelete"))) onRemove(b.id);
                }}
                className="text-stone-300 hover:text-rose-500 font-bold px-1"
                aria-label="delete"
              >
                ✕
              </button>
            </div>

            {editing === b.id && (
              <>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-black text-stone-500">{at("sections.icon")}</span>
                  <div className="flex flex-wrap gap-1">
                    {ICON_NAMES.map((n) => {
                      const I2 = iconOf(n);
                      return (
                        <button
                          key={n}
                          title={n}
                          onClick={() => onUpdate({ id: b.id, icon: n })}
                          className={`w-8 h-8 rounded-lg grid place-items-center border-2 ${
                            b.icon === n ? "border-[#2fa3c4]" : "border-transparent text-stone-400"
                          }`}
                        >
                          <I2 size={16} />
                        </button>
                      );
                    })}
                  </div>
                </div>
                {hasTint && (
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-black text-stone-500">{at("sections.color")}</span>
                    <div className="flex flex-wrap gap-1">
                      {TINT_NAMES.map((n) => (
                        <button
                          key={n}
                          title={n}
                          onClick={() => onUpdate({ id: b.id, tint: n })}
                          className={`w-8 h-8 rounded-lg border-2 ${tintOf(n)} ${
                            b.tint === n ? "border-[#22312c]" : "border-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <ItemTexts titleKey={b.titleKey} descKey={b.descKey} onClose={() => setEditing(null)} />
              </>
            )}
          </div>
        );
      })}

      <AddItem kind={kind} hasDesc={hasDesc} hasTint={hasTint} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* الصفحة                                                              */
/* ------------------------------------------------------------------ */
export default function SectionsPage() {
  const { at, al } = useAdminT();
  const utils = trpc.useUtils();
  const all = trpc.blocks.listAll.useQuery();
  const sections = trpc.blocks.sections.useQuery();
  const content = trpc.content.all.useQuery();

  // خريطة مفتاح→نص بلغة اللوحة، لعرض العنوان الحقيقي بدل المفتاح البرمجي
  const label = (key: string) => {
    const rows = content.data ?? [];
    const pick = (lang: string) => rows.find((r) => r.contentKey === key && r.lang === lang)?.value;
    return (pick(al) || pick("ar") || pick("en") || "").trim();
  };
  const [editing, setEditing] = useState<number | null>(null);
  const [openKind, setOpenKind] = useState<Kind | null>("topic");

  const refresh = () => {
    utils.blocks.listAll.invalidate();
    utils.blocks.list.invalidate();
    utils.blocks.sections.invalidate();
  };

  const update = trpc.blocks.update.useMutation({ onSuccess: refresh });
  const remove = trpc.blocks.remove.useMutation({ onSuccess: refresh });
  const setSection = trpc.blocks.setSection.useMutation({ onSuccess: refresh });
  const moveSection = trpc.blocks.moveSection.useMutation({ onSuccess: refresh });
  const reorder = trpc.blocks.reorder.useMutation({ onSuccess: refresh });
  const reorderSections = trpc.blocks.reorderSections.useMutation({ onSuccess: refresh });

  const rows = all.data ?? [];
  const byKind = (k: Kind) => rows.filter((r) => r.section === k);

  const sectionDrag = useDragOrder(
    (sections.data ?? []).map((x) => ({ id: x.key })),
    (ids) => reorderSections.mutate({ keys: ids as string[] }),
  );

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-black">{at("sections.title")}</h1>
        <p className="text-stone-400 mt-1 leading-relaxed">{at("sections.hint")}</p>
      </div>

      {/* ترتيب أقسام الصفحة وإظهارها */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-soft">
        <h2 className="font-black text-lg mb-1">{at("sections.pageOrder")}</h2>
        <p className="text-sm text-stone-400 mb-4">{at("sections.pageOrderHint")}</p>
        <div className="space-y-2">
          {(sections.data ?? []).map((s, i, arr) => (
            <div
              key={s.key}
              {...sectionDrag.rowProps({ id: s.key })}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-stone-200 bg-white cursor-grab active:cursor-grabbing transition ${sectionDrag.rowClass(
                { id: s.key },
              )}`}
            >
              <span className="text-stone-300 select-none" title={at("sections.drag")}>⠿</span>
              <span className="flex-1 font-bold">{at(`sections.name.${s.key}`)}</span>
              <button
                onClick={() => moveSection.mutate({ key: s.key, dir: "up" })}
                disabled={i === 0}
                className="w-8 h-8 rounded-lg bg-stone-100 font-black text-stone-500 disabled:opacity-30"
                aria-label="up"
              >
                ↑
              </button>
              <button
                onClick={() => moveSection.mutate({ key: s.key, dir: "down" })}
                disabled={i === arr.length - 1}
                className="w-8 h-8 rounded-lg bg-stone-100 font-black text-stone-500 disabled:opacity-30"
                aria-label="down"
              >
                ↓
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={s.enabled}
                  onChange={(e) => setSection.mutate({ key: s.key, enabled: e.target.checked })}
                  className="w-5 h-5 accent-[#2fa3c4]"
                />
                <span className="text-sm font-bold text-stone-500">{at("sections.visible")}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* عناصر كل قسم */}
      {KINDS.map(({ key, hasDesc, hasTint }) => {
        const items = byKind(key);
        const isOpen = openKind === key;
        return (
          <div key={key} className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden">
            <button
              onClick={() => setOpenKind(isOpen ? null : key)}
              className="w-full flex items-center gap-3 px-5 py-4 text-start hover:bg-stone-50"
            >
              <span className="flex-1 font-black text-lg">{at(`sections.kind.${key}`)}</span>
              <span className="text-sm text-stone-400 font-bold">{items.length}</span>
              <span className="text-stone-400 font-black">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <ItemList
                items={items}
                kind={key}
                hasDesc={hasDesc}
                hasTint={hasTint}
                label={label}
                editing={editing}
                setEditing={setEditing}
                onReorder={(ids) => reorder.mutate({ ids })}
                onUpdate={(patch) => update.mutate(patch)}
                onRemove={(id) => remove.mutate({ id })}
                at={at}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
