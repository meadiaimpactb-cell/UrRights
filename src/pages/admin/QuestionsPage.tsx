import { useEffect, useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";
import { useDragOrder } from "./useDragOrder";

/* ------------------------------------------------------------------ */
/* محرّر نص (سؤال أو خيار) بكل اللغات                                  */
/* ------------------------------------------------------------------ */
function TextEditor({ contentKey, onClose }: { contentKey: string; onClose: () => void }) {
  const { at } = useAdminT();
  const utils = trpc.useUtils();
  const texts = trpc.blocks.texts.useQuery({ keys: [contentKey] });
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
    for (const r of texts.data) d[r.lang] = r.value;
    setDraft(d);
  }, [texts.data]);

  return (
    <div className="mt-2.5 pt-2.5 border-t border-stone-100 space-y-2">
      {(langs.data ?? []).map((l) => (
        <div key={l.code} className="grid sm:grid-cols-[90px_1fr] gap-2 items-center">
          <span className="text-xs font-black text-stone-500">{l.nameNative}</span>
          <input
            dir="auto"
            value={draft[l.code] ?? ""}
            onChange={(e) => setDraft({ ...draft, [l.code]: e.target.value })}
            onBlur={(e) => {
              const original = texts.data?.find((r) => r.lang === l.code)?.value ?? "";
              if (original !== e.target.value) {
                setText.mutate({ key: contentKey, lang: l.code, value: e.target.value });
              }
            }}
            className="w-full px-3 py-2 rounded-lg border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none text-sm"
          />
        </div>
      ))}
      <button onClick={onClose} className="px-3.5 py-1.5 rounded-lg bg-stone-100 font-bold text-xs text-stone-600">
        {at("sections.done")}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* خيارات سؤال واحد                                                    */
/* ------------------------------------------------------------------ */
type Opt = { id: number; labelKey: string; enabled: boolean };

function Options({
  questionId,
  options,
  label,
  refresh,
}: {
  questionId: number;
  options: Opt[];
  label: (k: string) => string;
  refresh: () => void;
}) {
  const { at } = useAdminT();
  const [editing, setEditing] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ textAr: "", textEn: "" });

  const addOption = trpc.questions.addOption.useMutation({
    onSuccess: () => {
      refresh();
      setForm({ textAr: "", textEn: "" });
      setAdding(false);
    },
  });
  const updateOption = trpc.questions.updateOption.useMutation({ onSuccess: refresh });
  const removeOption = trpc.questions.removeOption.useMutation({ onSuccess: refresh });
  const reorderOptions = trpc.questions.reorderOptions.useMutation({ onSuccess: refresh });

  const drag = useDragOrder(options, (ids) => reorderOptions.mutate({ ids: ids as number[] }));
  const inputCls =
    "w-full px-3 py-2 rounded-lg border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none text-sm";

  return (
    <div className="mt-3 ps-4 border-s-2 border-stone-100 space-y-2">
      <p className="text-xs font-black text-stone-400">{at("questions.options")}</p>

      {options.map((o) => (
        <div
          key={o.id}
          {...drag.rowProps(o)}
          className={`rounded-xl border border-stone-200 bg-white px-3 py-2 cursor-grab active:cursor-grabbing transition ${drag.rowClass(
            o,
          )}`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-stone-300 select-none">⠿</span>
            <span className="flex-1 min-w-0 truncate text-sm font-bold" dir="auto">
              {label(o.labelKey) || o.labelKey}
            </span>
            <button
              onClick={() => setEditing(editing === o.id ? null : o.id)}
              className="px-2.5 py-1 rounded-lg bg-[#2fa3c4]/10 text-[#17788f] font-black text-[11px]"
            >
              {at("sections.editTexts")}
            </button>
            <input
              type="checkbox"
              checked={o.enabled}
              onChange={(e) => updateOption.mutate({ id: o.id, enabled: e.target.checked })}
              className="w-4 h-4 accent-[#2fa3c4]"
              title={at("sections.visible")}
            />
            <button
              onClick={() => {
                if (confirm(at("questions.confirmDeleteOption"))) removeOption.mutate({ id: o.id });
              }}
              className="text-stone-300 hover:text-rose-500 font-bold text-sm"
              aria-label="delete"
            >
              ✕
            </button>
          </div>
          {editing === o.id && <TextEditor contentKey={o.labelKey} onClose={() => setEditing(null)} />}
        </div>
      ))}

      {adding ? (
        <div className="rounded-xl border-2 border-[#2fa3c4]/40 bg-[#2fa3c4]/5 p-3 space-y-2">
          <input
            dir="auto"
            value={form.textAr}
            onChange={(e) => setForm({ ...form, textAr: e.target.value })}
            placeholder={at("questions.optionAr")}
            className={inputCls}
          />
          <input
            dir="auto"
            value={form.textEn}
            onChange={(e) => setForm({ ...form, textEn: e.target.value })}
            placeholder={at("questions.optionEn")}
            className={inputCls}
          />
          <div className="flex gap-2">
            <button
              onClick={() => addOption.mutate({ questionId, ...form })}
              disabled={!form.textAr.trim() || addOption.isPending}
              className="px-4 py-1.5 rounded-lg bg-grad-brand-deep text-white font-black text-xs disabled:opacity-50"
            >
              {at("common.add")}
            </button>
            <button onClick={() => setAdding(false)} className="px-3 py-1.5 rounded-lg bg-white text-xs font-bold text-stone-500">
              {at("common.cancel")}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full py-1.5 rounded-lg border-2 border-dashed border-stone-300 text-stone-500 font-bold text-xs hover:border-[#2fa3c4] hover:text-[#17788f]"
        >
          + {at("questions.addOption")}
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* الصفحة                                                              */
/* ------------------------------------------------------------------ */
export default function QuestionsPage() {
  const { at, al } = useAdminT();
  const utils = trpc.useUtils();
  const all = trpc.questions.all.useQuery();
  const blocks = trpc.blocks.listAll.useQuery();
  const content = trpc.content.all.useQuery();

  const [topic, setTopic] = useState<string | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ textAr: "", textEn: "", required: true });

  const refresh = () => {
    utils.questions.all.invalidate();
    utils.questions.byTopic.invalidate();
    utils.content.all.invalidate();
  };

  const addQuestion = trpc.questions.addQuestion.useMutation({
    onSuccess: () => {
      refresh();
      setForm({ textAr: "", textEn: "", required: true });
      setAdding(false);
    },
  });
  const updateQuestion = trpc.questions.updateQuestion.useMutation({ onSuccess: refresh });
  const removeQuestion = trpc.questions.removeQuestion.useMutation({ onSuccess: refresh });
  const reorderQuestions = trpc.questions.reorderQuestions.useMutation({ onSuccess: refresh });

  const label = (key: string) => {
    const rows = content.data ?? [];
    const pick = (lang: string) => rows.find((r) => r.contentKey === key && r.lang === lang)?.value;
    return (pick(al) || pick("ar") || pick("en") || "").trim();
  };

  const topics = (blocks.data ?? []).filter((b) => b.section === "topic");
  const current = topic ?? topics[0]?.itemKey ?? null;
  const list = (all.data ?? []).filter((q) => q.topicKey === current);

  const drag = useDragOrder(list, (ids) => reorderQuestions.mutate({ ids: ids as number[] }));
  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none text-sm";

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-black">{at("questions.title")}</h1>
        <p className="text-stone-400 mt-1 leading-relaxed">{at("questions.hint")}</p>
      </div>

      {/* اختيار نوع المشكلة */}
      <div className="flex flex-wrap gap-2">
        {topics.map((tp) => {
          const n = (all.data ?? []).filter((q) => q.topicKey === tp.itemKey).length;
          return (
            <button
              key={tp.itemKey}
              onClick={() => setTopic(tp.itemKey)}
              className={`px-4 py-2.5 rounded-full border-2 font-bold text-sm transition ${
                current === tp.itemKey
                  ? "border-[#2fa3c4] bg-[#2fa3c4]/10 text-[#17788f]"
                  : "border-stone-200 bg-white text-stone-500 hover:border-stone-300"
              }`}
            >
              {label(tp.titleKey) || tp.itemKey}
              <span className="ms-1.5 text-xs opacity-60">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-soft space-y-3">
        <p className="text-xs text-stone-400">{at("sections.dragHint")}</p>

        {list.length === 0 && (
          <p className="text-stone-400 text-center py-6">{at("questions.empty")}</p>
        )}

        {list.map((q) => (
          <div
            key={q.id}
            {...drag.rowProps(q)}
            className={`rounded-2xl border border-stone-200 bg-white p-3.5 cursor-grab active:cursor-grabbing transition ${drag.rowClass(
              q,
            )}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-stone-300 select-none" title={at("sections.drag")}>
                ⠿
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate" dir="auto">
                  {label(q.labelKey) || q.labelKey}
                </div>
                <div className="text-xs text-stone-400">
                  {q.options.length} {at("questions.optionsCount")}
                </div>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-stone-500">
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={(e) => updateQuestion.mutate({ id: q.id, required: e.target.checked })}
                  className="w-4 h-4 accent-[#2e9c6a]"
                />
                {at("questions.required")}
              </label>
              <button
                onClick={() => setEditing(editing === q.id ? null : q.id)}
                className="px-3 py-1.5 rounded-lg bg-[#2fa3c4]/10 text-[#17788f] font-black text-xs"
              >
                {at("questions.manage")}
              </button>
              <input
                type="checkbox"
                checked={q.enabled}
                onChange={(e) => updateQuestion.mutate({ id: q.id, enabled: e.target.checked })}
                className="w-5 h-5 accent-[#2fa3c4]"
                title={at("sections.visible")}
              />
              <button
                onClick={() => {
                  if (confirm(at("questions.confirmDelete"))) removeQuestion.mutate({ id: q.id });
                }}
                className="text-stone-300 hover:text-rose-500 font-bold px-1"
                aria-label="delete"
              >
                ✕
              </button>
            </div>

            {editing === q.id && (
              <>
                <TextEditor contentKey={q.labelKey} onClose={() => setEditing(null)} />
                <Options questionId={q.id} options={q.options} label={label} refresh={refresh} />
              </>
            )}
          </div>
        ))}

        {adding ? (
          <div className="rounded-2xl border-2 border-[#2fa3c4]/40 bg-[#2fa3c4]/5 p-4 space-y-2.5">
            <input
              dir="auto"
              value={form.textAr}
              onChange={(e) => setForm({ ...form, textAr: e.target.value })}
              placeholder={at("questions.questionAr")}
              className={inputCls}
            />
            <input
              dir="auto"
              value={form.textEn}
              onChange={(e) => setForm({ ...form, textEn: e.target.value })}
              placeholder={at("questions.questionEn")}
              className={inputCls}
            />
            <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-stone-600">
              <input
                type="checkbox"
                checked={form.required}
                onChange={(e) => setForm({ ...form, required: e.target.checked })}
                className="w-4 h-4 accent-[#2e9c6a]"
              />
              {at("questions.required")}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => current && addQuestion.mutate({ topic: current, ...form })}
                disabled={!form.textAr.trim() || !current || addQuestion.isPending}
                className="px-5 py-2 rounded-xl bg-grad-brand-deep text-white font-black text-sm disabled:opacity-50"
              >
                {at("common.add")}
              </button>
              <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-xl bg-white font-bold text-sm text-stone-500">
                {at("common.cancel")}
              </button>
            </div>
            <p className="text-xs text-stone-400">{at("questions.addHint")}</p>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-stone-300 text-stone-500 font-bold text-sm hover:border-[#2fa3c4] hover:text-[#17788f] transition"
          >
            + {at("questions.addQuestion")}
          </button>
        )}
      </div>
    </div>
  );
}
