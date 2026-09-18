import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";

type FormState = {
  id?: number;
  nameAr: string;
  nameEn: string;
  logoUrl: string;
  websiteUrl: string;
  sortOrder: number;
};

const EMPTY: FormState = { nameAr: "", nameEn: "", logoUrl: "", websiteUrl: "", sortOrder: 99 };

export default function PartnersPage() {
  const { at } = useAdminT();
  const utils = trpc.useUtils();
  const partners = trpc.partners.listAll.useQuery();
  const [form, setForm] = useState<FormState | null>(null);

  const invalidate = () => {
    utils.partners.listAll.invalidate();
    utils.partners.list.invalidate();
  };
  const create = trpc.partners.create.useMutation({ onSuccess: () => { invalidate(); setForm(null); } });
  const update = trpc.partners.update.useMutation({ onSuccess: () => { invalidate(); setForm(null); } });
  const remove = trpc.partners.remove.useMutation({ onSuccess: invalidate });

  const inputCls = "w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none bg-white";

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">{at("partners.title")}</h1>
        <button
          onClick={() => setForm(EMPTY)}
          className="px-5 py-2.5 rounded-2xl bg-grad-brand-deep text-white font-black"
        >
          + {at("common.add")}
        </button>
      </div>

      {form && (
        <div className="bg-white rounded-3xl border-2 border-[#2fa3c4]/40 p-6 shadow-lift space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <input required placeholder={at("partners.nameAr")} value={form.nameAr}
              onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className={inputCls} />
            <input placeholder={at("partners.nameEn")} value={form.nameEn}
              onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className={inputCls} />
            <input dir="ltr" placeholder={at("partners.logo")} value={form.logoUrl}
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} className={inputCls} />
            <input dir="ltr" placeholder={at("partners.website")} value={form.websiteUrl}
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} className={inputCls} />
            <label className="flex items-center gap-2 text-sm font-bold text-stone-500">
              <input type="number" value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-20 px-3 py-2.5 rounded-xl border-2 border-stone-200 text-center" />
              {at("lang.order")}
            </label>
            {form.logoUrl && <img src={form.logoUrl} alt="" className="h-12 object-contain justify-self-start" />}
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                if (!form.nameAr.trim()) return;
                if (form.id) update.mutate({ id: form.id, ...form });
                else create.mutate({ ...form, nameEn: form.nameEn || "", logoUrl: form.logoUrl || "", websiteUrl: form.websiteUrl || "" });
              }}
              className="px-7 py-3 rounded-2xl bg-grad-brand-deep text-white font-black"
            >
              {at("common.save")}
            </button>
            <button onClick={() => setForm(null)} className="px-6 py-3 rounded-2xl bg-stone-100 font-bold text-stone-500">
              {at("common.cancel")}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {(partners.data ?? []).map((p) => (
          <div key={p.id} className="bg-white rounded-3xl border border-stone-200 p-4 shadow-soft flex items-center gap-4">
            {p.logoUrl ? (
              <img src={p.logoUrl} alt="" className="w-14 h-14 object-contain rounded-2xl bg-stone-50 p-1.5" />
            ) : (
              <span className="w-14 h-14 rounded-2xl bg-grad-brand text-white grid place-items-center text-xl font-black shrink-0">
                {p.nameAr.charAt(0)}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-black truncate">{p.nameAr}</div>
              <div className="text-xs text-stone-400 truncate">{p.nameEn}</div>
            </div>
            <button
              onClick={() => update.mutate({ id: p.id, enabled: !p.enabled })}
              className={`px-3.5 py-2 rounded-full font-bold text-sm ${
                p.enabled ? "bg-[#2e9c6a]/10 text-[#2e9c6a]" : "bg-stone-100 text-stone-400"
              }`}
            >
              {p.enabled ? "✓" : "⏸"}
            </button>
            <button
              onClick={() =>
                setForm({
                  id: p.id,
                  nameAr: p.nameAr,
                  nameEn: p.nameEn,
                  logoUrl: p.logoUrl ?? "",
                  websiteUrl: p.websiteUrl ?? "",
                  sortOrder: p.sortOrder,
                })
              }
              className="px-4 py-2 rounded-full bg-stone-100 font-bold text-sm text-stone-600"
            >
              {at("partners.edit")}
            </button>
            <button
              onClick={() => confirm(`${at("common.delete")} ${p.nameAr}?`) && remove.mutate({ id: p.id })}
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
