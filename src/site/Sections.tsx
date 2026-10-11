import { useI18n } from "@/i18n";
import { trpc } from "@/providers/trpc";
import { formatDays, formatTime, readHours, waLink } from "@/lib/site";
import { iconOf } from "./iconRegistry";
import { useBlocks, type BlockItem } from "./useBlocks";

/** قائمة احتياطية تُستخدم ريثما تصل بيانات لوحة التحكم. */
function fb(section: string, items: [string, string, string | null, string][]): BlockItem[] {
  return items.map(([itemKey, titleKey, descKey, icon], i) => ({
    id: -(i + 1),
    section,
    itemKey,
    titleKey,
    descKey,
    icon,
    tint: "brand",
    sortOrder: i,
    enabled: true,
  }));
}
import {
  IconChat,
  IconCheck,
  IconWhatsapp,
  IconClock,
  IconNo,
  IconMosque,
} from "./icons";

/* ------------------------------ Steps ------------------------------ */
const STEPS_FB = fb("step", [
  ["step1", "step1.title", "step1.text", "chat"],
  ["step2", "step2.title", "step2.text", "book"],
  ["step3", "step3.title", "step3.text", "scale"],
]);

export function Steps() {
  const { t } = useI18n();
  const rows = useBlocks("step", STEPS_FB);
  const steps = rows.map((b, i) => ({
    n: String(i + 1),
    Icon: iconOf(b.icon),
    title: t(b.titleKey),
    text: b.descKey ? t(b.descKey) : "",
  }));
  if (steps.length === 0) return null;
  return (
    <section className="bg-white border-y border-[#e7e3d3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="font-display text-3xl sm:text-4xl text-[#22312c] mb-2">{t("steps.title")}</h2>
        <p className="text-stone-500 text-lg mb-10">{t("steps.subtitle")}</p>
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
          {steps.map(({ n, Icon, title, text }) => (
            <div key={n} className="relative flex sm:block gap-4">
              <div className="flex sm:items-center sm:gap-4 flex-col sm:flex-row mb-0 sm:mb-4">
                <span className="w-14 h-14 shrink-0 rounded-full bg-grad-brand text-white grid place-items-center text-2xl font-black shadow-soft">
                  {n}
                </span>
                <span className="hidden sm:block flex-1 h-0.5 bg-[#e7e3d3] last:hidden" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5 mt-1 sm:mt-0">
                  <Icon size={22} className="text-[#17788f]" />
                  <h3 className="font-bold text-xl text-[#22312c]">{title}</h3>
                </div>
                <p className="text-stone-500 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Services ----------------------------- */
const SERVICES_FB = fb("service", [
  ["service1", "service1.title", "service1.text", "megaphone"],
  ["service2", "service2.title", "service2.text", "users"],
  ["service3", "service3.title", "service3.text", "handshake"],
  ["service4", "service4.title", "service4.text", "scale"],
]);

export function Services() {
  const { t } = useI18n();
  const services = useBlocks("service", SERVICES_FB);
  if (services.length === 0) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h2 className="font-display text-3xl sm:text-4xl text-[#22312c] mb-8">{t("services.title")}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((b) => {
          const Icon = iconOf(b.icon);
          return (
            <div
              key={b.itemKey}
              className="flex gap-4 bg-white squircle border border-[#e7e3d3] p-6 shadow-soft"
            >
              <span className="shrink-0 w-[52px] h-[52px] rounded-2xl bg-grad-brand text-white grid place-items-center">
                <Icon size={26} />
              </span>
              <div>
                <h3 className="font-bold text-xl text-[#22312c] mb-1">{t(b.titleKey)}</h3>
                {b.descKey && <p className="text-stone-500 leading-relaxed">{t(b.descKey)}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------ Why us ----------------------------- */
const WHY_FB = fb("why", [
  ["why1", "why1.title", "why1.text", "heart"],
  ["why2", "why2.title", "why2.text", "globe"],
  ["why3", "why3.title", "why3.text", "lock"],
  ["why4", "why4.title", "why4.text", "check"],
]);

export function WhyUs() {
  const { t } = useI18n();
  const items = useBlocks("why", WHY_FB);
  if (items.length === 0) return null;
  return (
    <section className="bg-[#22312c] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="font-display text-3xl sm:text-4xl mb-8">{t("why.title")}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((b) => {
            const Icon = iconOf(b.icon);
            return (
              <div key={b.itemKey} className="rounded-3xl bg-white/[0.06] border border-white/10 p-5">
                <span className="w-11 h-11 rounded-2xl bg-grad-brand grid place-items-center mb-3.5">
                  <Icon size={24} />
                </span>
                <h3 className="font-bold text-lg mb-1">{t(b.titleKey)}</h3>
                {b.descKey && (
                  <p className="text-white/60 text-sm leading-relaxed">{t(b.descKey)}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- About + identity ------------------------ */
const WE_ARE_FB = fb("weAre", [
  ["1", "about.weAre.1", null, "check"],
  ["2", "about.weAre.2", null, "check"],
  ["3", "about.weAre.3", null, "check"],
]);
const WE_ARE_NOT_FB = fb("weAreNot", [
  ["1", "about.weAreNot.1", null, "no"],
  ["2", "about.weAreNot.2", null, "no"],
  ["3", "about.weAreNot.3", null, "no"],
]);
const AUDIENCE_FB = fb("audience", [
  ["1", "audience.1", null, "check"],
  ["2", "audience.2", null, "check"],
  ["3", "audience.3", null, "check"],
  ["4", "audience.4", null, "check"],
]);

export function About() {
  const { t } = useI18n();
  const weAre = useBlocks("weAre", WE_ARE_FB);
  const weAreNot = useBlocks("weAreNot", WE_ARE_NOT_FB);
  const audience = useBlocks("audience", AUDIENCE_FB);
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16" id="about">
      <div className="max-w-3xl mb-9">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#5cb98b]/15 text-[#2e9c6a] font-bold text-sm mb-4">
          {t("about.point")}
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-[#22312c] mb-4">{t("about.title")}</h2>
        <p className="text-lg text-stone-500 leading-relaxed">{t("about.text")}</p>
      </div>

      {/* من نحن / لسنا — يجيب سؤال العامل: مين خلف هذا الموقع؟ */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white squircle border-2 border-[#5cb98b]/40 p-6 shadow-soft">
          <h3 className="flex items-center gap-2.5 font-bold text-xl text-[#2e9c6a] mb-4">
            <span className="w-9 h-9 rounded-xl bg-[#5cb98b]/15 grid place-items-center">
              <IconCheck size={20} />
            </span>
            {t("about.weAre.title")}
          </h3>
          <ul className="space-y-3">
            {weAre.map((b) => (
              <li key={b.itemKey} className="flex items-start gap-3">
                <IconCheck size={19} className="mt-1 shrink-0 text-[#2e9c6a]" />
                <span className="text-stone-600 font-semibold leading-relaxed">{t(b.titleKey)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white squircle border-2 border-rose-200 p-6 shadow-soft">
          <h3 className="flex items-center gap-2.5 font-bold text-xl text-rose-600 mb-4">
            <span className="w-9 h-9 rounded-xl bg-rose-500/10 grid place-items-center">
              <IconNo size={20} />
            </span>
            {t("about.weAreNot.title")}
          </h3>
          <ul className="space-y-3">
            {weAreNot.map((b) => (
              <li key={b.itemKey} className="flex items-start gap-3">
                <IconNo size={19} className="mt-1 shrink-0 text-rose-500" />
                <span className="text-stone-600 font-semibold leading-relaxed">{t(b.titleKey)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white squircle border border-[#e7e3d3] p-6 shadow-soft">
        <h3 className="font-bold text-xl text-[#22312c] mb-4">{t("audience.title")}</h3>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {audience.map((b) => (
            <li key={b.itemKey} className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-[#5cb98b]/15 text-[#2e9c6a] grid place-items-center">
                <IconCheck size={15} />
              </span>
              <span className="text-stone-600 font-semibold leading-relaxed">{t(b.titleKey)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------- Working hours -------------------------- */
export function HoursBand() {
  const { t, lang } = useI18n();
  const settingsQuery = trpc.settings.publicGet.useQuery(undefined, { staleTime: 60_000 });
  const hours = readHours(settingsQuery.data ?? {});
  if (!hours.enabled) return null;

  const days = formatDays(hours.days, (d) => (d < 0 ? t("hours.day.all") : t(`hours.day.${d}`)));
  const range = t("hours.range", {
    start: formatTime(hours.start, lang),
    end: formatTime(hours.end, lang),
  });

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-2 -mt-4">
      <div className="bg-white squircle border border-[#e7e3d3] p-5 sm:p-6 shadow-soft flex flex-col sm:flex-row sm:items-center gap-4">
        <span
          className={`w-12 h-12 shrink-0 rounded-2xl grid place-items-center ${
            hours.open ? "bg-[#5cb98b]/15 text-[#2e9c6a]" : "bg-stone-100 text-stone-400"
          }`}
        >
          <IconClock size={24} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-1">
            <h3 className="font-bold text-lg text-[#22312c]">{t("hours.title")}</h3>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                hours.open ? "bg-[#5cb98b]/15 text-[#2e9c6a]" : "bg-stone-100 text-stone-500"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${hours.open ? "bg-[#2e9c6a]" : "bg-stone-400"}`}
              />
              {hours.open ? t("chat.online") : t("chat.offline")}
            </span>
          </div>
          <p className="text-stone-500 font-semibold">
            {days} · {range}
          </p>
          <p className="text-stone-400 text-sm mt-1 leading-relaxed">{t("hours.note")}</p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Faith guidance ------------------------- */
export function Dawah() {
  const { t } = useI18n();
  const settingsQuery = trpc.settings.publicGet.useQuery(undefined, { staleTime: 60_000 });
  const s = settingsQuery.data ?? {};
  if ((s.dawah_enabled ?? "false") !== "true") return null;
  const number = s.dawah_whatsapp || s.whatsapp_number || "";
  if (!number) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="bg-white squircle border border-[#e7e3d3] p-7 sm:p-9 shadow-soft grid md:grid-cols-[auto_1fr_auto] items-center gap-6">
        <span className="w-16 h-16 rounded-3xl bg-grad-brand text-white grid place-items-center shrink-0">
          <IconMosque size={32} />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-2xl sm:text-3xl text-[#22312c] mb-2">{t("dawah.title")}</h2>
          <p className="text-stone-500 text-lg leading-relaxed mb-2">{t("dawah.text")}</p>
          <p className="text-stone-400 text-sm leading-relaxed">{t("dawah.note")}</p>
        </div>
        <a
          href={waLink(number, t("dawah.cta"))}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#22b358] text-white font-bold shadow-soft hover:bg-[#1da34e] active:scale-[0.98] transition min-h-[56px] whitespace-nowrap"
        >
          <IconWhatsapp size={22} />
          {t("dawah.cta")}
        </a>
      </div>
    </section>
  );
}

/* ----------------------------- Partners ---------------------------- */
export function Partners() {
  const { t, lang } = useI18n();
  const partnersQuery = trpc.partners.list.useQuery(undefined, { staleTime: 60_000 });
  const partners = partnersQuery.data ?? [];
  if (partners.length === 0) return null;

  return (
    <section className="bg-white border-y border-[#e7e3d3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <h2 className="font-display text-3xl sm:text-4xl text-[#22312c] mb-2">{t("partners.title")}</h2>
        <p className="text-stone-500 text-lg mb-8">{t("partners.subtitle")}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div
              key={p.id}
              className="squircle border border-[#e7e3d3] bg-[#fbfaf6] p-5 min-h-[130px] flex flex-col items-center justify-center text-center gap-3"
            >
              {p.logoUrl ? (
                <img src={p.logoUrl} alt={p.nameAr} className="h-14 object-contain" loading="lazy" />
              ) : (
                <span className="w-12 h-12 rounded-2xl bg-grad-brand text-white grid place-items-center text-xl font-black">
                  {(lang === "ar" ? p.nameAr : p.nameEn || p.nameAr).trim().charAt(0)}
                </span>
              )}
              <span className="font-bold text-[#22312c] text-sm leading-snug">
                {lang === "ar" ? p.nameAr : p.nameEn || p.nameAr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CTA band ---------------------------- */
export function CtaBand({ whatsapp, onChat }: { whatsapp: string; onChat: () => void }) {
  const { t } = useI18n();
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="bg-grad-brand-deep squircle p-8 sm:p-12 text-center text-white shadow-lift relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="relative">
          <h2 className="font-display text-3xl sm:text-5xl mb-4">{t("hero.title")}</h2>
          <p className="text-white/85 text-lg sm:text-xl max-w-xl mx-auto mb-8">{t("hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#1da34e] text-lg font-black shadow-lift active:scale-[0.98] transition min-h-[60px]"
            >
              <IconWhatsapp size={26} />
              {t("hero.ctaWhatsapp")}
            </a>
            <button
              onClick={onChat}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-white/70 text-white text-lg font-bold hover:bg-white/10 active:scale-[0.98] transition min-h-[60px]"
            >
              <IconChat size={24} />
              {t("hero.ctaChat")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
