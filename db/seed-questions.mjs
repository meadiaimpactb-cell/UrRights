/**
 * أسئلة الاستبيان لكل نوع مشكلة — منقولة من ملف «الخدمات الإلكترونية لموقع حقوقك».
 * كل سؤال اختيار من متعدد بإجابة واحدة.
 *
 * النصوص تُخزَّن في جدول contents بمفاتيح q.<topic>.<n> و q.<topic>.<n>.o<m>
 * فتبقى مترجمة لكل لغة كبقية نصوص الموقع.
 *
 * آمن للتكرار: لا يضيف سؤالًا موجودًا ولا يمسّ نصًا محرَّرًا من اللوحة.
 *   node db/seed-questions.mjs
 */
import mysql from "mysql2/promise";
import { pathToFileURL } from "node:url";

/** [نص السؤال بالعربية, نصه بالإنجليزية, [[خيار عربي, خيار إنجليزي], ...]] */
export const QUESTIONS = {
  salary: [
    ["من متى لم تستلم راتبك؟", "How long have you not been paid?", [
      ["أقل من شهر", "Less than a month"],
      ["شهر", "One month"],
      ["شهران أو أكثر", "Two months or more"],
    ]],
    ["هل تأخر الراتب كاملًا أم جزء منه؟", "Is the whole salary late, or part of it?", [
      ["كاملًا", "The whole salary"],
      ["جزء منه", "Part of it"],
    ]],
    ["هل المشكلة تكررت من قبل؟", "Has this happened before?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
    ["هل ما زلت تعمل لدى نفس الشركة؟", "Are you still working for the same company?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
  ],

  contract: [
    ["ما المشكلة في عملك؟", "What is the problem with your job?", [
      ["ساعات أكثر", "More hours"],
      ["راتب مختلف", "Different salary"],
      ["عمل مختلف", "Different work"],
      ["شيء آخر", "Something else"],
    ]],
    ["هل لديك عقد عمل؟", "Do you have an employment contract?", [
      ["نعم", "Yes"],
      ["لا", "No"],
      ["لا أعرف", "I don't know"],
    ]],
    ["منذ متى بدأت المشكلة؟", "When did the problem start?", [
      ["مؤخرًا", "Recently"],
      ["من فترة طويلة", "A long time ago"],
    ]],
    ["هل تحدثت مع صاحب العمل؟", "Have you spoken to your employer?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
  ],

  abuse: [
    ["ما نوع المعاملة التي تعرضت لها؟", "What kind of treatment did you experience?", [
      ["ضرب أو تهديد", "Beating or threats"],
      ["إهانة", "Insults"],
      ["منع طعام أو راحة", "Being denied food or rest"],
      ["شيء آخر", "Something else"],
    ]],
    ["هل حدث ذلك أكثر من مرة؟", "Has it happened more than once?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
    ["هل أنت في مكان آمن الآن؟", "Are you in a safe place now?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
    ["هل تحتاج إلى تواصل عاجل؟", "Do you need urgent contact?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
  ],

  eosb: [
    ["ماذا تريد أن تفعل؟", "What would you like to do?", [
      ["نقل إلى عمل آخر", "Transfer to another job"],
      ["إنهاء العقد", "End the contract"],
      ["العودة لبلدي", "Return to my country"],
      ["لا أعرف", "I don't know"],
    ]],
    ["هل ما زلت تعمل حاليًا؟", "Are you still working now?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
    ["هل لديك مستحقات لم تستلمها؟", "Do you have unpaid dues?", [
      ["نعم", "Yes"],
      ["لا", "No"],
      ["لا أعرف", "I don't know"],
    ]],
    ["هل أخبرت صاحب العمل؟", "Have you told your employer?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
  ],

  passport: [
    ["ما الوثيقة التي لا تستطيع الحصول عليها؟", "Which document can you not get?", [
      ["الجواز", "Passport"],
      ["الإقامة", "Iqama"],
      ["كلاهما", "Both"],
    ]],
    ["من يحتفظ بها؟", "Who is holding it?", [
      ["صاحب العمل", "The employer"],
      ["شخص آخر", "Someone else"],
      ["لا أعرف", "I don't know"],
    ]],
    ["هل طلبت استعادتها؟", "Have you asked for it back?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
    ["هل تحتاج الوثيقة بشكل عاجل؟", "Do you need the document urgently?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
  ],

  injury: [
    ["ما الذي حدث؟", "What happened?", [
      ["إصابة أثناء العمل", "Injury at work"],
      ["مرض بسبب العمل", "Illness caused by work"],
      ["مشكلة في التأمين", "A problem with insurance"],
    ]],
    ["هل حصلت على علاج؟", "Did you receive treatment?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
    ["هل أخبرت صاحب العمل؟", "Have you told your employer?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
    ["هل تحتاج إلى مساعدة طبية عاجلة؟", "Do you need urgent medical help?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
  ],

  housing: [
    ["ما المشكلة التي تواجهها؟", "What problem are you facing?", [
      ["السكن غير مناسب", "The housing is unsuitable"],
      ["لا يوجد طعام أو ماء كافٍ", "Not enough food or water"],
      ["لا يوجد سكن", "There is no housing"],
      ["شيء آخر", "Something else"],
    ]],
    ["هل المشكلة مستمرة؟", "Is the problem ongoing?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
    ["هل أخبرت المسؤول؟", "Have you told the person in charge?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
    ["هل تحتاج إلى مساعدة عاجلة؟", "Do you need urgent help?", [
      ["نعم", "Yes"],
      ["لا", "No"],
    ]],
  ],
};

/** نصوص إضافية يحتاجها نموذج الطلب. */
export const FORM_TEXTS = {
  "request.area": ["منطقة السكن والحي", "Area and district"],
  "request.areaHint": ["مثال: الرياض — حي النسيم", "e.g. Riyadh — Al Naseem district"],
  "request.messageOptional": ["احكِ لنا مشكلتك (اختياري)", "Tell us your problem (optional)"],
  "request.phoneHint": ["رقم يستقبل واتساب ومكالمات", "A number that accepts WhatsApp and calls"],
  "request.answersTitle": ["أسئلة سريعة", "A few quick questions"],
  "request.required": ["هذا السؤال مطلوب", "This question is required"],
};

async function upsertText(db, key, ar, en, langs) {
  for (const code of langs) {
    const value = code === "ar" ? ar : code === "en" ? en : "";
    await db.execute(
      "INSERT IGNORE INTO contents (contentKey, lang, value) VALUES (?, ?, ?)",
      [key, code, value],
    );
  }
}

export async function seedQuestions({ url = process.env.DATABASE_URL } = {}) {
  if (!url) throw new Error("DATABASE_URL غير موجود.");
  const db = await mysql.createConnection(url);

  const [langRows] = await db.execute("SELECT code FROM languages");
  const langs = langRows.map((r) => r.code);

  for (const [key, [ar, en]] of Object.entries(FORM_TEXTS)) {
    await upsertText(db, key, ar, en, langs);
  }

  let addedQ = 0;
  let addedO = 0;

  for (const [topic, list] of Object.entries(QUESTIONS)) {
    for (let i = 0; i < list.length; i++) {
      const [ar, en, options] = list[i];
      const labelKey = `q.${topic}.${i + 1}`;

      const [exists] = await db.execute(
        "SELECT id FROM questions WHERE topicKey = ? AND labelKey = ?",
        [topic, labelKey],
      );
      let questionId;
      if (exists.length) {
        questionId = exists[0].id;
      } else {
        const [res] = await db.execute(
          "INSERT INTO questions (topicKey, labelKey, sortOrder, enabled, required) VALUES (?, ?, ?, 1, 1)",
          [topic, labelKey, i + 1],
        );
        questionId = res.insertId;
        addedQ++;
      }
      await upsertText(db, labelKey, ar, en, langs);

      for (let j = 0; j < options.length; j++) {
        const [oAr, oEn] = options[j];
        const optKey = `${labelKey}.o${j + 1}`;
        const [oExists] = await db.execute(
          "SELECT id FROM question_options WHERE questionId = ? AND labelKey = ?",
          [questionId, optKey],
        );
        if (!oExists.length) {
          await db.execute(
            "INSERT INTO question_options (questionId, labelKey, sortOrder, enabled) VALUES (?, ?, ?, 1)",
            [questionId, optKey, j + 1],
          );
          addedO++;
        }
        await upsertText(db, optKey, oAr, oEn, langs);
      }
    }
  }

  await db.end();
  return { questions: addedQ, options: addedO };
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  import("dotenv")
    .then(({ default: dotenv }) => {
      dotenv.config();
      return seedQuestions();
    })
    .then((r) => console.log(`✔ أسئلة مضافة: ${r.questions} — خيارات مضافة: ${r.options}`))
    .catch((e) => {
      console.error("✖ فشل:", e.message);
      process.exit(1);
    });
}
