import { useI18n } from "@/i18n";
import { iconOf, tintOf } from "./iconRegistry";
import { useBlocks, type BlockItem } from "./useBlocks";
import { IconArrow } from "./icons";

/** الترتيب الافتراضي — يُستخدم فقط ريثما تصل بيانات لوحة التحكم. */
const FALLBACK: BlockItem[] = [
  ["salary", "money", "brand"],
  ["contract", "contract", "green"],
  ["abuse", "shield", "rose"],
  ["eosb", "flag", "amber"],
  ["passport", "lock", "sky"],
  ["injury", "heart", "orange"],
  ["housing", "users", "teal"],
  ["rights", "book", "violet"],
  ["other", "dots", "stone"],
].map(([itemKey, icon, tint], i) => ({
  id: -(i + 1),
  section: "topic",
  itemKey,
  titleKey: `topic.${itemKey}`,
  descKey: `topic.${itemKey}.desc`,
  icon,
  tint,
  sortOrder: i,
  enabled: true,
}));

export function Topics({ onPick }: { onPick: (topic: string) => void }) {
  const { t, dir } = useI18n();
  const topics = useBlocks("topic", FALLBACK);

  if (topics.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16" id="topics">
      <h2 className="font-display text-3xl sm:text-4xl text-[#22312c] mb-2">{t("topics.title")}</h2>
      <p className="text-stone-500 text-lg mb-8">{t("topics.subtitle")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((b, i) => {
          const Icon = iconOf(b.icon);
          return (
            <button
              key={b.itemKey}
              onClick={() => onPick(b.itemKey)}
              className="group flex items-center gap-4 bg-white squircle border border-[#e7e3d3] p-5 text-start shadow-soft hover:shadow-lift hover:-translate-y-0.5 active:scale-[0.99] transition-all min-h-[110px]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className={`w-14 h-14 shrink-0 rounded-2xl grid place-items-center ${tintOf(b.tint)}`}>
                <Icon size={30} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-lg text-[#22312c] leading-snug">
                  {t(b.titleKey)}
                </span>
                {b.descKey && (
                  <span className="block text-sm text-stone-400 mt-0.5">{t(b.descKey)}</span>
                )}
              </span>
              <IconArrow
                size={22}
                className="text-stone-300 group-hover:text-[#17788f] transition-colors shrink-0"
                style={dir === "ltr" ? { transform: "scaleX(-1)" } : undefined}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
