import { Link } from "react-router";
import { LanguageProvider, useI18n } from "@/i18n";
import { trpc } from "@/providers/trpc";
import { IconLock, IconWhatsapp, IconArrow } from "@/site/icons";
import { waLink } from "@/lib/site";

const PARAGRAPHS = ["privacy.p1", "privacy.p2", "privacy.p3", "privacy.p4", "privacy.p5"];

function PrivacyInner() {
  const { t, dir } = useI18n();
  const settingsQuery = trpc.settings.publicGet.useQuery(undefined, { staleTime: 60_000 });
  const whatsapp = settingsQuery.data?.whatsapp_number ?? "";

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <header className="bg-white border-b border-[#e7e3d3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/assets/logo-mark.png" alt="" className="h-10 w-10" />
            <span className="text-xl sm:text-2xl font-display text-[#22312c]">{t("brand.name")}</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 bg-white font-semibold text-sm text-[#22312c] hover:border-[#2fa3c4] transition-colors"
          >
            <IconArrow
              size={18}
              style={dir === "rtl" ? undefined : { transform: "scaleX(-1)" }}
            />
            {t("privacy.back")}
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <span className="w-14 h-14 rounded-2xl bg-grad-brand text-white grid place-items-center mb-5">
          <IconLock size={28} />
        </span>
        <h1 className="font-display text-3xl sm:text-5xl text-[#22312c] mb-3">{t("privacy.title")}</h1>
        <p className="text-lg sm:text-xl text-stone-500 leading-relaxed mb-9">{t("privacy.intro")}</p>

        <div className="space-y-4">
          {PARAGRAPHS.map((k) => (
            <section key={k} className="bg-white squircle border border-[#e7e3d3] p-6 shadow-soft">
              <h2 className="font-bold text-xl text-[#22312c] mb-2">{t(`${k}.title`)}</h2>
              <p className="text-stone-500 leading-relaxed">{t(`${k}.text`)}</p>
            </section>
          ))}
        </div>

        {whatsapp && (
          <div className="mt-8 bg-white squircle border border-[#e7e3d3] p-6 shadow-soft">
            <p className="text-stone-600 leading-relaxed mb-4">{t("privacy.contact")}</p>
            <a
              href={waLink(whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#22b358] text-white font-bold hover:bg-[#1da34e] transition-colors"
            >
              <IconWhatsapp size={22} />
              {t("hero.ctaWhatsapp")}
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Privacy() {
  return (
    <LanguageProvider>
      <PrivacyInner />
    </LanguageProvider>
  );
}
