import { useState } from "react";
import { Link } from "react-router";
import { useI18n } from "@/i18n";
import { IconGlobe, IconX, IconLock, IconCheck } from "./icons";

const CONSENT_KEY = "yr_privacy_ok";

export function LanguageSheet() {
  const { languages, setLang, showPicker, setShowPicker, t, lang, isFirstVisit } = useI18n();

  // إشعار الخصوصية يظهر بعد اختيار اللغة في أول زيارة فقط.
  const [consentDone, setConsentDone] = useState(() => {
    try {
      return localStorage.getItem(CONSENT_KEY) === "1";
    } catch {
      return true;
    }
  });
  const [askConsent, setAskConsent] = useState(false);

  const acceptConsent = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "1");
    } catch {
      /* التخزين معطّل — نكمل بدون حفظ */
    }
    setConsentDone(true);
    setAskConsent(false);
  };

  const choose = (code: string) => {
    const needsConsent = !consentDone;
    setLang(code);
    if (needsConsent) setAskConsent(true);
  };

  const open = showPicker || askConsent;
  if (!open) return null;

  const dismissable = !askConsent;

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={() => dismissable && setShowPicker(false)}
      />
      <div className="relative w-full sm:max-w-lg bg-white squircle sm:m-4 p-6 sm:p-8 shadow-lift anim-rise max-h-[88vh] overflow-y-auto">
        {dismissable && !isFirstVisit && (
          <button
            onClick={() => setShowPicker(false)}
            className="absolute top-4 end-4 p-2 rounded-full text-stone-400 hover:bg-stone-100"
            aria-label="close"
          >
            <IconX size={22} />
          </button>
        )}

        {askConsent ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-11 h-11 rounded-2xl bg-grad-brand text-white grid place-items-center">
                <IconLock size={23} />
              </span>
              <h2 className="text-2xl font-display text-[#22312c]">{t("privacy.title")}</h2>
            </div>
            <p className="text-stone-600 text-lg leading-relaxed mb-5">{t("privacy.consent")}</p>
            <button
              onClick={acceptConsent}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-grad-brand-deep text-white text-lg font-bold shadow-soft active:scale-[0.98] transition min-h-[56px]"
            >
              <IconCheck size={22} />
              {t("privacy.agree")}
            </button>
            <Link
              to="/privacy"
              className="mt-4 block text-center font-bold text-[#17788f] hover:underline"
            >
              {t("privacy.link")}
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="w-11 h-11 rounded-2xl bg-grad-brand text-white grid place-items-center">
                <IconGlobe size={24} />
              </span>
              <h2 className="text-2xl font-display text-[#22312c]">{t("lang.choose")}</h2>
            </div>
            <p className="text-stone-400 text-sm mb-5">
              {t("lang.subtitle")} · Choose your language
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => choose(l.code)}
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
          </>
        )}
      </div>
    </div>
  );
}
