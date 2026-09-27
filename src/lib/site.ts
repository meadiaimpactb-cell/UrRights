/** أدوات مشتركة للواجهة العامة: الواتساب وأوقات العمل. */

/** الرقم الافتراضي في التعبئة الأولية — يعني أن المسؤول لم يضع الرقم الحقيقي بعد. */
export const PLACEHOLDER_WHATSAPP = "966500000000";

/** يزيل كل ما ليس رقمًا (مسافات، شرطات، +) ليقبله رابط wa.me. */
export function normalizeWhatsapp(raw?: string | null): string {
  return (raw ?? "").replace(/\D/g, "");
}

/** هل الرقم صالح للاستخدام فعلًا (موجود وليس الرقم الافتراضي)؟ */
export function isWhatsappReady(raw?: string | null): boolean {
  const n = normalizeWhatsapp(raw);
  return n.length >= 8 && n !== PLACEHOLDER_WHATSAPP;
}

/** يعرض الرقم بصيغة مقروءة مثل ‎+966 50 000 0000 */
export function formatWhatsapp(raw?: string | null): string {
  const n = normalizeWhatsapp(raw);
  if (!n) return "";
  const groups = n.length > 9 ? [n.slice(0, 3), n.slice(3, 5), n.slice(5, 8), n.slice(8)] : [n];
  return "+" + groups.filter(Boolean).join(" ");
}

/** رابط واتساب مع رسالة جاهزة بلغة الزائر. */
export function waLink(raw?: string | null, message?: string): string {
  const n = normalizeWhatsapp(raw);
  const base = `https://wa.me/${n}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/* ------------------------------ أوقات العمل ------------------------------ */

export type HoursView = {
  enabled: boolean;
  open: boolean;
  start: string;
  end: string;
  days: number[];
};

function toMinutes(hhmm: string, fallback: number): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec((hhmm ?? "").trim());
  if (!m) return fallback;
  const h = Number(m[1]);
  const min = Number(m[2]);
  return h > 23 || min > 59 ? fallback : h * 60 + min;
}

function offsetMinutes(tz: string): number {
  const m = /^([+-])(\d{1,2}):?(\d{2})$/.exec((tz ?? "").trim());
  if (!m) return 180;
  return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3]));
}

/**
 * يقرأ أوقات العمل من الإعدادات العامة ويحسب إن كنا داخلها الآن.
 * نفس منطق الخادم في api/lib/hours.ts.
 */
/** "HH:MM" بصيغة صحيحة وضمن المدى (00:00 – 23:59). */
function isValidTime(v: string | undefined): boolean {
  const m = /^(\d{1,2}):(\d{2})$/.exec((v ?? "").trim());
  return !!m && Number(m[1]) <= 23 && Number(m[2]) <= 59;
}

export function readHours(s: Record<string, string> = {}, now: Date = new Date()): HoursView {
  const enabled = (s.hours_enabled ?? "true") === "true";
  const start = isValidTime(s.hours_start) ? s.hours_start!.trim() : "09:00";
  const end = isValidTime(s.hours_end) ? s.hours_end!.trim() : "21:00";
  const days = (s.hours_days ?? "0,1,2,3,4,6")
    .split(",")
    .map((d) => Number(d.trim()))
    .filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);

  const view: HoursView = {
    enabled,
    open: true,
    start: start!,
    end: end!,
    days: days.length ? days : [0, 1, 2, 3, 4, 6],
  };
  if (!enabled) return view;

  const off = offsetMinutes(s.hours_tz ?? "+03:00");
  const local = new Date(now.getTime() + (off + now.getTimezoneOffset()) * 60_000);
  const day = local.getDay();
  const minutes = local.getHours() * 60 + local.getMinutes();
  const from = toMinutes(view.start, 540);
  const to = toMinutes(view.end, 1260);

  if (from === to) view.open = view.days.includes(day);
  else if (from < to) view.open = view.days.includes(day) && minutes >= from && minutes < to;
  else if (minutes >= from) view.open = view.days.includes(day);
  else if (minutes < to) view.open = view.days.includes((day + 6) % 7);
  else view.open = false;

  return view;
}

/** "السبت إلى الخميس" أو "السبت، الأحد" حسب تتابع الأيام. */
export function formatDays(days: number[], dayName: (d: number) => string): string {
  if (days.length === 0) return "";
  if (days.length === 7) return dayName(-1);
  // ترتيب أسبوعي يبدأ بالسبت (6) ليطابق العُرف المحلي
  const order = [6, 0, 1, 2, 3, 4, 5];
  const sorted = order.filter((d) => days.includes(d));
  let consecutive = true;
  for (let i = 1; i < sorted.length; i++) {
    if (order.indexOf(sorted[i]) !== order.indexOf(sorted[i - 1]) + 1) consecutive = false;
  }
  if (consecutive && sorted.length > 2) {
    return `${dayName(sorted[0])} – ${dayName(sorted[sorted.length - 1])}`;
  }
  return sorted.map(dayName).join("، ");
}

/** يحوّل "18:30" إلى صيغة 12 ساعة بلغة الزائر. */
export function formatTime(hhmm: string, locale: string): string {
  const m = /^(\d{1,2}):(\d{2})$/.exec((hhmm ?? "").trim());
  if (!m) return hhmm;
  const d = new Date(2000, 0, 1, Number(m[1]), Number(m[2]));
  try {
    return new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(d);
  } catch {
    return hhmm;
  }
}
