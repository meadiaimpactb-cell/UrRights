/**
 * إنشاء (أو تحديث) حساب مدير بالبريد وكلمة المرور.
 *
 *   npm run admin:create -- admin@example.com "StrongPassword123" "الاسم"
 *
 * أو عبر البيئة: ADMIN_EMAIL و ADMIN_PASSWORD و ADMIN_NAME.
 * إن كان البريد موجودًا: تُحدَّث كلمة المرور ويُرفع إلى admin.
 */
import "dotenv/config";
import mysql from "mysql2/promise";
import { randomBytes, randomUUID, scrypt as scryptCb } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb);

// نفس الصيغة المستخدمة في api/auth/password.ts
async function hashPassword(password) {
  const N = 16384, r = 8, p = 1;
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, 64, { N, r, p });
  return ["scrypt", N, r, p, salt.toString("base64"), key.toString("base64")].join("$");
}

const [, , argEmail, argPassword, argName] = process.argv;
const email = (argEmail || process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = argPassword || process.env.ADMIN_PASSWORD || "";
const name = argName || process.env.ADMIN_NAME || "Admin";

if (!email || !password) {
  console.error('✖ الاستخدام: npm run admin:create -- <email> <password> ["الاسم"]');
  process.exit(1);
}
if (password.length < 8) {
  console.error("✖ كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("✖ DATABASE_URL غير موجود. ضعه في ملف .env");
  process.exit(1);
}

const db = await mysql.createConnection(process.env.DATABASE_URL);
const hash = await hashPassword(password);

await db.execute(
  `INSERT INTO users (unionId, name, email, passwordHash, role)
   VALUES (?, ?, ?, ?, 'admin')
   ON DUPLICATE KEY UPDATE passwordHash = VALUES(passwordHash), role = 'admin', name = VALUES(name)`,
  [randomUUID(), name, email, hash],
);

console.log(`✔ حساب المدير جاهز: ${email}`);
await db.end();
