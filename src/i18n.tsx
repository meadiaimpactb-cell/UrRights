import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { trpc } from "@/providers/trpc";

export type LangInfo = {
  code: string;
  nameEn: string;
  nameNative: string;
  dir: "rtl" | "ltr";
};

type I18nCtx = {
  lang: string;
  dir: "rtl" | "ltr";
  languages: LangInfo[];
  setLang: (code: string) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  showPicker: boolean;
  setShowPicker: (v: boolean) => void;
  isFirstVisit: boolean;
};

const Ctx = createContext<I18nCtx | null>(null);
const LS_KEY = "yr_lang";

/** لغة من الرابط: ‎/?lang=ur‎ — تفيد في المشاركة والاختبار، وتُحفظ للزيارات القادمة. */
function langFromUrl(): string | null {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    return q && /^[a-z]{2}(-[A-Za-z]{2,8})?$/.test(q) ? q : null;
  } catch {
    return null;
  }
}

function readStoredLang(): string | null {
  try {
    return localStorage.getItem(LS_KEY);
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const urlLang = langFromUrl();
  const storedLang = readStoredLang();
  const [lang, setLangState] = useState<string>(() => urlLang || storedLang || "ar");
  const [isFirstVisit, setIsFirstVisit] = useState(() => !urlLang && !storedLang);
  const [showPicker, setShowPicker] = useState(() => !urlLang && !storedLang);

  // لغة الرابط تُحفظ فورًا حتى تستمر بعد التنقل داخل الموقع
  useEffect(() => {
    if (!urlLang) return;
    try {
      localStorage.setItem(LS_KEY, urlLang);
    } catch {
      /* التخزين معطّل — نكمل بدون حفظ */
    }
  }, [urlLang]);

  const langsQuery = trpc.languages.list.useQuery(undefined, { staleTime: 60_000 });
  const contentQuery = trpc.content.byLang.useQuery({ lang }, { staleTime: 30_000 });
  const enQuery = trpc.content.byLang.useQuery(
    { lang: "en" },
    { staleTime: 60_000, enabled: lang !== "en" },
  );
  const arQuery = trpc.content.byLang.useQuery(
    { lang: "ar" },
    { staleTime: 60_000, enabled: lang !== "ar" },
  );

  const languages: LangInfo[] = useMemo(
    () =>
      (langsQuery.data ?? []).map((l) => ({
        code: l.code,
        nameEn: l.nameEn,
        nameNative: l.nameNative,
        dir: l.dir,
      })),
    [langsQuery.data],
  );

  const dir: "rtl" | "ltr" =
    languages.find((l) => l.code === lang)?.dir ?? (lang === "ar" || lang === "ur" ? "rtl" : "ltr");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((code: string) => {
    try {
      localStorage.setItem(LS_KEY, code);
    } catch {
      /* التخزين معطّل — نكمل بدون حفظ */
    }
    setLangState(code);
    setIsFirstVisit(false);
    setShowPicker(false);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => {
      // الصفوف الفارغة (لغة لم تُترجم بعد) تسقط إلى الإنجليزية ثم العربية،
      // حتى لا تظهر الصفحة بلا نصوص في اللغات الجديدة.
      const pick = (map?: Record<string, string>) => {
        const raw = map?.[key];
        return raw && raw.trim() !== "" ? raw : undefined;
      };
      let v = pick(contentQuery.data) ?? pick(enQuery.data) ?? pick(arQuery.data) ?? key;
      if (vars) {
        for (const [k, val] of Object.entries(vars)) v = v.replace(`{${k}}`, val);
      }
      return v;
    },
    [contentQuery.data, enQuery.data, arQuery.data],
  );

  const value = useMemo(
    () => ({ lang, dir, languages, setLang, t, showPicker, setShowPicker, isFirstVisit }),
    [lang, dir, languages, setLang, t, showPicker, isFirstVisit],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
