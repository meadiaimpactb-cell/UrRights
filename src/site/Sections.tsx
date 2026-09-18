import { useI18n } from "@/i18n";
import { trpc } from "@/providers/trpc";
import {
  IconChat,
  IconBook,
  IconHandshake,
  IconScale,
  IconCheck,
  IconHeart,
  IconLock,
  IconGlobe,
  IconUsers,
  IconWhatsapp,
  IconMegaphone as IconMegaphoneIcon,
} from "./icons";

/* ------------------------------ Steps ------------------------------ */
export function Steps() {
  const { t } = useI18n();
  const steps = [
    { n: "1", Icon: IconChat, title: t("step1.title"), text: t("step1.text") },
    { n: "2", Icon: IconBook, title: t("step2.title"), text: t("step2.text") },
    { n: "3", Icon: IconScale, title: t("step3.title"), text: t("step3.text") },
  ];
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
const SERVICES = [
  { Icon: IconMegaphoneIcon, key: "service1" },
  { Icon: IconUsers, key: "service2" },
  { Icon: IconHandshake, key: "service3" },
  { Icon: IconScale, key: "service4" },
] as const;

export function Services() {
  const { t } = useI18n();
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h2 className="font-display text-3xl sm:text-4xl text-[#22312c] mb-8">{t("services.title")}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {SERVICES.map(({ Icon, key }) => (
          <div
            key={key}
            className="flex gap-4 bg-white squircle border border-[#e7e3d3] p-6 shadow-soft"
          >
            <span className="w-13 h-13 shrink-0 w-[52px] h-[52px] rounded-2xl bg-grad-brand text-white grid place-items-center">
              <Icon size={26} />
            </span>
            <div>
              <h3 className="font-bold text-xl text-[#22312c] mb-1">{t(`${key}.title`)}</h3>
              <p className="text-stone-500 leading-relaxed">{t(`${key}.text`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Why us ----------------------------- */
export function WhyUs() {
  const { t } = useI18n();
  const items = [
    { Icon: IconHeart, key: "why1" },
    { Icon: IconGlobe, key: "why2" },
    { Icon: IconLock, key: "why3" },
    { Icon: IconCheck, key: "why4" },
  ];
  return (
    <section className="bg-[#22312c] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="font-display text-3xl sm:text-4xl mb-8">{t("why.title")}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ Icon, key }) => (
            <div key={key} className="rounded-3xl bg-white/[0.06] border border-white/10 p-5">
              <span className="w-11 h-11 rounded-2xl bg-grad-brand grid place-items-center mb-3.5">
                <Icon size={24} />
              </span>
              <h3 className="font-bold text-lg mb-1">{t(`${key}.title`)}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t(`${key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- About + audience ------------------------ */
export function About() {
  const { t } = useI18n();
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#5cb98b]/15 text-[#2e9c6a] font-bold text-sm mb-4">
            {t("hero.badge")}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#22312c] mb-4">{t("about.title")}</h2>
          <p className="text-lg text-stone-500 leading-relaxed mb-5">{t("about.text")}</p>
          <p className="inline-flex items-center gap-2 font-bold text-[#17788f]">
            <IconCheck size={20} className="text-[#2e9c6a]" />
            {t("about.point")}
          </p>
        </div>
        <div className="lg:col-span-2 bg-white squircle border border-[#e7e3d3] p-6 shadow-soft">
          <h3 className="font-bold text-xl text-[#22312c] mb-4">{t("audience.title")}</h3>
          <ul className="space-y-3">
            {["audience.1", "audience.2", "audience.3", "audience.4"].map((k) => (
              <li key={k} className="flex items-start gap-3">
                <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-[#5cb98b]/15 text-[#2e9c6a] grid place-items-center">
                  <IconCheck size={15} />
                </span>
                <span className="text-stone-600 font-semibold leading-relaxed">{t(k)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Partners ---------------------------- */
export function Partners() {
  const { t, lang } = useI18n();
  const partnersQuery = trpc.partners.list.useQuery(undefined, { staleTime: 60_000 });
  const partners = partnersQuery.data ?? [];

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
