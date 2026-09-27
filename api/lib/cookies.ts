import type { CookieOptions } from "hono/utils/cookie";

/** النطاق الرسمي للموقع. */
export const SITE_DOMAIN = "urrights.org";

function isLocalhost(headers: Headers): boolean {
  const host = headers.get("host") || "";
  return host.startsWith("localhost:") || host.startsWith("127.0.0.1:");
}

/**
 * هل الطلب وصل عبر HTTPS؟ خلف وكيل عكسي (Hostinger أو Apache محليًا) نعتمد
 * على X-Forwarded-Proto. بدون الرأس نفترض HTTPS خارج localhost (الإنتاج).
 */
function isSecureRequest(headers: Headers): boolean {
  const proto = headers.get("x-forwarded-proto")?.split(",")[0].trim().toLowerCase();
  if (proto) return proto === "https";
  return !isLocalhost(headers);
}

/**
 * الجلسة كوكي من نفس الموقع (لا تحويلات خارجية بعد الآن)، لذا SameSite=Lax
 * يكفي ويحمي من CSRF. Secure مفعّل كلما كان الطلب عبر HTTPS (urrights.org).
 */
export function getSessionCookieOptions(headers: Headers): CookieOptions {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    secure: isSecureRequest(headers),
  };
}
