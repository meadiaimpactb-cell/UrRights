import { useI18n } from "@/i18n";
import {
  IconMoney,
  IconContract,
  IconShieldHeart,
  IconFlag,
  IconBook,
  IconDots,
  IconArrow,
} from "./icons";

const TOPICS = [
  { key: "salary", Icon: IconMoney, tint: "bg-[#2fa3c4]/10 text-[#17788f]" },
  { key: "contract", Icon: IconContract, tint: "bg-[#5cb98b]/10 text-[#2e9c6a]" },
  { key: "abuse", Icon: IconShieldHeart, tint: "bg-rose-500/10 text-rose-600" },
  { key: "eosb", Icon: IconFlag, tint: "bg-amber-500/10 text-amber-600" },
  { key: "rights", Icon: IconBook, tint: "bg-violet-500/10 text-violet-600" },
  { key: "other", Icon: IconDots, tint: "bg-stone-500/10 text-stone-500" },
] as const;

export function Topics({ onPick }: { onPick: (topic: string) => void }) {
  const { t, dir } = useI18n();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16" id="topics">
      <h2 className="font-display text-3xl sm:text-4xl text-[#22312c] mb-2">{t("topics.title")}</h2>
      <p className="text-stone-500 text-lg mb-8">{t("topics.subtitle")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOPICS.map(({ key, Icon, tint }, i) => (
          <button
            key={key}
            onClick={() => onPick(key)}
            className="group flex items-center gap-4 bg-white squircle border border-[#e7e3d3] p-5 text-start shadow-soft hover:shadow-lift hover:-translate-y-0.5 active:scale-[0.99] transition-all min-h-[110px]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className={`w-14 h-14 shrink-0 rounded-2xl grid place-items-center ${tint}`}>
              <Icon size={30} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-bold text-lg text-[#22312c] leading-snug">
                {t(`topic.${key}`)}
              </span>
              <span className="block text-sm text-stone-400 mt-0.5">{t(`topic.${key}.desc`)}</span>
            </span>
            <IconArrow
              size={22}
              className="text-stone-300 group-hover:text-[#17788f] transition-colors shrink-0"
              style={dir === "ltr" ? { transform: "scaleX(-1)" } : undefined}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
