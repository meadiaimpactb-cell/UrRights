/**
 * سجل الأيقونات: يربط اسمًا نصيًا محفوظًا في قاعدة البيانات بمكوّن الأيقونة.
 * يسمح للمسؤول باختيار أيقونة أي عنصر من لوحة التحكم دون لمس الكود.
 */
import {
  IconBook,
  IconChat,
  IconCheck,
  IconClock,
  IconContract,
  IconDots,
  IconFlag,
  IconGlobe,
  IconHandshake,
  IconHeart,
  IconInfo,
  IconLock,
  IconMegaphone,
  IconMoney,
  IconMosque,
  IconNo,
  IconPhone,
  IconScale,
  IconShieldHeart,
  IconUsers,
  IconWhatsapp,
} from "./icons";

export type IconComponent = typeof IconBook;

export const ICONS: Record<string, IconComponent> = {
  money: IconMoney,
  contract: IconContract,
  shield: IconShieldHeart,
  flag: IconFlag,
  lock: IconLock,
  heart: IconHeart,
  users: IconUsers,
  book: IconBook,
  dots: IconDots,
  chat: IconChat,
  scale: IconScale,
  handshake: IconHandshake,
  megaphone: IconMegaphone,
  globe: IconGlobe,
  check: IconCheck,
  clock: IconClock,
  info: IconInfo,
  no: IconNo,
  mosque: IconMosque,
  phone: IconPhone,
  whatsapp: IconWhatsapp,
};

/** أسماء الأيقونات لعرضها في منتقي الأيقونات داخل اللوحة. */
export const ICON_NAMES = Object.keys(ICONS);

export function iconOf(name: string | null | undefined): IconComponent {
  return ICONS[name ?? ""] ?? IconDots;
}

/** ألوان بطاقات المشكلات — يختارها المسؤول من اللوحة. */
export const TINTS: Record<string, string> = {
  brand: "bg-[#2fa3c4]/10 text-[#17788f]",
  green: "bg-[#5cb98b]/10 text-[#2e9c6a]",
  rose: "bg-rose-500/10 text-rose-600",
  amber: "bg-amber-500/10 text-amber-600",
  sky: "bg-sky-500/10 text-sky-600",
  orange: "bg-orange-500/10 text-orange-600",
  teal: "bg-teal-500/10 text-teal-600",
  violet: "bg-violet-500/10 text-violet-600",
  stone: "bg-stone-500/10 text-stone-500",
};

export const TINT_NAMES = Object.keys(TINTS);

export function tintOf(name: string | null | undefined): string {
  return TINTS[name ?? ""] ?? TINTS.brand;
}
