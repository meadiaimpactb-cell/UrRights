import { useI18n } from "@/i18n";
import { IconWhatsapp, IconChat, IconCheck } from "./icons";

export function Hero({
  whatsapp,
  onChat,
  onHelp,
}: {
  whatsapp: string;
  onChat: () => void;
  onHelp: () => void;
}) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-70" />
      <div className="absolute -top-28 -end-28 w-96 h-96 rounded-full bg-[#5cb98b]/15 blur-3xl" />
      <div className="absolute -bottom-32 -start-24 w-96 h-96 rounded-full bg-[#2fa3c4]/15 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14 sm:pt-20 sm:pb-20 lg:grid lg:grid-cols-[1.25fr_1fr] lg:gap-10 lg:items-center">
        <div className="max-w-2xl">
          <div className="anim-rise inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e7e3d3] shadow-soft mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2e9c6a]" />
            <span className="text-sm font-bold text-[#17788f]">{t("hero.badge")}</span>
          </div>

          <h1 className="anim-rise anim-rise-1 font-display text-4xl sm:text-6xl leading-[1.15] text-[#22312c] mb-5">
            {t("hero.title")}
          </h1>
          <p className="anim-rise anim-rise-2 text-lg sm:text-2xl text-stone-500 leading-relaxed mb-8 max-w-xl">
            {t("hero.subtitle")}
          </p>

          <div className="anim-rise anim-rise-3 flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#22b358] text-white text-lg font-bold shadow-lift hover:bg-[#1da34e] active:scale-[0.98] transition min-h-[60px]"
            >
              <IconWhatsapp size={26} />
              {t("hero.ctaWhatsapp")}
            </a>
            <button
              onClick={onChat}
              className="flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-grad-brand-deep text-white text-lg font-bold shadow-lift hover:opacity-95 active:scale-[0.98] transition min-h-[60px]"
            >
              <IconChat size={24} />
              {t("hero.ctaChat")}
            </button>
            <button
              onClick={onHelp}
              className="flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-white border-2 border-[#22312c] text-[#22312c] text-lg font-bold hover:bg-stone-50 active:scale-[0.98] transition min-h-[60px]"
            >
              {t("hero.ctaHelp")}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-stone-500">
            {["why1.title", "why3.title", "why2.title"].map((k) => (
              <span key={k} className="inline-flex items-center gap-1.5">
                <IconCheck size={17} className="text-[#2e9c6a]" />
                {t(k)}
              </span>
            ))}
          </div>
        </div>

        {/* visual column — desktop only */}
        <div className="hidden lg:flex relative items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full bg-grad-brand opacity-15 blur-2xl" />
          <img
            src="/assets/logo-icon.png"
            alt=""
            className="anim-floaty relative w-72 h-72 object-contain drop-shadow-2xl"
          />
          <div className="anim-rise anim-rise-2 absolute top-6 -start-2 bg-white squircle border border-[#e7e3d3] shadow-lift px-5 py-3.5 flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#22b358]/15 text-[#1da34e] grid place-items-center">
              <IconWhatsapp size={20} />
            </span>
            <span className="font-bold text-[#22312c] text-sm">{t("hero.ctaWhatsapp")}</span>
          </div>
          <div className="anim-rise anim-rise-3 absolute bottom-8 -end-2 bg-white squircle border border-[#e7e3d3] shadow-lift px-5 py-3.5 flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#2fa3c4]/15 text-[#17788f] grid place-items-center">
              <IconChat size={19} />
            </span>
            <span className="font-bold text-[#22312c] text-sm">{t("chat.online")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
