import { useI18n } from "@/i18n";
import { IconGlobe } from "./icons";

export function Header({ onHelp }: { onHelp: () => void }) {
  const { t, setShowPicker, languages, lang } = useI18n();
  const current = languages.find((l) => l.code === lang);

  return (
    <header className="sticky top-0 z-40 bg-[#f7f4ec]/85 backdrop-blur-lg border-b border-[#e7e3d3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <img src="/assets/logo-icon.png" alt="حقوقك" className="h-10 w-10 sm:h-11 sm:w-11 object-contain" />
          <span className="text-xl sm:text-2xl font-display text-[#22312c]">{t("brand.name")}</span>
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPicker(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-stone-300 bg-white text-[#22312c] font-semibold text-sm hover:border-[#2fa3c4] transition-colors"
          >
            <IconGlobe size={19} className="text-[#17788f]" />
            <span>{current?.nameNative ?? "Language"}</span>
          </button>
          <button
            onClick={onHelp}
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-grad-brand-deep text-white font-bold text-sm shadow-soft hover:opacity-95 active:scale-[0.98] transition"
          >
            {t("hero.ctaHelp")}
          </button>
        </div>
      </div>
    </header>
  );
}
