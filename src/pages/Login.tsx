import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";

type Lang = "ar" | "en";

const T: Record<string, { ar: string; en: string }> = {
  title: { ar: "لوحة التحكم", en: "Admin panel" },
  subtitle: { ar: "سجّل دخولك بالبريد وكلمة المرور", en: "Sign in with your email and password" },
  email: { ar: "البريد الإلكتروني", en: "Email" },
  password: { ar: "كلمة المرور", en: "Password" },
  submit: { ar: "دخول", en: "Sign in" },
  loading: { ar: "جاري الدخول…", en: "Signing in…" },
  invalid: { ar: "البريد أو كلمة المرور غير صحيحة", en: "Incorrect email or password" },
  generic: { ar: "تعذّر تسجيل الدخول، حاول مرة أخرى", en: "Could not sign in, please try again" },
  backHome: { ar: "العودة للموقع", en: "Back to site" },
};

export default function Login() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const { user, isLoading } = useAuth();
  const [lang, setLang] = useState<Lang>("ar");
  const t = (k: string) => T[k]?.[lang] ?? k;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = trpc.auth.login.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      navigate("/admin", { replace: true });
    },
  });

  // Already signed in → go straight to the panel.
  useEffect(() => {
    if (!isLoading && user) navigate("/admin", { replace: true });
  }, [isLoading, user, navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  const errorText = login.error
    ? login.error.message === "INVALID_CREDENTIALS"
      ? t("invalid")
      : t("generic")
    : null;

  const inputCls =
    "w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-[#2fa3c4] focus:outline-none bg-white";

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
      className="min-h-screen grid place-items-center bg-stone-100 p-6 text-[#22312c]"
    >
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-2 font-black text-lg">
            <img src="/assets/logo-icon.png" alt="" className="h-9 w-9 object-contain" />
            حقوقك
          </Link>
          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="px-3.5 py-2 rounded-full border border-stone-300 font-bold text-sm hover:border-[#2fa3c4] bg-white"
          >
            {lang === "ar" ? "English" : "عربي"}
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-4"
        >
          <div>
            <h1 className="text-2xl font-black">{t("title")}</h1>
            <p className="text-stone-400 mt-1">{t("subtitle")}</p>
          </div>

          <label className="block">
            <span className="block text-sm font-bold mb-1.5">{t("email")}</span>
            <input
              type="email"
              autoComplete="email"
              required
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </label>

          <label className="block">
            <span className="block text-sm font-bold mb-1.5">{t("password")}</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </label>

          {errorText && <p className="text-sm font-bold text-rose-500">{errorText}</p>}

          <button
            type="submit"
            disabled={login.isPending}
            className="w-full py-3 rounded-xl bg-[#22312c] text-white font-bold hover:opacity-90 disabled:opacity-60"
          >
            {login.isPending ? t("loading") : t("submit")}
          </button>

          <Link to="/" className="block text-center text-sm font-bold text-stone-400 hover:text-[#17788f]">
            {t("backHome")}
          </Link>
        </form>
      </div>
    </div>
  );
}
