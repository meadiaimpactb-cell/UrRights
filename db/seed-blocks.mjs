/**
 * يعبّئ جدولي page_sections و blocks بالعناصر التي كانت مكتوبة داخل الكود،
 * حتى تصبح قابلة للتعديل من لوحة التحكم دون أن يتغيّر شكل الموقع.
 *
 * آمن للتكرار: لا يضيف عنصرًا موجودًا ولا يمسّ النصوص.
 *   node db/seed-blocks.mjs
 */
import mysql from "mysql2/promise";
import { pathToFileURL } from "node:url";

/** أقسام الصفحة الرئيسية بترتيبها الحالي. */
export const PAGE_SECTIONS = [
  "hours",
  "topics",
  "steps",
  "services",
  "why",
  "about",
  "dawah",
  "partners",
  "cta",
];

/** العناصر كما كانت في الكود: [itemKey, titleKey, descKey, icon, tint] */
export const BLOCKS = {
  topic: [
    ["salary", "topic.salary", "topic.salary.desc", "money", "brand"],
    ["contract", "topic.contract", "topic.contract.desc", "contract", "green"],
    ["abuse", "topic.abuse", "topic.abuse.desc", "shield", "rose"],
    ["eosb", "topic.eosb", "topic.eosb.desc", "flag", "amber"],
    ["passport", "topic.passport", "topic.passport.desc", "lock", "sky"],
    ["injury", "topic.injury", "topic.injury.desc", "heart", "orange"],
    ["housing", "topic.housing", "topic.housing.desc", "users", "teal"],
    ["rights", "topic.rights", "topic.rights.desc", "book", "violet"],
    ["other", "topic.other", "topic.other.desc", "dots", "stone"],
  ],
  step: [
    ["step1", "step1.title", "step1.text", "chat", "brand"],
    ["step2", "step2.title", "step2.text", "book", "brand"],
    ["step3", "step3.title", "step3.text", "scale", "brand"],
  ],
  service: [
    ["service1", "service1.title", "service1.text", "megaphone", "brand"],
    ["service2", "service2.title", "service2.text", "users", "brand"],
    ["service3", "service3.title", "service3.text", "handshake", "brand"],
    ["service4", "service4.title", "service4.text", "scale", "brand"],
  ],
  why: [
    ["why1", "why1.title", "why1.text", "heart", "brand"],
    ["why2", "why2.title", "why2.text", "globe", "brand"],
    ["why3", "why3.title", "why3.text", "lock", "brand"],
    ["why4", "why4.title", "why4.text", "check", "brand"],
  ],
  audience: [
    ["1", "audience.1", null, "check", "brand"],
    ["2", "audience.2", null, "check", "brand"],
    ["3", "audience.3", null, "check", "brand"],
    ["4", "audience.4", null, "check", "brand"],
  ],
  weAre: [
    ["1", "about.weAre.1", null, "check", "brand"],
    ["2", "about.weAre.2", null, "check", "brand"],
    ["3", "about.weAre.3", null, "check", "brand"],
  ],
  weAreNot: [
    ["1", "about.weAreNot.1", null, "no", "rose"],
    ["2", "about.weAreNot.2", null, "no", "rose"],
    ["3", "about.weAreNot.3", null, "no", "rose"],
  ],
};

export async function seedBlocks({ url = process.env.DATABASE_URL } = {}) {
  if (!url) throw new Error("DATABASE_URL غير موجود.");
  const db = await mysql.createConnection(url);

  let sections = 0;
  for (let i = 0; i < PAGE_SECTIONS.length; i++) {
    const [res] = await db.execute(
      "INSERT IGNORE INTO page_sections (`key`, enabled, sortOrder) VALUES (?, 1, ?)",
      [PAGE_SECTIONS[i], i + 1],
    );
    if (res.affectedRows === 1) sections++;
  }

  let items = 0;
  for (const [section, list] of Object.entries(BLOCKS)) {
    for (let i = 0; i < list.length; i++) {
      const [itemKey, titleKey, descKey, icon, tint] = list[i];
      const [res] = await db.execute(
        `INSERT IGNORE INTO blocks (section, itemKey, titleKey, descKey, icon, tint, sortOrder, enabled)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
        [section, itemKey, titleKey, descKey, icon, tint, i + 1],
      );
      if (res.affectedRows === 1) items++;
    }
  }

  await db.end();
  return { sections, items };
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  import("dotenv")
    .then(({ default: dotenv }) => {
      dotenv.config();
      return seedBlocks();
    })
    .then((r) => console.log(`✔ أقسام مضافة: ${r.sections} — عناصر مضافة: ${r.items}`))
    .catch((e) => {
      console.error("✖ فشل:", e.message);
      process.exit(1);
    });
}
