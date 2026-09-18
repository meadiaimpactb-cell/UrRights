import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { settings } from "@db/schema";

/** Keys exposed to the public site. */
const PUBLIC_KEYS = [
  "whatsapp_number",
  "social_twitter",
  "social_facebook",
  "social_instagram",
  "social_tiktok",
  "chat_enabled",
];

export const settingsRouter = createRouter({
  /** Public: only whitelisted settings (whatsapp, socials, chat toggle). */
  publicGet: publicQuery.query(async () => {
    const rows = await getDb().select().from(settings);
    const map: Record<string, string> = {};
    for (const r of rows) {
      if (PUBLIC_KEYS.includes(r.key) && r.value != null) map[r.key] = r.value;
    }
    return map;
  }),

  /** Admin: everything. */
  all: adminQuery.query(async () => {
    const rows = await getDb().select().from(settings);
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value ?? "";
    return map;
  }),

  set: adminQuery
    .input(z.object({ key: z.string().min(1).max(100), value: z.string().max(4000) }))
    .mutation(async ({ input }) => {
      await getDb()
        .insert(settings)
        .values({ key: input.key, value: input.value })
        .onDuplicateKeyUpdate({ set: { value: input.value } });
      return { ok: true };
    }),

  setMany: adminQuery
    .input(z.record(z.string(), z.string().max(4000)))
    .mutation(async ({ input }) => {
      const db = getDb();
      for (const [key, value] of Object.entries(input)) {
        await db
          .insert(settings)
          .values({ key, value })
          .onDuplicateKeyUpdate({ set: { value } });
      }
      return { ok: true };
    }),
});
