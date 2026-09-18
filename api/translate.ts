/**
 * Server-side translation helper (free providers, no key required).
 * Chain: Google Translate (gtx) → MyMemory. Returns null when unavailable —
 * callers then fall back to showing the original text.
 *
 * The optional `translation_email` setting (admin → settings) is passed to
 * MyMemory as the `de` parameter, raising its free daily quota.
 */
import { getDb } from "./queries/connection";
import { settings } from "@db/schema";
import { eq } from "drizzle-orm";

const GOOGLE_CODE: Record<string, string> = { tl: "tl" }; // google uses tl for Filipino
const MYMEMORY_CODE: Record<string, string> = { tl: "fil" };

async function viaGoogle(text: string, src: string, dst: string): Promise<string | null> {
  try {
    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx` +
      `&sl=${encodeURIComponent(GOOGLE_CODE[src] ?? src)}` +
      `&tl=${encodeURIComponent(GOOGLE_CODE[dst] ?? dst)}` +
      `&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(7000),
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as [[[string, string][]][0] | null];
    const parts = (data?.[0] ?? []) as [string, string][];
    const out = parts.map((p) => p?.[0] ?? "").join("");
    return out.trim() ? out : null;
  } catch {
    return null;
  }
}

let emailCache: { v: string; ts: number } | null = null;
async function translationEmail(): Promise<string> {
  if (emailCache && Date.now() - emailCache.ts < 60_000) return emailCache.v;
  try {
    const row = await getDb().query.settings.findFirst({
      where: eq(settings.key, "translation_email"),
    });
    emailCache = { v: row?.value ?? "", ts: Date.now() };
  } catch {
    emailCache = { v: "", ts: Date.now() };
  }
  return emailCache.v;
}

async function viaMyMemory(text: string, src: string, dst: string): Promise<string | null> {
  try {
    const email = await translationEmail();
    const url =
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 500))}` +
      `&langpair=${encodeURIComponent(`${MYMEMORY_CODE[src] ?? src}|${MYMEMORY_CODE[dst] ?? dst}`)}` +
      (email ? `&de=${encodeURIComponent(email)}` : "");
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      responseStatus?: number;
      responseData?: { translatedText?: string };
    };
    const out = data?.responseData?.translatedText;
    if (!out || data.responseStatus !== 200) return null;
    if (/MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(out)) return null;
    return out;
  } catch {
    return null;
  }
}

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string,
): Promise<string | null> {
  if (sourceLang === targetLang) return text;
  const trimmed = text.trim();
  if (!trimmed) return null;
  return (
    (await viaGoogle(trimmed, sourceLang, targetLang)) ??
    (await viaMyMemory(trimmed, sourceLang, targetLang))
  );
}
