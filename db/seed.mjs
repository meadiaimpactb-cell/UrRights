/**
 * حقوقك — تعبئة قاعدة البيانات الأولية
 *
 *   node db/seed.mjs                 يعبّئ اللغات والإعدادات والمحتوى بالعربية والإنجليزية
 *   node db/seed.mjs --translate     يعبّئ إضافةً لذلك بقية اللغات ترجمةً آليةً من العربية
 *   node db/seed.mjs --force         يعيد كتابة النصوص الموجودة (الافتراضي: لا يلمس المعدَّل يدويًا)
 *
 * يحتاج DATABASE_URL في البيئة. آمن للتكرار: يعمل بـ INSERT ... ON DUPLICATE KEY UPDATE.
 */
import "dotenv/config";
import mysql from "mysql2/promise";

const FORCE = process.argv.includes("--force");
const TRANSLATE = process.argv.includes("--translate");

/* ------------------------------------------------------------------ اللغات */

const LANGUAGES = [
  { code: "ar", nameEn: "Arabic", nameNative: "العربية", dir: "rtl", sortOrder: 1 },
  { code: "en", nameEn: "English", nameNative: "English", dir: "ltr", sortOrder: 2 },
  { code: "ur", nameEn: "Urdu", nameNative: "اردو", dir: "rtl", sortOrder: 3 },
  { code: "hi", nameEn: "Hindi", nameNative: "हिन्दी", dir: "ltr", sortOrder: 4 },
  { code: "tl", nameEn: "Filipino", nameNative: "Filipino", dir: "ltr", sortOrder: 5 },
  { code: "id", nameEn: "Indonesian", nameNative: "Bahasa Indonesia", dir: "ltr", sortOrder: 6 },
];

/* ---------------------------------------------------------------- الإعدادات */

const SETTINGS = {
  whatsapp_number: "966500000000",
  chat_enabled: "true",
  social_twitter: "",
  social_instagram: "",
  social_tiktok: "",
  social_facebook: "",
  translation_email: "",
};

/* ----------------------------------------------------------------- الشركاء */

const PARTNERS = [
  {
    nameAr: "وزارة الموارد البشرية والتنمية الاجتماعية",
    nameEn: "Ministry of Human Resources and Social Development",
    logoUrl: "/assets/partners/mhrsd.svg",
    websiteUrl: "https://www.hrsd.gov.sa",
    sortOrder: 1,
  },
  {
    nameAr: "مساند",
    nameEn: "Musaned",
    logoUrl: "/assets/partners/musaned.svg",
    websiteUrl: "https://musaned.com.sa",
    sortOrder: 2,
  },
];

/* ----------------------------------------------------------------- المحتوى */

const AR = {
  "brand.name": "حقوقك",

  "hero.badge": "مجاني · سري · بلغتك",
  "hero.title": "حقك محفوظ. ونحن نساعدك.",
  "hero.subtitle": "ما وصلك راتبك؟ جوازك عند غيرك؟ تعبت في العمل؟ كلّمنا الآن.",
  "hero.ctaWhatsapp": "كلّمنا واتساب",
  "hero.ctaChat": "دردشة مباشرة",
  "hero.ctaHelp": "اطلب مساعدة",

  "topics.title": "وش المشكلة عندك؟",
  "topics.subtitle": "اضغط على الصورة التي تشبه مشكلتك",
  "topic.salary": "راتبي ما وصل",
  "topic.salary.desc": "تأخير أو نقص أو منع الراتب",
  "topic.contract": "العمل غير العقد",
  "topic.contract.desc": "ساعات أو مهام أو راتب مختلف عن المكتوب",
  "topic.abuse": "يعاملوني معاملة سيئة",
  "topic.abuse.desc": "ضرب أو حبس أو منع أكل أو راحة",
  "topic.eosb": "أبغى أترك العمل",
  "topic.eosb.desc": "نقل خدمة أو خروج نهائي أو مستحقات",
  "topic.rights": "أبغى أعرف حقوقي",
  "topic.rights.desc": "الإجازة وساعات العمل والتأمين",
  "topic.other": "شيء آخر",
  "topic.other.desc": "احكِ لنا مشكلتك بكلامك",

  "steps.title": "كيف نساعدك؟",
  "steps.subtitle": "ثلاث خطوات فقط",
  "step1.title": "اضغط الزر الأخضر",
  "step1.text": "زر الواتساب أسفل الشاشة.",
  "step2.title": "احكِ مشكلتك بلغتك",
  "step2.text": "اكتب، أو أرسل رسالة صوتية.",
  "step3.title": "نرد عليك ونساعدك",
  "step3.text": "نشرح لك حقك، ونوصلك بالجهة الصحيحة.",

  "services.title": "ماذا نقدم لك",
  "service1.title": "توعية بحقوقك",
  "service1.text": "نشرح لك حقوقك بلغة بسيطة وبلغتك أنت.",
  "service2.title": "استماع ومتابعة",
  "service2.text": "نسمع مشكلتك ونتابع معك حتى تُحل.",
  "service3.title": "توجيه للجهة الصحيحة",
  "service3.text": "نوصلك بالجهات الرسمية ونشرح لك الخطوات.",
  "service4.title": "مساندة نظامية",
  "service4.text": "نشرح لك مسار الشكوى ومتى وأين تقدمها.",

  "why.title": "لماذا تثق بنا",
  "why1.title": "مجاني تمامًا",
  "why1.text": "لا نطلب منك أي مبلغ، أبدًا.",
  "why2.title": "بلغتك أنت",
  "why2.text": "ستة لغات وترجمة فورية في الدردشة.",
  "why3.title": "سري تمامًا",
  "why3.text": "لا نخبر صاحب العمل ولا أي أحد.",
  "why4.title": "فريق يفهمك",
  "why4.text": "ناس عملوا سنوات مع العمالة الوافدة.",

  "about.title": "من نحن",
  "about.text":
    "نحن فريق يساعد العمال في السعودية على معرفة حقوقهم والوصول إلى الجهات الرسمية. لا نأخذ منك أي مبلغ، ولا نخبر أحدًا عنك.",
  "about.point": "خدمة اجتماعية غير ربحية",
  "audience.title": "لمن هذه الخدمة؟",
  "audience.1": "عمال البناء والمصانع",
  "audience.2": "العاملون في المنازل",
  "audience.3": "السائقون وعمال التوصيل",
  "audience.4": "عمال المطاعم والمحلات",

  "partners.title": "شركاؤنا",
  "partners.subtitle": "نعمل مع جهات رسمية وأهلية",

  "footer.about": "عن الخدمة",
  "footer.contact": "تواصل معنا",
  "footer.follow": "تابعنا",
  "footer.free": "خدمة مجانية وسرية",
  "footer.rights": "جميع الحقوق محفوظة",

  "lang.choose": "اختر لغتك",

  "chat.title": "دردشة",
  "chat.start": "ابدأ الدردشة",
  "chat.namePrompt": "اكتب اسمك",
  "chat.placeholder": "اكتب رسالتك هنا",
  "chat.online": "متوفرون الآن",
  "chat.offline": "لسنا متوفرين الآن",
  "chat.offlineText": "اترك رسالتك وسنرد عليك، أو كلّمنا على الواتساب.",
  "chat.welcome": "أهلًا بك. احكِ لنا مشكلتك بلغتك.",
  "chat.waiting": "ننتظر موظفًا يرد عليك…",
  "chat.agentJoined": "معك {name}",
  "chat.empty": "لا توجد رسائل بعد",
  "chat.ended": "انتهت المحادثة",
  "chat.closed": "مغلقة",
  "chat.close": "إغلاق المحادثة",
  "chat.original": "النص الأصلي",
  "chat.translate": "ترجمة تلقائية",
  "chat.pick": "اختر محادثة",
  "chat.selectHint": "اختر محادثة من القائمة للرد عليها.",
  "chat.visitorLang": "لغة الزائر",

  "request.title": "اطلب المساعدة",
  "request.subtitle": "اكتب لنا وسنتواصل معك.",
  "request.name": "اسمك",
  "request.phone": "رقم جوالك",
  "request.topic": "نوع المشكلة",
  "request.message": "احكِ لنا مشكلتك",
  "request.submit": "أرسل الطلب",
  "request.success": "وصلنا طلبك. سنتواصل معك قريبًا.",

  "common.loading": "جارٍ التحميل…",
  "common.save": "حفظ",
  "common.saved": "تم الحفظ",
  "common.cancel": "إلغاء",
  "common.add": "إضافة",
  "common.delete": "حذف",
  "common.search": "بحث",
  "common.viewSite": "عرض الموقع",
  "common.logout": "خروج",

  "nav.login": "تسجيل الدخول",
  "nav.requests": "الطلبات",
  "noaccess.title": "لا تملك صلاحية",
  "noaccess.text": "هذه الصفحة للمديرين وموظفي الدعم فقط.",

  "dash.title": "لوحة التحكم",
  "dash.newRequests": "طلبات جديدة",
  "dash.totalRequests": "إجمالي الطلبات",
  "dash.waitingChats": "محادثات تنتظر",
  "dash.activeChats": "محادثات جارية",
  "dash.languages": "اللغات",
  "dash.recentRequests": "أحدث الطلبات",
  "dash.noRequests": "لا توجد طلبات بعد",
  "dash.chatToggle": "الدردشة في الموقع",
  "dash.chatOn": "مفعّلة",
  "dash.chatOff": "متوقفة",

  "content.title": "محتوى الموقع",
  "content.hint": "عدّل أي نص في الموقع لكل لغة. العربية هي المرجع.",
  "content.addKey": "إضافة مفتاح جديد",
  "content.keyPlaceholder": "مثال: hero.title",
  "content.ref": "المرجع بالعربية",

  "lang.title": "اللغات",
  "lang.add": "إضافة لغة",
  "lang.code": "رمز اللغة",
  "lang.nameEn": "الاسم بالإنجليزية",
  "lang.nameNative": "الاسم بلغتها",
  "lang.enabled": "مفعّلة",
  "lang.order": "الترتيب",
  "lang.addedHint": "اللغة الجديدة تُنشأ فارغة — عبّئها من صفحة المحتوى.",

  "partners.edit": "تعديل الشركاء",
  "partners.nameAr": "الاسم بالعربية",
  "partners.nameEn": "الاسم بالإنجليزية",
  "partners.logo": "رابط الشعار",
  "partners.website": "الموقع الإلكتروني",

  "settings.title": "الإعدادات",
  "settings.whatsapp": "رقم الواتساب",
  "settings.social": "روابط التواصل",
  "settings.preview": "معاينة",

  "users.title": "المستخدمون",
  "users.hint": "المدير الرئيسي يحدد صلاحية كل مستخدم.",
  "users.you": "أنت",
  "users.role.admin": "مدير",
  "users.role.agent": "موظف دعم",
  "users.role.user": "مستخدم",

  "req.title": "طلبات المساعدة",
  "req.empty": "لا توجد طلبات",
  "req.status.new": "جديد",
  "req.status.in_progress": "قيد المعالجة",
  "req.status.closed": "مغلق",
};

const EN = {
  "brand.name": "UrRights",

  "hero.badge": "Free · Private · In your language",
  "hero.title": "You have rights. We help you.",
  "hero.subtitle": "Salary not paid? Someone keeps your passport? Hurt at work? Talk to us now.",
  "hero.ctaWhatsapp": "Chat on WhatsApp",
  "hero.ctaChat": "Live chat",
  "hero.ctaHelp": "Ask for help",

  "topics.title": "What is your problem?",
  "topics.subtitle": "Tap the picture that looks like your problem",
  "topic.salary": "My salary is not paid",
  "topic.salary.desc": "Late, short, or withheld pay",
  "topic.contract": "The job is not like my contract",
  "topic.contract.desc": "Different hours, duties, or pay",
  "topic.abuse": "I am treated badly",
  "topic.abuse.desc": "Beating, being locked in, no food or rest",
  "topic.eosb": "I want to leave this job",
  "topic.eosb.desc": "Transfer, final exit, or unpaid dues",
  "topic.rights": "I want to know my rights",
  "topic.rights.desc": "Leave, working hours, insurance",
  "topic.other": "Something else",
  "topic.other.desc": "Tell us your problem in your own words",

  "steps.title": "How we help you",
  "steps.subtitle": "Only three steps",
  "step1.title": "Press the green button",
  "step1.text": "The WhatsApp button at the bottom.",
  "step2.title": "Tell us in your language",
  "step2.text": "Write, or send a voice message.",
  "step3.title": "We answer and help",
  "step3.text": "We explain your right and connect you to the right office.",

  "services.title": "What we offer you",
  "service1.title": "Know your rights",
  "service1.text": "We explain your rights in simple words, in your language.",
  "service2.title": "We listen and follow up",
  "service2.text": "We hear your problem and stay with you until it is solved.",
  "service3.title": "Guidance to the right office",
  "service3.text": "We connect you to official bodies and explain each step.",
  "service4.title": "Legal support",
  "service4.text": "We explain the complaint route, when and where to file it.",

  "why.title": "Why trust us",
  "why1.title": "Completely free",
  "why1.text": "We never ask you for money.",
  "why2.title": "In your language",
  "why2.text": "Six languages and instant translation in chat.",
  "why3.title": "Fully private",
  "why3.text": "We do not tell your employer or anyone else.",
  "why4.title": "A team that understands you",
  "why4.text": "People who have worked for years with migrant workers.",

  "about.title": "Who we are",
  "about.text":
    "We are a team that helps workers in Saudi Arabia know their rights and reach the official authorities. We never take money from you, and we never tell anyone about you.",
  "about.point": "A non-profit social service",
  "audience.title": "Who is this for?",
  "audience.1": "Construction and factory workers",
  "audience.2": "Domestic workers",
  "audience.3": "Drivers and delivery riders",
  "audience.4": "Restaurant and shop workers",

  "partners.title": "Our partners",
  "partners.subtitle": "We work with official and civil bodies",

  "footer.about": "About the service",
  "footer.contact": "Contact us",
  "footer.follow": "Follow us",
  "footer.free": "Free and private service",
  "footer.rights": "All rights reserved",

  "lang.choose": "Choose your language",

  "chat.title": "Chat",
  "chat.start": "Start chat",
  "chat.namePrompt": "Write your name",
  "chat.placeholder": "Write your message here",
  "chat.online": "We are online",
  "chat.offline": "We are not available now",
  "chat.offlineText": "Leave your message and we will reply, or reach us on WhatsApp.",
  "chat.welcome": "Welcome. Tell us your problem in your language.",
  "chat.waiting": "Waiting for a staff member…",
  "chat.agentJoined": "You are with {name}",
  "chat.empty": "No messages yet",
  "chat.ended": "Chat ended",
  "chat.closed": "Closed",
  "chat.close": "Close chat",
  "chat.original": "Original",
  "chat.translate": "Auto-translated",
  "chat.pick": "Pick a chat",
  "chat.selectHint": "Pick a chat from the list to reply.",
  "chat.visitorLang": "Visitor language",

  "request.title": "Ask for help",
  "request.subtitle": "Write to us and we will contact you.",
  "request.name": "Your name",
  "request.phone": "Your phone number",
  "request.topic": "Type of problem",
  "request.message": "Tell us your problem",
  "request.submit": "Send request",
  "request.success": "We received your request. We will contact you soon.",

  "common.loading": "Loading…",
  "common.save": "Save",
  "common.saved": "Saved",
  "common.cancel": "Cancel",
  "common.add": "Add",
  "common.delete": "Delete",
  "common.search": "Search",
  "common.viewSite": "View site",
  "common.logout": "Sign out",

  "nav.login": "Sign in",
  "nav.requests": "Requests",
  "noaccess.title": "No access",
  "noaccess.text": "This page is for admins and support agents only.",

  "dash.title": "Dashboard",
  "dash.newRequests": "New requests",
  "dash.totalRequests": "Total requests",
  "dash.waitingChats": "Waiting chats",
  "dash.activeChats": "Active chats",
  "dash.languages": "Languages",
  "dash.recentRequests": "Recent requests",
  "dash.noRequests": "No requests yet",
  "dash.chatToggle": "Chat on the site",
  "dash.chatOn": "On",
  "dash.chatOff": "Off",

  "content.title": "Site content",
  "content.hint": "Edit any text on the site, per language. Arabic is the reference.",
  "content.addKey": "Add a new key",
  "content.keyPlaceholder": "e.g. hero.title",
  "content.ref": "Arabic reference",

  "lang.title": "Languages",
  "lang.add": "Add language",
  "lang.code": "Language code",
  "lang.nameEn": "Name in English",
  "lang.nameNative": "Name in its own script",
  "lang.enabled": "Enabled",
  "lang.order": "Order",
  "lang.addedHint": "A new language starts empty — fill it from the content page.",

  "partners.edit": "Edit partners",
  "partners.nameAr": "Name in Arabic",
  "partners.nameEn": "Name in English",
  "partners.logo": "Logo URL",
  "partners.website": "Website",

  "settings.title": "Settings",
  "settings.whatsapp": "WhatsApp number",
  "settings.social": "Social links",
  "settings.preview": "Preview",

  "users.title": "Users",
  "users.hint": "The owner sets each user's role.",
  "users.you": "You",
  "users.role.admin": "Admin",
  "users.role.agent": "Support agent",
  "users.role.user": "User",

  "req.title": "Help requests",
  "req.empty": "No requests",
  "req.status.new": "New",
  "req.status.in_progress": "In progress",
  "req.status.closed": "Closed",
};

/** الواجهة العامة فقط — هذه التي تُترجم آليًا لبقية اللغات. لوحة التحكم تبقى عربي/إنجليزي. */
const PUBLIC_PREFIXES = [
  "brand.",
  "hero.",
  "topics.",
  "topic.",
  "steps.",
  "step1.",
  "step2.",
  "step3.",
  "services.",
  "service",
  "why",
  "about.",
  "audience.",
  "partners.title",
  "partners.subtitle",
  "footer.",
  "lang.choose",
  "chat.",
  "request.",
];

const isPublicKey = (k) => PUBLIC_PREFIXES.some((p) => k.startsWith(p));

/* ------------------------------------------------------------- الترجمة الآلية */

async function translate(text, from, to) {
  const GOOGLE = { tl: "tl" };
  try {
    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx` +
      `&sl=${GOOGLE[from] ?? from}&tl=${GOOGLE[to] ?? to}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const out = (data?.[0] ?? []).map((p) => p?.[0] ?? "").join("");
    return out.trim() || null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------- التنفيذ */

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("✖ DATABASE_URL غير موجود. ضعه في ملف .env");
    process.exit(1);
  }
  const db = await mysql.createConnection(url);
  const onDup = FORCE ? "value = VALUES(value)" : "value = value";

  // اللغات
  for (const l of LANGUAGES) {
    await db.execute(
      `INSERT INTO languages (code, nameEn, nameNative, dir, enabled, sortOrder)
       VALUES (?, ?, ?, ?, true, ?)
       ON DUPLICATE KEY UPDATE nameEn = VALUES(nameEn), nameNative = VALUES(nameNative),
                               dir = VALUES(dir), sortOrder = VALUES(sortOrder)`,
      [l.code, l.nameEn, l.nameNative, l.dir, l.sortOrder],
    );
  }
  console.log(`✔ اللغات: ${LANGUAGES.length}`);

  // الإعدادات
  for (const [k, v] of Object.entries(SETTINGS)) {
    await db.execute(
      `INSERT INTO settings (\`key\`, value) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE value = ${FORCE ? "VALUES(value)" : "value"}`,
      [k, v],
    );
  }
  console.log(`✔ الإعدادات: ${Object.keys(SETTINGS).length}`);

  // الشركاء — تُضاف مرة واحدة فقط
  const [existingPartners] = await db.execute("SELECT COUNT(*) AS n FROM partners");
  if (existingPartners[0].n === 0) {
    for (const p of PARTNERS) {
      await db.execute(
        `INSERT INTO partners (nameAr, nameEn, logoUrl, websiteUrl, sortOrder, enabled)
         VALUES (?, ?, ?, ?, ?, true)`,
        [p.nameAr, p.nameEn, p.logoUrl, p.websiteUrl, p.sortOrder],
      );
    }
    console.log(`✔ الشركاء: ${PARTNERS.length}`);
  } else {
    console.log("• الشركاء موجودون — تُركوا كما هم");
  }

  // المحتوى: العربية والإنجليزية
  const writeContent = async (lang, table) => {
    let n = 0;
    for (const [key, value] of Object.entries(table)) {
      if (!value) continue;
      await db.execute(
        `INSERT INTO contents (contentKey, lang, value) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE ${onDup}`,
        [key, lang, value],
      );
      n++;
    }
    console.log(`✔ المحتوى [${lang}]: ${n}`);
  };
  await writeContent("ar", AR);
  await writeContent("en", EN);

  // بقية اللغات
  const others = LANGUAGES.filter((l) => l.code !== "ar" && l.code !== "en");
  if (TRANSLATE) {
    const publicKeys = Object.keys(AR).filter(isPublicKey);
    for (const l of others) {
      let done = 0;
      for (const key of publicKeys) {
        const [rows] = await db.execute(
          "SELECT value FROM contents WHERE contentKey = ? AND lang = ?",
          [key, l.code],
        );
        if (rows.length && rows[0].value && !FORCE) continue;
        const out = await translate(AR[key], "ar", l.code);
        if (!out) continue;
        await db.execute(
          `INSERT INTO contents (contentKey, lang, value) VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE value = VALUES(value)`,
          [key, l.code, out],
        );
        done++;
        await new Promise((r) => setTimeout(r, 120)); // تهدئة الطلبات
      }
      console.log(`✔ ترجمة [${l.code}]: ${done}`);
    }
    console.log("\n⚠️  الترجمة آلية — راجعها من لوحة التحكم ← محتوى الموقع قبل الإطلاق.");
  } else {
    // صفوف فارغة حتى تظهر المفاتيح في محرر المحتوى
    for (const l of others) {
      for (const key of Object.keys(AR)) {
        await db.execute(
          `INSERT INTO contents (contentKey, lang, value) VALUES (?, ?, '')
           ON DUPLICATE KEY UPDATE value = value`,
          [key, l.code],
        );
      }
    }
    console.log(`• أُنشئت صفوف فارغة لـ ${others.map((l) => l.code).join(", ")}`);
    console.log("  شغّل: node db/seed.mjs --translate لتعبئتها ترجمةً آلية.");
  }

  await db.end();
  console.log("\n✔ انتهت التعبئة.");
}

main().catch((e) => {
  console.error("✖ فشلت التعبئة:", e.message);
  process.exit(1);
});
