import { useEffect, useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";
import { IconWhatsapp } from "@/site/icons";

const FIELDS = [
  { key: "social_twitter", label: "X (Twitter)", placeholder: "https://x.com/..." },
  { key: "social_facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
  { key: "social_instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
  { key: "social_tiktok", label: "TikTok", placeholder: "https://tiktok.com/@..." },
];

export default function SettingsPage() {
  const { at } = useAdminT();
  const utils = trpc.useUtils();
  const all = trpc.settings.all.useQuery();
  const setMany = trpc.settings.setMany.useMutation({
    onSuccess: () => {
      utils.settings.all.invalidate();
      utils.settings.publicGet.invalidate();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
  });

  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (all.data) setForm(all.data);
  }, [all.data]);

  const inputCls =
    "w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none bg-white";

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-black">{at("settings.title")}</h1>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-5">
        <div>
          <label className="block font-bold mb-1.5">{at("settings.whatsapp")}</label>
          <input
            dir="ltr"
            value={form.whatsapp_number ?? ""}
            onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value.replace(/[^\d]/g, "") })}
            className={inputCls}
            placeholder="9665XXXXXXXX"
          />
          <div className="mt-2 flex items-center gap-2 text-sm text-stone-400" dir="ltr">
            <IconWhatsapp size={16} className="text-[#22b358]" />
            {at("settings.preview")}: wa.me/{form.whatsapp_number || "…"}
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100">
          <h2 className="font-black text-lg mb-4">{at("settings.social")}</h2>
          <div className="space-y-4">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="block font-bold mb-1.5 text-stone-600">{f.label}</label>
                <input
                  dir="ltr"
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className={inputCls}
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() =>
            setMany.mutate({
              whatsapp_number: form.whatsapp_number ?? "",
              social_twitter: form.social_twitter ?? "",
              social_facebook: form.social_facebook ?? "",
              social_instagram: form.social_instagram ?? "",
              social_tiktok: form.social_tiktok ?? "",
            })
          }
          disabled={setMany.isPending}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-grad-brand-deep text-white font-black shadow-lift disabled:opacity-60"
        >
          {saved ? at("common.saved") : at("common.save")}
        </button>
      </div>
    </div>
  );
}
