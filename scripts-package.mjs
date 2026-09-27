/**
 * يبني المشروع ويضغطه في urrights-deploy.zip جاهزًا للرفع على الاستضافة.
 * يستثني node_modules و .env وملفات التطوير، ويشمل dist المبني احتياطًا.
 * لا يحتاج حزمًا إضافية: يستخدم Compress-Archive على ويندوز و zip على غيره.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname);
const out = path.join(root, "urrights-deploy.zip");
const stage = fs.mkdtempSync(path.join(os.tmpdir(), "urrights-deploy-"));

const EXCLUDE = new Set([
  "node_modules", ".git", ".env", ".env.local", "urrights-deploy.zip",
  ".vscode", ".idea", "coverage", ".backend-features.json",
]);
const skip = (name) =>
  EXCLUDE.has(name) || name.endsWith(".log") || name.endsWith(".tsbuildinfo");

execSync("npm run build", { stdio: "inherit", cwd: root });

fs.cpSync(root, stage, {
  recursive: true,
  filter: (src) => !skip(path.basename(src)),
});

if (fs.existsSync(out)) fs.unlinkSync(out);
if (process.platform === "win32") {
  // tar.exe (bsdtar) مدمج في ويندوز 10+ وينتج zip بمسارات "/" قياسية تصلح للينكس.
  const tar = path.join(process.env.SystemRoot ?? "C:\Windows", "System32", "tar.exe");
  const entries = fs.readdirSync(stage).map((n) => `"${n}"`).join(" ");
  execSync(`"${tar}" -a -cf "${out}" -C "${stage}" ${entries}`, { stdio: "inherit" });
} else {
  execSync(`zip -qr "${out}" .`, { stdio: "inherit", cwd: stage });
}
fs.rmSync(stage, { recursive: true, force: true });

const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
console.log(`\n✔ ${path.basename(out)} — ${mb} MB — ارفعه من hPanel ← Deployments`);
