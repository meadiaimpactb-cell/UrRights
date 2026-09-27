import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// يعمل على كل نسخ Node (import.meta.dirname يحتاج 20.11+)
const HERE = path.dirname(fileURLToPath(import.meta.url));

type App = Hono<{ Bindings: HttpBindings }>;

export function serveStaticFiles(app: App) {
  // dist/boot.js يجاور dist/public — لا نعتمد على مجلد التشغيل الحالي.
  const distPath = path.resolve(HERE, "public");
  const root = path.relative(process.cwd(), distPath) || ".";

  app.use("*", serveStatic({ root }));

  app.notFound((c) => {
    const accept = c.req.header("accept") ?? "";
    if (!accept.includes("text/html")) {
      return c.json({ error: "Not Found" }, 404);
    }
    const indexPath = path.resolve(distPath, "index.html");
    const content = fs.readFileSync(indexPath, "utf-8");
    return c.html(content);
  });
}
