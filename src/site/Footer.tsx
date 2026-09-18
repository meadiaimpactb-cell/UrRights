import { Link } from "react-router";
import { useI18n } from "@/i18n";
import { trpc } from "@/providers/trpc";
import {
  IconXTwitter,
  IconFacebook,
  IconInstagram,
  IconTiktok,
  IconWhatsapp,
  IconHeart,
} from "./icons";

export function Footer({ whatsapp }: { whatsapp: string }) {
  const { t } = useI18n();
  const settingsQuery = trpc.settings.publicGet.useQuery(undefined, { staleTime: 60_000 });
  const s = settingsQuery.data ?? {};

  const socials = [
    { key: "social_twitter", url: s.social_twitter, Icon: IconXTwitter, label: "X" },
    { key: "social_facebook", url: s.social_facebook, Icon: IconFacebook, label: "Facebook" },
    { key: "social_instagram", url: s.social_instagram, Icon: IconInstagram, label: "Instagram" },
    { key: "social_tiktok", url: s.social_tiktok, Icon: IconTiktok, label: "TikTok" },
  ].filter((x) => x.url);

  return (
    <footer className="bg-[#22312c] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/assets/logo-icon.png" alt="" className="h-10 w-10 object-contain" />
              <span className="text-2xl font-display">{t("brand.name")}</span>
            </div>
            <p className="text-white/60 leading-relaxed max-w-xs">{t("footer.about")}</p>
            <span className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5cb98b]/15 text-[#8fd7b3] text-sm font-bold">
              <IconHeart size={15} />
              {t("footer.free")}
            </span>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.contact")}</h3>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#22b358] text-white font-bold hover:bg-[#1da34e] transition-colors"
            >
              <IconWhatsapp size={21} />
              WhatsApp
            </a>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t("footer.follow")}</h3>
            {socials.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {socials.map(({ key, url, Icon, label }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center hover:bg-white/20 transition-colors"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-sm">—</p>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <span>© {new Date().getFullYear()} {t("brand.name")} — {t("footer.rights")}</span>
          <Link to="/login" className="hover:text-white transition-colors font-semibold">
            {t("nav.login")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
