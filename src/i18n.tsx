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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<string>(() => localStorage.getItem(LS_KEY) || "ar");
  const [isFirstVisit, setIsFirstVisit] = useState(() => !localStorage.getItem(LS_KEY));
  const [showPicker, setShowPicker] = useState(() => !localStorage.getItem(LS_KEY));

  const langsQuery = trpc.languages.list.useQuery(undefined, { staleTime: 60_000 });
  const contentQuery = trpc.content.byLang.useQuery({ lang }, { staleTime: 30_000 });
  const enQuery = trpc.content.byLang.useQuery(
    { lang: "en" },
    { staleTime: 60_000, enabled: lang !== "en" },
  );
  const arQuery = trpc.content.byLang.useQuery(
    { lang: "ar" },
    { staleTime: 60_000, enabled: lang !== "ar" && lang !== "en" },
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
    localStorage.setItem(LS_KEY, code);
    setLangState(code);
    setIsFirstVisit(false);
    setShowPicker(false);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => {
      let v =
        contentQuery.data?.[key] ??
        enQuery.data?.[key] ??
        arQuery.data?.[key] ??
        key;
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
