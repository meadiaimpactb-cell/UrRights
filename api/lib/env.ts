import "dotenv/config";

// Vite يضبط NODE_ENV=development أثناء `npm run dev`؛ في أي حالة أخرى نعتبره إنتاجًا
// حتى يعمل `node dist/boot.js` مباشرة على أي نظام دون الحاجة لضبط المتغير يدويًا.
const nodeEnv = process.env.NODE_ENV || "production";
process.env.NODE_ENV = nodeEnv;
const isProduction = nodeEnv === "production";

function required(name: string): string {
  const value = process.env[name];
  if (!value && isProduction) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

export const env = {
  appSecret: required("APP_SECRET"),
  isProduction,
  databaseUrl: required("DATABASE_URL"),
  /** Legacy Kimi OAuth settings — unused; kept only so api/kimi/* still type-checks. */
  appId: process.env.APP_ID ?? "",
  kimiAuthUrl: process.env.KIMI_AUTH_URL ?? "",
  kimiOpenUrl: process.env.KIMI_OPEN_URL ?? "",
  ownerUnionId: process.env.OWNER_UNION_ID ?? "",
};
