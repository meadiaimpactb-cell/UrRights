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
import { pathToFileURL } from "node:url";

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

  // أوقات العمل — تتحكم في "متوفرون الآن" وفي استقبال الدردشة
  hours_enabled: "true",
  hours_start: "09:00",
  hours_end: "21:00",
  hours_days: "0,1,2,3,4,6", // 0=الأحد … 6=السبت (الافتراضي: السبت–الخميس)
  hours_tz: "+03:00",

  // قسم التوعية الدعوية — معطّل حتى يضع المسؤول رقم الداعية
  dawah_enabled: "false",
  dawah_whatsapp: "",
  uploads_enabled: "true",

  social_twitter: "",
  social_instagram: "",
  social_tiktok: "",
  social_facebook: "",
  translation_email: "",
};

/* ----------------------------------------------------------------- الشركاء */

const PARTNERS = [
  // ملاحظة: شعارات الجهات الحكومية (وزارة الموارد البشرية، مساند) أُزيلت
  // لأن عرضها كشريك يحتاج اتفاقية/إذن مكتوب. أضِفها من لوحة التحكم ← الشركاء
  // بعد الحصول على الإذن.
  {
    nameAr: "الجمعية المنفّذة",
    nameEn: "Implementing association",
    logoUrl: "",
    websiteUrl: "",
    sortOrder: 1,
  },
  {
    nameAr: "قسط",
    nameEn: "Qest",
    logoUrl: "",
    websiteUrl: "",
    sortOrder: 2,
  },
];

/* ----------------------------------------------------------------- المحتوى */

const AR = {
  "brand.name": "حقوقك",

  "hero.badge": "سري · بلغتك · بكل بساطة",
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
  "service2.text": "نسمع مشكلتك، ونتابع معك، ونوجهك خطوة بخطوة.",
  "service3.title": "توجيه للجهة الصحيحة",
  "service3.text": "نوصلك بالجهات الرسمية ونشرح لك الخطوات.",
  "service4.title": "مساندة نظامية",
  "service4.text": "نشرح لك مسار الشكوى ومتى وأين تقدمها.",

  "why.title": "لماذا تثق بنا",
  "why1.title": "خدمة تطوعية",
  "why1.text": "مبادرة أهلية غير ربحية، يقوم عليها فريق متطوّع.",
  "why2.title": "بلغتك أنت",
  "why2.text": "ستة لغات وترجمة فورية في الدردشة.",
  "why3.title": "خصوصيتك محفوظة",
  "why3.text": "لا نشارك بياناتك مع صاحب العمل أو غيره إلا بإذنك.",
  "why4.title": "فريق يفهمك",
  "why4.text": "ناس عملوا سنوات مع العمالة الوافدة.",

  "about.title": "من نحن",
  "about.text":
    "«حقوقك» مبادرة أهلية تطوعية غير ربحية. فريقنا من مقيمين وسعوديين يتكلمون لغتك، نشرح لك حقك بكلام بسيط ونوجهك إلى الجهة الرسمية الصحيحة. ولا نتواصل مع صاحب عملك إلا إذا طلبت أنت ذلك.",
  "about.point": "خدمة اجتماعية غير ربحية",
  "audience.title": "لمن هذه الخدمة؟",
  "audience.1": "عمال البناء والمصانع",
  "audience.2": "العاملون في المنازل",
  "audience.3": "السائقون وعمال التوصيل",
  "audience.4": "عمال المطاعم والمحلات",

  "partners.title": "شركاؤنا",
  "partners.subtitle": "الجهات التي نعمل معها",

  "footer.about": "عن الخدمة",
  "footer.contact": "تواصل معنا",
  "footer.follow": "تابعنا",
  "footer.free": "خدمة تطوعية · نحترم خصوصيتك",
  "footer.rights": "جميع الحقوق محفوظة",

  "lang.choose": "اختر لغتك",
  /* ── تصنيفات إضافية ── */
  "topic.passport": "جوازي أو إقامتي محتجزة",
  "topic.passport.desc": "صاحب العمل ماسك الجواز أو ما جدّد الإقامة",
  "topic.injury": "أُصبت أو مرضت في العمل",
  "topic.injury.desc": "إصابة عمل أو علاج أو تأمين صحي",
  "topic.housing": "السكن أو الأكل",
  "topic.housing.desc": "سكن غير مناسب أو منع طعام أو ماء",

  /* ── من نحن: الهوية ── */
  "about.weAre.title": "نحن",
  "about.weAre.1": "مبادرة أهلية تطوعية غير ربحية",
  "about.weAre.2": "فريق يتكلم لغتك ويفهم وضعك",
  "about.weAre.3": "نشرح لك حقك ونوجهك للجهة الرسمية",
  "about.weAreNot.title": "لسنا",
  "about.weAreNot.1": "لسنا جهة حكومية ولا شرطة",
  "about.weAreNot.2": "لسنا سفارة ولا مكتب استقدام",
  "about.weAreNot.3": "لسنا مكتب محاماة ولا نرفع القضايا بدلًا عنك",

  /* ── أوقات العمل ── */
  "hours.title": "أوقات العمل",
  "hours.range": "من {start} إلى {end}",
  "hours.day.0": "الأحد",
  "hours.day.1": "الإثنين",
  "hours.day.2": "الثلاثاء",
  "hours.day.3": "الأربعاء",
  "hours.day.4": "الخميس",
  "hours.day.5": "الجمعة",
  "hours.day.6": "السبت",
  "hours.day.all": "كل أيام الأسبوع",
  "hours.note": "الواتساب يستقبل رسالتك في أي وقت، ونرد عليك في أول وقت عمل.",

  /* ── الخصوصية ── */
  "privacy.title": "خصوصيتك",
  "privacy.consent": "بمواصلتك تسمح لنا باستخدام المعلومات التي ترسلها لغرض واحد فقط: مساعدتك في مشكلتك.",
  "privacy.agree": "موافق · أكمل",
  "privacy.link": "سياسة الخصوصية",
  "privacy.intro": "نجمع أقل قدر ممكن من المعلومات، ونستخدمها لغرض واحد: مساعدتك.",
  "privacy.p1.title": "ما الذي نجمعه؟",
  "privacy.p1.text": "اسمك ورقم جوالك ولغتك ووصف مشكلتك، وما ترسله في الدردشة. لا نطلب رقم الإقامة، ولا ترفع أي وثيقة إلا إذا اخترت ذلك بنفسك لدعم طلبك.",
  "privacy.p2.title": "كيف نستخدمه؟",
  "privacy.p2.text": "لفهم مشكلتك والرد عليك وتوجيهك للجهة الصحيحة. لا نبيع بياناتك ولا نستخدمها في الإعلانات. وتُترجم رسائل الدردشة آليًا عبر خدمة ترجمة خارجية حتى يفهمك الموظف بلغتك.",
  "privacy.p3.title": "مع من نشاركه؟",
  "privacy.p3.text": "لا نتواصل مع صاحب عملك ولا نشارك بياناتك مع أي جهة إلا بعد إذنك، أو إذا طلبتها جهة قضائية مختصة نظامًا.",
  "privacy.p4.title": "كم نحتفظ به؟",
  "privacy.p4.text": "نحتفظ بطلبك مدة معالجته فقط، ثم نحذفه. تقدر تطلب حذف بياناتك في أي وقت.",
  "privacy.p5.title": "حقوقك في بياناتك",
  "privacy.p5.text": "تقدر تطلب نسخة من بياناتك أو تصحيحها أو حذفها بمراسلتنا على الواتساب.",
  "privacy.contact": "لأي سؤال عن الخصوصية كلّمنا على الواتساب.",
  "privacy.back": "رجوع للموقع",

  /* ── التوعية الدعوية (اختيارية) ── */
  "dawah.title": "تعرف على دينك",
  "dawah.text": "معنا دعاة يتكلمون لغتك ويجيبون على أسئلتك في أمور دينك، بكل احترام وبدون أي إلزام.",
  "dawah.cta": "كلّم داعية بلغتك",
  "dawah.note": "خدمة اختيارية. مساعدتك في حقوقك متاحة للجميع بلا أي شرط.",

  /* ── التذييل ── */
  "footer.whatsappLabel": "رقم الواتساب",
  "footer.privacy": "سياسة الخصوصية",
  "footer.identity": "مبادرة أهلية غير ربحية · لسنا جهة حكومية",
  "lang.subtitle": "اختر لغتك للمتابعة",

  "chat.title": "دردشة",
  "chat.start": "ابدأ الدردشة",
  "chat.namePrompt": "اكتب اسمك",
  "chat.placeholder": "اكتب رسالتك هنا",
  "chat.online": "متوفرون الآن",
  "chat.offline": "خارج أوقات العمل",
  "chat.offlineText": "اترك رسالتك على الواتساب وسنرد عليك في أول وقت عمل.",
  "chat.welcome": "أهلًا بك. احكِ لنا مشكلتك بلغتك.",
  "chat.waiting": "ننتظر موظفًا يرد عليك…",
  "chat.agentJoined": "معك {name}",
  "chat.empty": "لا توجد رسائل بعد",
  "chat.ended": "انتهت المحادثة",
  "chat.closed": "مغلقة",
  "chat.close": "إغلاق المحادثة",
  "chat.original": "النص الأصلي",
  "chat.translate": "ترجمة تلقائية",
  "chat.attach": "إرفاق وثيقة",
  "chat.upload.TOO_LARGE": "الملف كبير — الحد ٨ ميجابايت.",
  "chat.upload.TYPE_NOT_ALLOWED": "يُقبل صورة أو ملف PDF فقط.",
  "chat.upload.UPLOADS_DISABLED": "إرفاق الوثائق متوقف حاليًا.",
  "chat.upload.SESSION_CLOSED": "المحادثة مغلقة.",
  "chat.upload.FAILED": "تعذّر الرفع، حاول مرة أخرى.",
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

  "hero.badge": "Private · In your language · Simple",
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
  "service2.text": "We listen, follow up with you, and guide you step by step.",
  "service3.title": "Guidance to the right office",
  "service3.text": "We connect you to official bodies and explain each step.",
  "service4.title": "Legal support",
  "service4.text": "We explain the complaint route, when and where to file it.",

  "why.title": "Why trust us",
  "why1.title": "A volunteer service",
  "why1.text": "A non-profit civil initiative run by a volunteer team.",
  "why2.title": "In your language",
  "why2.text": "Six languages and instant translation in chat.",
  "why3.title": "Your privacy is protected",
  "why3.text": "We do not share your details with your employer or anyone else without your permission.",
  "why4.title": "A team that understands you",
  "why4.text": "People who have worked for years with migrant workers.",

  "about.title": "Who we are",
  "about.text":
    "Your Rights is a volunteer, non-profit civil initiative. Our team of residents and Saudis speaks your language, explains your rights in simple words, and points you to the right official authority. We do not contact your employer unless you ask us to.",
  "about.point": "A non-profit social service",
  "audience.title": "Who is this for?",
  "audience.1": "Construction and factory workers",
  "audience.2": "Domestic workers",
  "audience.3": "Drivers and delivery riders",
  "audience.4": "Restaurant and shop workers",

  "partners.title": "Our partners",
  "partners.subtitle": "The organisations we work with",

  "footer.about": "About the service",
  "footer.contact": "Contact us",
  "footer.follow": "Follow us",
  "footer.free": "A volunteer service · we respect your privacy",
  "footer.rights": "All rights reserved",

  "lang.choose": "Choose your language",
  /* ── extra topics ── */
  "topic.passport": "My passport or iqama is held",
  "topic.passport.desc": "Employer keeps the passport or did not renew the iqama",
  "topic.injury": "I was injured or fell ill at work",
  "topic.injury.desc": "Work injury, treatment or health insurance",
  "topic.housing": "Housing or food",
  "topic.housing.desc": "Unsuitable housing, or food and water withheld",

  /* ── who we are ── */
  "about.weAre.title": "We are",
  "about.weAre.1": "A volunteer, non-profit civil initiative",
  "about.weAre.2": "A team that speaks your language and understands your situation",
  "about.weAre.3": "Here to explain your rights and point you to the official authority",
  "about.weAreNot.title": "We are not",
  "about.weAreNot.1": "Not a government body and not the police",
  "about.weAreNot.2": "Not an embassy and not a recruitment office",
  "about.weAreNot.3": "Not a law firm; we do not file cases on your behalf",

  /* ── working hours ── */
  "hours.title": "Working hours",
  "hours.range": "from {start} to {end}",
  "hours.day.0": "Sunday",
  "hours.day.1": "Monday",
  "hours.day.2": "Tuesday",
  "hours.day.3": "Wednesday",
  "hours.day.4": "Thursday",
  "hours.day.5": "Friday",
  "hours.day.6": "Saturday",
  "hours.day.all": "Every day",
  "hours.note": "WhatsApp accepts your message any time; we reply at the next working hour.",

  /* ── privacy ── */
  "privacy.title": "Your privacy",
  "privacy.consent": "By continuing you allow us to use the information you send for one purpose only: helping you with your problem.",
  "privacy.agree": "Agree · continue",
  "privacy.link": "Privacy policy",
  "privacy.intro": "We collect as little as possible, and use it for one purpose: to help you.",
  "privacy.p1.title": "What do we collect?",
  "privacy.p1.text": "Your name, phone number, language and a description of your problem, plus what you send in chat. We do not ask for your iqama number, and you only upload a document if you choose to, to support your case.",
  "privacy.p2.title": "How do we use it?",
  "privacy.p2.text": "To understand your problem, reply to you and guide you to the right authority. We never sell your data or use it for advertising. Chat messages are machine-translated through an external translation service so staff can understand you in your language.",
  "privacy.p3.title": "Who do we share it with?",
  "privacy.p3.text": "We do not contact your employer and do not share your data with anyone without your permission, unless a competent judicial authority legally requires it.",
  "privacy.p4.title": "How long do we keep it?",
  "privacy.p4.text": "Only while your case is being handled, then we delete it. You can ask us to delete your data at any time.",
  "privacy.p5.title": "Your rights over your data",
  "privacy.p5.text": "You can ask for a copy of your data, or ask us to correct or delete it, by messaging us on WhatsApp.",
  "privacy.contact": "For any privacy question, message us on WhatsApp.",
  "privacy.back": "Back to the site",

  /* ── optional faith guidance ── */
  "dawah.title": "Learn about your faith",
  "dawah.text": "We have guides who speak your language and answer your questions about your faith, respectfully and with no obligation.",
  "dawah.cta": "Talk to a guide in your language",
  "dawah.note": "Optional service. Help with your rights is available to everyone, with no conditions.",

  /* ── footer ── */
  "footer.whatsappLabel": "WhatsApp number",
  "footer.privacy": "Privacy policy",
  "footer.identity": "A non-profit civil initiative · not a government body",
  "lang.subtitle": "Choose your language to continue",

  "chat.title": "Chat",
  "chat.start": "Start chat",
  "chat.namePrompt": "Write your name",
  "chat.placeholder": "Write your message here",
  "chat.online": "We are online",
  "chat.offline": "Outside working hours",
  "chat.offlineText": "Leave your message on WhatsApp and we will reply at the next working hour.",
  "chat.welcome": "Welcome. Tell us your problem in your language.",
  "chat.waiting": "Waiting for a staff member…",
  "chat.agentJoined": "You are with {name}",
  "chat.empty": "No messages yet",
  "chat.ended": "Chat ended",
  "chat.closed": "Closed",
  "chat.close": "Close chat",
  "chat.original": "Original",
  "chat.translate": "Auto-translated",
  "chat.attach": "Attach a document",
  "chat.upload.TOO_LARGE": "File too large — 8 MB maximum.",
  "chat.upload.TYPE_NOT_ALLOWED": "Only images or PDF files are accepted.",
  "chat.upload.UPLOADS_DISABLED": "Document upload is currently off.",
  "chat.upload.SESSION_CLOSED": "This chat is closed.",
  "chat.upload.FAILED": "Upload failed, please try again.",
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
  "lang.subtitle",
  "chat.",
  "request.",
  "hours.",
  "privacy.",
  "dawah.",
];

const isPublicKey = (k) => PUBLIC_PREFIXES.some((p) => k.startsWith(p));

/* ------------------------------------------------------------- الترجمة الآلية */

/**
 * يحمي المتغيّرات مثل {name} من الترجمة: تُستبدل بأرقام ({0}) قبل الإرسال
 * لأن المترجم يترجم الكلمة داخل الأقواس فيتلف الاستبدال في الواجهة.
 */
function maskVars(text) {
  const names = [];
  const masked = text.replace(/\{([^}]+)\}/g, (_, n) => {
    names.push(n);
    return `{${names.length - 1}}`;
  });
  return { masked, names };
}

/** يعيد أسماء المتغيّرات، ويرجع null إن فقدت الترجمة أيًّا منها. */
function unmaskVars(text, names) {
  let out = text;
  names.forEach((n, i) => {
    out = out.replace(new RegExp("\\{\\s*" + i + "\\s*\\}", "g"), `{${n}}`);
  });
  return names.every((n) => out.includes(`{${n}}`)) ? out : null;
}

async function translate(text, from, to) {
  const GOOGLE = { tl: "tl" };
  const { masked, names } = maskVars(text);
  try {
    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx` +
      `&sl=${GOOGLE[from] ?? from}&tl=${GOOGLE[to] ?? to}&dt=t&q=${encodeURIComponent(masked)}`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const out = (data?.[0] ?? []).map((p) => p?.[0] ?? "").join("").trim();
    if (!out) return null;
    return names.length ? unmaskVars(out, names) : out;
  } catch {
    return null;
  }
}

/* --------------------------------------------------------- مراجعات المحتوى */

/**
 * رقم المراجعة الحالي لنصوص الموقع. عند رفع نسخة فيها تعديل على نص موجود
 * (لا مفتاح جديد) نزيد الرقم ونضيف المفاتيح المتأثرة في CONTENT_REVISION_KEYS،
 * فيطبّقها الخادم تلقائيًا عند التشغيل دون المساس ببقية النصوص المعدَّلة يدويًا.
 */
export const CONTENT_REVISION = 4;

/** المفاتيح التي تغيّرت قيمتها في المراجعتين 2 و 3. */
export const CONTENT_REVISION_KEYS = [
  // المراجعة 4: رفع الوثائق والترجمة الآلية في سياسة الخصوصية
  "privacy.p1.text",
  "privacy.p2.text",
  // المراجعة 3: إزالة كلمة «مجاني» من نصوص الموقع
  "hero.badge",
  "why1.title",
  "why1.text",
  // المراجعة 2: ملاحظات التقييم
  "why3.title",
  "why3.text",
  "service2.text",
  "about.text",
  "chat.offline",
  "chat.offlineText",
  "partners.subtitle",
  "footer.free",
];

/** نصوص العربية والإنجليزية كما هي في هذا الملف (للاستخدام من الخادم). */
export const CONTENT = { ar: AR, en: EN };

/** الإعدادات الافتراضية — يضيف الخادم أي مفتاح ناقص دون المساس بالقيم الموجودة. */
export const DEFAULT_SETTINGS = SETTINGS;

/**
 * يضمن وجود كل مفاتيح المحتوى في كل اللغات، ويطبّق مراجعات النصوص.
 * آمن للتكرار ولا يمسّ أي نص عدّله المسؤول يدويًا خارج قائمة المراجعة.
 */
export async function syncContent({ url = process.env.DATABASE_URL, revisionFrom = 0 } = {}) {
  if (!url) throw new Error("DATABASE_URL غير موجود.");
  const db = await mysql.createConnection(url);
  let added = 0;
  let revised = 0;

  const [langRows] = await db.execute("SELECT code FROM languages");
  const codes = langRows.map((r) => r.code);

  for (const key of Object.keys(AR)) {
    for (const code of codes) {
      const value = code === "ar" ? AR[key] : code === "en" ? (EN[key] ?? "") : "";
      // INSERT IGNORE: لا يمسّ أي صف موجود، و affectedRows = 0 عند التجاهل
      // فيكون العدّ صحيحًا (المفاتيح المضافة فعلًا فقط).
      const [res] = await db.execute(
        `INSERT IGNORE INTO contents (contentKey, lang, value) VALUES (?, ?, ?)`,
        [key, code, value],
      );
      if (res.affectedRows === 1) added++;
    }
  }

  if (revisionFrom < CONTENT_REVISION) {
    for (const key of CONTENT_REVISION_KEYS) {
      for (const [code, table] of [["ar", AR], ["en", EN]]) {
        const value = table[key];
        if (value == null || !codes.includes(code)) continue;
        await db.execute(
          `INSERT INTO contents (contentKey, lang, value) VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE value = VALUES(value)`,
          [key, code, value],
        );
        revised++;
      }
    }
  }

  await db.end();
  return { added, revised, revision: CONTENT_REVISION };
}

/* ------------------------------------------------------------------- التنفيذ */

/**
 * تعبئة قاعدة البيانات. تُستدعى من سطر الأوامر أو من الخادم عند أول تشغيل.
 * @param {{ url?: string, force?: boolean, translate?: boolean }} opts
 */
export async function runSeed({ url = process.env.DATABASE_URL, force = false, translate: TRANSLATE = false } = {}) {
  if (!url) {
    throw new Error("DATABASE_URL غير موجود. ضعه في ملف .env");
  }
  const FORCE = force;
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

// يعمل تلقائيًا فقط عند تشغيل الملف مباشرة: node db/seed.mjs
const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  runSeed({
    force: process.argv.includes("--force"),
    translate: process.argv.includes("--translate"),
  }).catch((e) => {
    console.error("✖ فشلت التعبئة:", e.message);
    process.exit(1);
  });
}
