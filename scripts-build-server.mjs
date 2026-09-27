/**
 * يبني خادم الإنتاج إلى dist/index.js بصيغة CommonJS.
 * لماذا CommonJS؟ مشغّل Node في الاستضافة (LiteSpeed lsnode.js) يحمّل ملف الدخول بـ require()،
 * وهذا يرفض وحدات ESM التي تحتوي await على المستوى الأعلى، ويفشل على Node 20 مع ESM عمومًا.
 */
import { build } from "esbuild";
import fs from "node:fs";

await build({
  entryPoints: ["api/boot.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node18",
  sourcemap: false,
  logLevel: "info",
  // import.meta.url غير موجود في CommonJS — نستبدله بمسار الملف الحالي.
  define: { "import.meta.url": "__importMetaUrl" },
  banner: {
    js: 'const __importMetaUrl = require("url").pathToFileURL(__filename).href;',
  },
});

// package.json الجذر فيه "type": "module"، فنعلن أن dist/ بصيغة CommonJS حتى يقبله require().
fs.writeFileSync("dist/package.json", JSON.stringify({ type: "commonjs" }, null, 2) + "\n");
console.log("✔ dist/index.js (CommonJS) + dist/package.json");
