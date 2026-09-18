import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";

export default function LanguagesPage() {
  const { at } = useAdminT();
  const utils = trpc.useUtils();
  const langs = trpc.languages.listAll.useQuery();

  const invalidate = () => {
    utils.languages.listAll.invalidate();
    utils.languages.list.invalidate();
  };
  const update = trpc.languages.update.useMutation({ onSuccess: invalidate });
  const remove = trpc.languages.remove.useMutation({ onSuccess: invalidate });
  const create = trpc.languages.create.useMutation({
    onSuccess: (d) => {
      invalidate();
      utils.content.all.invalidate();
      setNotice(at("lang.addedHint") + ` (${d.keys})`);
      setForm({ code: "", nameEn: "", nameNative: "", dir: "ltr" });
    },
  });

  const [form, setForm] = useState({ code: "", nameEn: "", nameNative: "", dir: "ltr" as "ltr" | "rtl" });
  const [notice, setNotice] = useState("");

  const inputCls = "px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none bg-white";

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-black">{at("lang.title")}</h1>

      {/* add form */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft">
        <h2 className="font-black text-lg mb-4">{at("lang.add")}</h2>
        <form
          className="grid sm:grid-cols-2 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            create.mutate({ ...form, sortOrder: (langs.data?.length ?? 0) + 1 });
          }}
        >
          <input
            required
            dir="ltr"
            placeholder={at("lang.code")}
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className={inputCls}
          />
          <input
            required
            placeholder={at("lang.nameEn")}
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            className={inputCls}
          />
          <input
            required
            placeholder={at("lang.nameNative")}
            value={form.nameNative}
            onChange={(e) => setForm({ ...form, nameNative: e.target.value })}
            className={inputCls}
          />
          <div className="flex gap-2">
            <select
              value={form.dir}
              onChange={(e) => setForm({ ...form, dir: e.target.value as "ltr" | "rtl" })}
              className={inputCls + " flex-1"}
            >
              <option value="ltr">LTR</option>
              <option value="rtl">RTL</option>
            </select>
            <button
              type="submit"
              disabled={create.isPending}
              className="px-6 rounded-xl bg-grad-brand-deep text-white font-black disabled:opacity-60"
            >
              {at("common.add")}
            </button>
          </div>
        </form>
        {notice && <p className="mt-3 text-sm font-bold text-[#2e9c6a]">{notice}</p>}
        {create.error && <p className="mt-3 text-sm font-bold text-rose-500">{create.error.message}</p>}
      </div>

      {/* list */}
      <div className="space-y-3">
        {(langs.data ?? []).map((l) => (
          <div
            key={l.id}
            className="bg-white rounded-3xl border border-stone-200 p-4 shadow-soft flex flex-wrap items-center gap-3"
          >
            <span className="w-11 h-11 rounded-2xl bg-stone-100 grid place-items-center font-black text-stone-500" dir="ltr">
              {l.code}
            </span>
            <div className="flex-1 min-w-[140px]">
              <div className="font-black">{l.nameNative}</div>
              <div className="text-xs text-stone-400">
                {l.nameEn} · {l.dir.toUpperCase()}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm font-bold text-stone-500">
              <input
                type="number"
                className="w-16 px-2 py-1.5 rounded-lg border-2 border-stone-200 text-center"
                value={l.sortOrder}
                onChange={(e) => update.mutate({ id: l.id, sortOrder: parseInt(e.target.value) || 0 })}
              />
              {at("lang.order")}
            </label>
            <button
              onClick={() => update.mutate({ id: l.id, enabled: !l.enabled })}
              className={`px-4 py-2 rounded-full font-bold text-sm ${
                l.enabled ? "bg-[#2e9c6a]/10 text-[#2e9c6a]" : "bg-stone-100 text-stone-400"
              }`}
            >
              {l.enabled ? `✓ ${at("lang.enabled")}` : "—"}
            </button>
            <button
              onClick={() => {
                if (confirm(`${at("common.delete")} ${l.nameNative}?`)) remove.mutate({ id: l.id });
              }}
              className="px-3.5 py-2 rounded-full bg-rose-50 text-rose-500 font-bold text-sm"
            >
              {at("common.delete")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
