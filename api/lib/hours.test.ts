import { describe, expect, it } from "vitest";
import { DEFAULT_HOURS, isWithinHours, parseHours, type HoursConfig } from "./hours";

/** لحظة محددة بتوقيت الرياض (+03:00) مكتوبة كـ UTC. */
function riyadh(dayIso: string, hhmm: string): Date {
  return new Date(`${dayIso}T${hhmm}:00+03:00`);
}

const base: HoursConfig = { ...DEFAULT_HOURS };

describe("parseHours", () => {
  it("يقرأ القيم الصحيحة من جدول الإعدادات", () => {
    const cfg = parseHours({
      hours_enabled: "true",
      hours_start: "08:30",
      hours_end: "17:00",
      hours_days: "1,2,3",
      hours_tz: "+05:30",
    });
    expect(cfg).toEqual({
      enabled: true,
      start: "08:30",
      end: "17:00",
      days: [1, 2, 3],
      tz: "+05:30",
    });
  });

  it("يسقط إلى الافتراضي عند القيم التالفة أو الناقصة", () => {
    const cfg = parseHours({ hours_start: "99:99", hours_end: "", hours_days: "x,9", hours_tz: "abc" });
    expect(cfg.start).toBe(DEFAULT_HOURS.start);
    expect(cfg.end).toBe(DEFAULT_HOURS.end);
    expect(cfg.days).toEqual(DEFAULT_HOURS.days);
    expect(cfg.tz).toBe(DEFAULT_HOURS.tz);
    expect(cfg.enabled).toBe(true);
  });
});

describe("isWithinHours", () => {
  // 2026-09-27 يوافق الأحد (اليوم 0)
  it("مفتوح داخل النطاق في يوم عمل", () => {
    expect(isWithinHours(base, riyadh("2026-09-27", "10:00"))).toBe(true);
  });

  it("مغلق قبل البداية وبعد النهاية", () => {
    expect(isWithinHours(base, riyadh("2026-09-27", "08:59"))).toBe(false);
    expect(isWithinHours(base, riyadh("2026-09-27", "21:00"))).toBe(false);
    expect(isWithinHours(base, riyadh("2026-09-27", "23:30"))).toBe(false);
  });

  it("مغلق في يوم خارج أيام العمل (الجمعة = 5)", () => {
    expect(isWithinHours(base, riyadh("2026-10-02", "12:00"))).toBe(false);
  });

  it("معطّل = متاح دائمًا", () => {
    expect(isWithinHours({ ...base, enabled: false }, riyadh("2026-10-02", "03:00"))).toBe(true);
  });

  it("نطاق يعبر منتصف الليل: مساءً يتبع يوم البداية", () => {
    const night: HoursConfig = { ...base, start: "20:00", end: "02:00", days: [0] };
    expect(isWithinHours(night, riyadh("2026-09-27", "21:00"))).toBe(true);
    // بعد منتصف الليل (الاثنين فجرًا) يتبع الأحد فيبقى مفتوحًا
    expect(isWithinHours(night, riyadh("2026-09-28", "01:00"))).toBe(true);
    // الاثنين مساءً ليس يوم عمل
    expect(isWithinHours(night, riyadh("2026-09-28", "21:00"))).toBe(false);
  });

  it("start == end يعني اليوم بأكمله", () => {
    const allDay: HoursConfig = { ...base, start: "00:00", end: "00:00", days: [0] };
    expect(isWithinHours(allDay, riyadh("2026-09-27", "04:00"))).toBe(true);
    expect(isWithinHours(allDay, riyadh("2026-09-28", "04:00"))).toBe(false);
  });

  it("المنطقة الزمنية تُحتسب: منتصف الليل UTC = الثالثة فجرًا بالرياض", () => {
    expect(isWithinHours(base, new Date("2026-09-27T00:00:00Z"))).toBe(false);
    // 07:00 UTC = 10:00 بالرياض
    expect(isWithinHours(base, new Date("2026-09-27T07:00:00Z"))).toBe(true);
  });
});
