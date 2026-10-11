/** معالِجا رفع وتنزيل مرفقات الدردشة. */
import type { Context } from "hono";
import { eq } from "drizzle-orm";
import { chatFiles, chatSessions, settings } from "@db/schema";
import { getDb } from "../queries/connection";
import {
  ALLOWED_TYPES,
  MAX_UPLOAD_BYTES,
  newToken,
  readFile,
  safeDisplayName,
  storeFile,
} from "./uploads";

/** هل رفع المرفقات مفعّل؟ يتحكّم به المسؤول من الإعدادات. */
async function uploadsEnabled(): Promise<boolean> {
  try {
    const rows = await getDb().select().from(settings);
    return (rows.find((r) => r.key === "uploads_enabled")?.value ?? "true") === "true";
  } catch {
    return false;
  }
}

export async function uploadAttachment(c: Context) {
  if (!(await uploadsEnabled())) {
    return c.json({ error: "UPLOADS_DISABLED" }, 403);
  }

  let form: FormData;
  try {
    form = await c.req.formData();
  } catch {
    return c.json({ error: "BAD_FORM" }, 400);
  }

  const sessionId = Number(form.get("sessionId"));
  const file = form.get("file");
  if (!Number.isInteger(sessionId) || !(file instanceof File)) {
    return c.json({ error: "BAD_INPUT" }, 400);
  }

  const db = getDb();
  const session = await db.query.chatSessions.findFirst({
    where: eq(chatSessions.id, sessionId),
  });
  if (!session || session.status === "closed") {
    return c.json({ error: "SESSION_CLOSED" }, 404);
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return c.json({ error: "TOO_LARGE", max: MAX_UPLOAD_BYTES }, 413);
  }
  const mime = (file.type || "").toLowerCase();
  if (!ALLOWED_TYPES[mime]) {
    return c.json({ error: "TYPE_NOT_ALLOWED", allowed: Object.keys(ALLOWED_TYPES) }, 415);
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length === 0) return c.json({ error: "EMPTY" }, 400);

  const storedName = storeFile(bytes, mime);
  const token = newToken();
  const name = safeDisplayName(file.name || "file");
  const uploadedBy = form.get("by") === "agent" ? "agent" : "visitor";

  const [{ id }] = await db
    .insert(chatFiles)
    .values({ sessionId, token, name, mime, size: bytes.length, storedName, uploadedBy })
    .$returningId();

  return c.json({ id, token, name, mime, size: bytes.length });
}

export async function downloadAttachment(c: Context) {
  const token = c.req.param("token");
  if (!token || token.length < 16) return c.json({ error: "NOT_FOUND" }, 404);

  const row = await getDb().query.chatFiles.findFirst({
    where: eq(chatFiles.token, token),
  });
  if (!row) return c.json({ error: "NOT_FOUND" }, 404);

  const bytes = readFile(row.storedName);
  if (!bytes) return c.json({ error: "GONE" }, 410);

  // الصور تُعرض داخل الصفحة، وبقية الأنواع تُنزَّل.
  const inline = row.mime.startsWith("image/");
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": row.mime || "application/octet-stream",
      "Content-Length": String(bytes.length),
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(row.name)}`,
      // وثائق شخصية: لا تُخزَّن في أي وسيط بين الخادم والمتصفح.
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
    },
  });
}
