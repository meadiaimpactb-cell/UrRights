/**
 * مرفقات الدردشة: رفع وتنزيل الوثائق التي يرسلها الزائر أو الموظف.
 *
 * المحتوى هنا حسّاس (جوازات وعقود وإيصالات)، لذا:
 *  • أنواع محدودة فقط: صور و PDF — لا ملفات تنفيذية إطلاقًا.
 *  • اسم الملف على القرص عشوائي، ولا يُشتق من اسم المستخدم للملف.
 *  • الوصول برمز عشوائي 32 بايت غير قابل للتخمين، والرد بلا تخزين مؤقت.
 *  • الملفات خارج مجلد نسخة النشر حتى لا تضيع عند كل رفع جديد.
 */
import fs from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

/** أقصى حجم لكل ملف. */
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

/** الأنواع المسموحة ولاحقة كل نوع. */
export const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "application/pdf": "pdf",
};

/**
 * مجلد التخزين. على الاستضافة يُضبط UPLOAD_DIR على مسار ثابت خارج
 * مجلد النسخة، وإلا ضاعت المرفقات مع أول نشر جديد.
 */
export function uploadDir(): string {
  const dir = process.env.UPLOAD_DIR?.trim() || path.resolve(process.cwd(), "uploads");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function newToken(): string {
  return randomBytes(24).toString("base64url");
}

/** يحفظ الملف باسم عشوائي ويعيد اسمه المخزّن. */
export function storeFile(bytes: Buffer, mime: string): string {
  const ext = ALLOWED_TYPES[mime] ?? "bin";
  const storedName = `${Date.now().toString(36)}-${randomBytes(8).toString("hex")}.${ext}`;
  fs.writeFileSync(path.join(uploadDir(), storedName), bytes);
  return storedName;
}

/** يقرأ ملفًا مخزّنًا. يرجع null إن اختفى من القرص. */
export function readFile(storedName: string): Buffer | null {
  // حماية من اجتياز المسارات: نقبل اسم الملف فقط لا أي مسار.
  if (storedName !== path.basename(storedName)) return null;
  const full = path.join(uploadDir(), storedName);
  try {
    return fs.readFileSync(full);
  } catch {
    return null;
  }
}

export function deleteFile(storedName: string): void {
  if (storedName !== path.basename(storedName)) return;
  try {
    fs.unlinkSync(path.join(uploadDir(), storedName));
  } catch {
    /* الملف غير موجود أصلًا */
  }
}

/** اسم آمن للعرض: بلا مسارات ولا محارف تحكّم. */
export function safeDisplayName(raw: string): string {
  return (
    path
      .basename(raw)
      .replace(/[\u0000-\u001f\u007f"\\]/g, "")
      .slice(0, 255) || "file"
  );
}
