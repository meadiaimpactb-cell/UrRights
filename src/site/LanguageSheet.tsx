import { useI18n } from "@/i18n";
import { IconGlobe, IconX } from "./icons";

export function LanguageSheet() {
  const { languages, setLang, showPicker, setShowPicker, t, lang } = useI18n();
  if (!showPicker) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={() => setShowPicker(false)}
      />
      <div className="relative w-full sm:max-w-lg bg-white squircle sm:m-4 p-6 sm:p-8 shadow-lift anim-rise max-h-[88vh] overflow-y-auto">
        <button
          onClick={() => setShowPicker(false)}
          className="absolute top-4 end-4 p-2 rounded-full text-stone-400 hover:bg-stone-100"
          aria-label="close"
        >
          <IconX size={22} />
        </button>
        <div className="flex items-center gap-3 mb-1.5">
          <span className="w-11 h-11 rounded-2xl bg-grad-brand text-white grid place-items-center">
            <IconGlobe size={24} />
          </span>
          <h2 className="text-2xl font-display text-[#22312c]">{t("lang.choose")}</h2>
        </div>
        <p className="text-stone-400 text-sm mb-5">Choose your language · अपनी भाषा चुनें</p>
        <div className="grid grid-cols-1 gap-2.5">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border-2 text-start transition-all active:scale-[0.98] ${
                lang === l.code
                  ? "border-[#2fa3c4] bg-[#2fa3c4]/5"
                  : "border-stone-200 hover:border-[#2fa3c4]/60 hover:bg-stone-50"
              }`}
            >
              <span className="text-xl font-bold text-[#22312c]">{l.nameNative}</span>
              <span className="text-sm text-stone-400">{l.nameEn}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
