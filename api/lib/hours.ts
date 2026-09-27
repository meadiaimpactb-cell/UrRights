/**
 * أوقات العمل — مصدر واحد للحقيقة يستخدمه الخادم (توفر الدردشة)
 * والواجهة (عرض "متوفرون الآن" أو "خارج أوقات العمل").
 */

export type HoursConfig = {
  enabled: boolean;
  /** "HH:MM" */
  start: string;
  /** "HH:MM" */
  end: string;
  /** أرقام أيام الأسبوع: 0 = الأحد … 6 = السبت */
  days: number[];
  /** إزاحة المنطقة الزمنية مثل "+03:00" */
  tz: string;
};

export const DEFAULT_HOURS: HoursConfig = {
  enabled: true,
  start: "09:00",
  end: "21:00",
  days: [0, 1, 2, 3, 4, 6],
  tz: "+03:00",
};

function parseMinutes(hhmm: string, fallback: number): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec((hhmm ?? "").trim());
  if (!m) return fallback;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return fallback;
  return h * 60 + min;
}

/** إزاحة بالدقائق من نص مثل "+03:00" أو "-05:30". */
function parseOffsetMinutes(tz: string, fallback = 180): number {
  const m = /^([+-])(\d{1,2}):?(\d{2})$/.exec((tz ?? "").trim());
  if (!m) return fallback;
  const sign = m[1] === "-" ? -1 : 1;
  return sign * (Number(m[2]) * 60 + Number(m[3]));
}

/** "HH:MM" بصيغة صحيحة وضمن المدى (00:00 – 23:59). */
function isValidTime(v: string | undefined): boolean {
  const m = /^(\d{1,2}):(\d{2})$/.exec((v ?? "").trim());
  return !!m && Number(m[1]) <= 23 && Number(m[2]) <= 59;
}

/** يبني الإعداد من صفوف جدول settings (قيم نصية). */
export function parseHours(raw: Record<string, string | undefined>): HoursConfig {
  const days = (raw.hours_days ?? "")
    .split(",")
    .map((d) => Number(d.trim()))
    .filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);

  return {
    enabled: (raw.hours_enabled ?? "true") === "true",
    start: isValidTime(raw.hours_start) ? raw.hours_start!.trim() : DEFAULT_HOURS.start,
    end: isValidTime(raw.hours_end) ? raw.hours_end!.trim() : DEFAULT_HOURS.end,
    days: days.length ? days : DEFAULT_HOURS.days,
    tz: /^[+-]\d{1,2}:?\d{2}$/.test(raw.hours_tz ?? "") ? raw.hours_tz! : DEFAULT_HOURS.tz,
  };
}

/**
 * هل نحن داخل أوقات العمل الآن؟ يدعم النطاق الذي يعبر منتصف الليل
 * (مثل 20:00 → 02:00)، ويحسب اليوم بتوقيت المنطقة المحددة.
 */
export function isWithinHours(cfg: HoursConfig, now: Date = new Date()): boolean {
  if (!cfg.enabled) return true; // الأوقات معطّلة = متاح دائمًا

  const offset = parseOffsetMinutes(cfg.tz);
  const local = new Date(now.getTime() + (offset + now.getTimezoneOffset()) * 60_000);
  const day = local.getDay();
  const minutes = local.getHours() * 60 + local.getMinutes();

  const start = parseMinutes(cfg.start, 9 * 60);
  const end = parseMinutes(cfg.end, 21 * 60);

  if (start === end) return cfg.days.includes(day); // يوم كامل

  if (start < end) {
    return cfg.days.includes(day) && minutes >= start && minutes < end;
  }

  // نطاق يعبر منتصف الليل: الجزء المسائي يتبع يوم البداية،
  // والجزء بعد منتصف الليل يتبع اليوم السابق.
  if (minutes >= start) return cfg.days.includes(day);
  if (minutes < end) return cfg.days.includes((day + 6) % 7);
  return false;
}
