import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { serve, type HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { serveStaticFiles } from "./lib/vite";
import { bootstrapDatabase, describeDbError } from "./lib/bootstrap";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));
// فحص صحة: /api/health يرد فورًا، و /api/health?db=1 يختبر الاتصال بقاعدة البيانات
// ويعيد رمز الخطأ الأصلي (بدون بيانات الدخول) لتسهيل التشخيص على الاستضافة.
app.get("/api/health", async (c) => {
  const body: Record<string, unknown> = { ok: true, ts: Date.now() };
  if (c.req.query("db") !== undefined) {
    const { checkDatabase } = await import("./lib/bootstrap");
    body.db = await checkDatabase();
  }
  return c.json(body);
});
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

/**
 * في الإنتاج يُحمَّل هذا الملف بـ require() من مشغّل الاستضافة (LiteSpeed lsnode)،
 * لذا يُبنى بصيغة CommonJS بلا await على المستوى الأعلى، ويبدأ الاستماع فورًا.
 */
if (env.isProduction) {
  serveStaticFiles(app);

  // نفتح المنفذ أولًا حتى تراه الاستضافة حيًا فورًا، ثم نهيّئ قاعدة البيانات في الخلفية.
  const port = parseInt(process.env.PORT || "3000");
  const hostname = process.env.HOST || "0.0.0.0";
  serve({ fetch: app.fetch, port, hostname }, () => {
    console.log(`Server running on http://${hostname}:${port} (production: https://urrights.org)`);
    bootstrapDatabase().catch((error) => {
      // لا نوقف الخادم: الموقع يعمل وتظهر المشكلة في سجلات التشغيل.
      console.error("[bootstrap] database initialization failed:", describeDbError(error));
    });
  });
}

process.on("unhandledRejection", (reason) => {
  console.error("[process] unhandled rejection:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("[process] uncaught exception:", error);
});
