import { useEffect, useState } from "react";
import { trpc } from "@/providers/trpc";
import { useAdminT } from "./adminShared";
import { IconWhatsapp, IconClock, IconMosque } from "@/site/icons";

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

  // أيام العمل محفوظة كنص "0,1,2,3,4,6" — نحوّلها لمجموعة أرقام للعرض.
  const days = (form.hours_days ?? "")
    .split(",")
    .map((d) => Number(d.trim()))
    .filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);
  const toggleDay = (d: number) => {
    const next = days.includes(d) ? days.filter((x) => x !== d) : [...days, d];
    next.sort((a, b) => a - b);
    setForm({ ...form, hours_days: next.join(",") });
  };
  const hoursOn = (form.hours_enabled ?? "true") === "true";
  const dawahOn = (form.dawah_enabled ?? "false") === "true";

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

        {/* أوقات العمل — تحدد ظهور «متوفرون الآن» */}
        <div className="pt-2 border-t border-stone-100">
          <h2 className="font-black text-lg mb-1.5 flex items-center gap-2">
            <IconClock size={19} className="text-[#2fa3c4]" />
            {at("settings.hours")}
          </h2>
          <p className="text-sm text-stone-400 mb-4 leading-relaxed">{at("settings.hoursHint")}</p>

          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={hoursOn}
              onChange={(e) => setForm({ ...form, hours_enabled: e.target.checked ? "true" : "false" })}
              className="w-5 h-5 accent-[#2fa3c4]"
            />
            <span className="font-bold">{at("settings.hoursEnabled")}</span>
          </label>

          <div className={hoursOn ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1.5 text-stone-600">{at("settings.hoursStart")}</label>
                <input
                  type="time"
                  dir="ltr"
                  value={form.hours_start ?? "09:00"}
                  onChange={(e) => setForm({ ...form, hours_start: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block font-bold mb-1.5 text-stone-600">{at("settings.hoursEnd")}</label>
                <input
                  type="time"
                  dir="ltr"
                  value={form.hours_end ?? "21:00"}
                  onChange={(e) => setForm({ ...form, hours_end: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1.5 text-stone-600">{at("settings.hoursDays")}</label>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    className={`px-4 py-2 rounded-xl border-2 font-bold text-sm transition ${
                      days.includes(d)
                        ? "border-[#2fa3c4] bg-[#2fa3c4]/10 text-[#17788f]"
                        : "border-stone-200 text-stone-400 hover:border-stone-300"
                    }`}
                  >
                    {at(`settings.day.${d}`)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1.5 text-stone-600">{at("settings.hoursTz")}</label>
              <input
                dir="ltr"
                value={form.hours_tz ?? "+03:00"}
                onChange={(e) => setForm({ ...form, hours_tz: e.target.value })}
                className={inputCls}
                placeholder="+03:00"
              />
            </div>
          </div>
        </div>

        {/* إرفاق الوثائق في الدردشة */}
        <div className="pt-2 border-t border-stone-100">
          <h2 className="font-black text-lg mb-1.5">{at("settings.uploads")}</h2>
          <p className="text-sm text-stone-400 mb-4 leading-relaxed">{at("settings.uploadsHint")}</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={(form.uploads_enabled ?? "true") === "true"}
              onChange={(e) => setForm({ ...form, uploads_enabled: e.target.checked ? "true" : "false" })}
              className="w-5 h-5 accent-[#2fa3c4]"
            />
            <span className="font-bold">{at("settings.uploadsEnabled")}</span>
          </label>
        </div>

        {/* التوعية الشرعية — قسم اختياري */}
        <div className="pt-2 border-t border-stone-100">
          <h2 className="font-black text-lg mb-1.5 flex items-center gap-2">
            <IconMosque size={19} className="text-[#34ac6b]" />
            {at("settings.dawah")}
          </h2>
          <p className="text-sm text-stone-400 mb-4 leading-relaxed">{at("settings.dawahHint")}</p>

          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={dawahOn}
              onChange={(e) => setForm({ ...form, dawah_enabled: e.target.checked ? "true" : "false" })}
              className="w-5 h-5 accent-[#34ac6b]"
            />
            <span className="font-bold">{at("settings.dawahEnabled")}</span>
          </label>

          <div className={dawahOn ? "" : "opacity-50 pointer-events-none"}>
            <label className="block font-bold mb-1.5 text-stone-600">{at("settings.dawahWhatsapp")}</label>
            <input
              dir="ltr"
              value={form.dawah_whatsapp ?? ""}
              onChange={(e) => setForm({ ...form, dawah_whatsapp: e.target.value.replace(/[^\d]/g, "") })}
              className={inputCls}
              placeholder="9665XXXXXXXX"
            />
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
              hours_enabled: hoursOn ? "true" : "false",
              hours_start: form.hours_start ?? "09:00",
              hours_end: form.hours_end ?? "21:00",
              hours_days: form.hours_days ?? "0,1,2,3,4,6",
              hours_tz: form.hours_tz ?? "+03:00",
              dawah_enabled: dawahOn ? "true" : "false",
              dawah_whatsapp: form.dawah_whatsapp ?? "",
              uploads_enabled: (form.uploads_enabled ?? "true") === "true" ? "true" : "false",
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
