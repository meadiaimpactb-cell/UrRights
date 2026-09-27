-- ============================================================
-- تعبئة ترجمات اللغات الأربع (أردو، هندي، فلبيني، إندونيسي)
-- حقوقك / UrRights — 2026-09-27
--
-- آمن: يحدّث قيم هذه اللغات الأربع فقط.
-- لا يمسّ العربية ولا الإنجليزية ولا الإعدادات ولا المستخدمين ولا الطلبات.
-- آمن للتكرار — يمكن تشغيله أكثر من مرة بلا ضرر.
-- عدد الصفوف: 560
-- ============================================================

SET NAMES utf8mb4;
START TRANSACTION;

-- ---------- ur — الأردو ----------
INSERT INTO contents (contentKey, lang, value) VALUES ('about.point', 'ur', 'غیر منافع بخش سماجی خدمت')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.text', 'ur', '"آپ کے حقوق" ایک غیر منافع بخش، رضاکارانہ شہری اقدام ہے۔ رہائشیوں اور سعودیوں کی ہماری ٹیم آپ کی زبان بولتی ہے۔ ہم آپ کو آسان الفاظ میں آپ کے حقوق کی وضاحت کرتے ہیں اور آپ کو صحیح سرکاری اتھارٹی کے پاس بھیجتے ہیں۔ سروس مکمل طور پر مفت ہے، اور ہم آپ کے آجر سے رابطہ نہیں کرتے جب تک آپ اس کی درخواست نہ کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.title', 'ur', 'ہم کون ہیں؟')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.1', 'ur', 'ایک غیر منافع بخش، رضاکارانہ اقدام')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.2', 'ur', 'ایک ٹیم جو آپ کی زبان بولتی ہے اور آپ کے حالات کو سمجھتی ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.3', 'ur', 'ہم آپ کو آپ کے حقوق کی وضاحت کرتے ہیں اور آپ کو سرکاری اتھارٹی کے پاس بھیجتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.title', 'ur', 'ہم')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.1', 'ur', 'ہم نہ سرکاری ادارے ہیں نہ پولیس')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.2', 'ur', 'ہم نہ تو سفارت خانہ ہیں اور نہ ہی بھرتی کا دفتر')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.3', 'ur', 'ہم کوئی قانونی فرم نہیں ہیں اور ہم آپ کے لیے مقدمات نہیں چلاتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.title', 'ur', 'ہم نہیں ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.1', 'ur', 'تعمیراتی اور فیکٹری ورکرز')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.2', 'ur', 'ہوم ورکرز')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.3', 'ur', 'ڈرائیور اور ڈیلیوری ورکرز')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.4', 'ur', 'ریستوراں اور اسٹور کے کارکن')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.title', 'ur', 'یہ سروس کس کے لیے ہے؟')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('brand.name', 'ur', 'آپ کے حقوق')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.agentJoined', 'ur', '{name} آپ کے ساتھ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.close', 'ur', 'بات چیت بند کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.closed', 'ur', 'بند')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.empty', 'ur', 'ابھی تک کوئی پیغامات نہیں ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.ended', 'ur', 'بات چیت ختم ہوگئی')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.namePrompt', 'ur', 'اپنا نام لکھیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.offline', 'ur', 'کام کے اوقات سے باہر')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.offlineText', 'ur', 'اپنا پیغام واٹس ایپ پر چھوڑیں اور ہم آپ کو پہلے کام کے وقت جواب دیں گے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.online', 'ur', 'ابھی دستیاب ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.original', 'ur', 'اصل متن')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.pick', 'ur', 'ایک گفتگو کا انتخاب کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.placeholder', 'ur', 'اپنا پیغام یہاں لکھیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.selectHint', 'ur', 'جواب دینے کے لیے فہرست سے ایک گفتگو کا انتخاب کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.start', 'ur', 'چیٹنگ شروع کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.title', 'ur', 'گپ شپ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.translate', 'ur', 'خودکار ترجمہ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.visitorLang', 'ur', 'زائرین کی زبان')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.waiting', 'ur', 'ہم انتظار کر رہے ہیں کہ ملازم آپ کو جواب دے...')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.welcome', 'ur', 'ارے، آپ. اپنا مسئلہ اپنی زبان میں بتائیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.cta', 'ur', 'کسی مبلغ سے اپنی زبان میں بات کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.note', 'ur', 'اختیاری خدمت۔ آپ کے حقوق کے لیے مدد ہر کسی کے لیے بغیر کسی شرط کے دستیاب ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.text', 'ur', 'ہمارے پاس ایسے مبلغین ہیں جو آپ کی زبان بولتے ہیں اور آپ کے مذہب کے معاملات کے بارے میں آپ کے سوالات کا جواب دیتے ہیں، پورے احترام کے ساتھ اور بغیر کسی ذمہ داری کے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.title', 'ur', 'اپنے مذہب کے بارے میں جانیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.about', 'ur', 'سروس کے بارے میں')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.contact', 'ur', 'ہم سے رابطہ کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.follow', 'ur', 'ہمیں فالو کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.free', 'ur', 'مفت سروس · ہم آپ کی رازداری کا احترام کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.identity', 'ur', 'ایک غیر منافع بخش شہری اقدام · ہم کوئی سرکاری ادارہ نہیں ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.privacy', 'ur', 'رازداری کی پالیسی')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.rights', 'ur', 'جملہ حقوق محفوظ ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.whatsappLabel', 'ur', 'واٹس ایپ نمبر')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.badge', 'ur', 'مفت · خفیہ · آپ کی زبان میں')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaChat', 'ur', 'لائیو چیٹ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaHelp', 'ur', 'مدد طلب کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaWhatsapp', 'ur', 'ہم سے واٹس ایپ پر رابطہ کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.subtitle', 'ur', 'آپ کو کیا تنخواہ ملی؟ کیا آپ کا پاسپورٹ کسی اور کے پاس ہے؟ کام پر تھک گئے ہیں؟ اب ہم سے بات کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.title', 'ur', 'آپ کا حق محفوظ ہے۔ ہم آپ کی مدد کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.0', 'ur', 'اتوار')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.1', 'ur', 'پیر')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.2', 'ur', 'منگل')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.3', 'ur', 'بدھ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.4', 'ur', 'جمعرات')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.5', 'ur', 'جمعہ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.6', 'ur', 'ہفتہ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.all', 'ur', 'ہفتے کے ہر دن')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.note', 'ur', 'WhatsApp کسی بھی وقت آپ کا پیغام وصول کرتا ہے، اور ہم آپ کو کام کے پہلے گھنٹے میں جواب دیتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.range', 'ur', '{start} سے {end} تک')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.title', 'ur', 'کام کے اوقات')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('lang.choose', 'ur', 'اپنی زبان کا انتخاب کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('lang.subtitle', 'ur', 'جاری رکھنے کے لیے اپنی زبان کا انتخاب کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('partners.subtitle', 'ur', 'وہ ادارے جن کے ساتھ ہم کام کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('partners.title', 'ur', 'ہمارے شراکت دار')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.agree', 'ur', 'متفق · مکمل')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.back', 'ur', 'واپس سائٹ پر')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.consent', 'ur', 'جاری رکھ کر، آپ ہمیں اپنی جمع کرائی گئی معلومات کو صرف ایک مقصد کے لیے استعمال کرنے کی اجازت دیتے ہیں: آپ کے مسئلے میں آپ کی مدد کرنے کے لیے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.contact', 'ur', 'رازداری کے بارے میں کسی بھی سوال کے لیے، ہم سے WhatsApp پر رابطہ کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.intro', 'ur', 'ہم ممکنہ حد تک کم معلومات جمع کرتے ہیں، اور ہم اسے ایک مقصد کے لیے استعمال کرتے ہیں: آپ کی مدد کے لیے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.link', 'ur', 'رازداری کی پالیسی')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p1.text', 'ur', 'آپ کا نام، موبائل نمبر، زبان، آپ کے مسئلے کی تفصیل، اور آپ چیٹ میں کیا بھیجتے ہیں۔ ہم رہائشی نمبر یا دستاویزات کی کاپیاں نہیں مانگتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p1.title', 'ur', 'ہم کیا جمع کرتے ہیں؟')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p2.text', 'ur', 'اپنے مسئلے کو سمجھنے کے لیے، آپ کو جواب دیں، اور آپ کو صحیح سمت کی طرف لے جائیں۔ ہم آپ کا ڈیٹا فروخت نہیں کرتے اور نہ ہی اسے اشتہارات کے لیے استعمال کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p2.title', 'ur', 'ہم اسے کیسے استعمال کرتے ہیں؟')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p3.text', 'ur', 'ہم آپ کے آجر کے ساتھ بات چیت نہیں کرتے ہیں یا آپ کی اجازت کے بغیر، یا قانونی طور پر قابل عدالتی اتھارٹی کے ذریعہ درخواست کرنے کے علاوہ کسی بھی فریق کے ساتھ آپ کا ڈیٹا شیئر نہیں کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p3.title', 'ur', 'ہم اسے کس کے ساتھ بانٹتے ہیں؟')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p4.text', 'ur', 'ہم آپ کی درخواست کو صرف اس وقت تک رکھتے ہیں جب تک اس پر کارروائی ہو، پھر اسے حذف کر دیں۔ آپ کسی بھی وقت اپنے ڈیٹا کو حذف کرنے کی درخواست کر سکتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p4.title', 'ur', 'ہم کتنا رکھتے ہیں؟')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p5.text', 'ur', 'آپ اپنے ڈیٹا کی ایک کاپی کی درخواست کر سکتے ہیں، اسے درست کر سکتے ہیں، یا ہمیں WhatsApp پر پیغام بھیج کر اسے حذف کر سکتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p5.title', 'ur', 'آپ کے ڈیٹا پر آپ کے حقوق')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.title', 'ur', 'آپ کی رازداری')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.message', 'ur', 'اپنا مسئلہ بتائیں')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.name', 'ur', 'آپ کا نام')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.phone', 'ur', 'آپ کا موبائل نمبر')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.submit', 'ur', 'درخواست جمع کروائیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.subtitle', 'ur', 'ہمیں لکھیں اور ہم آپ سے رابطہ کریں گے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.success', 'ur', 'ہمیں آپ کی درخواست موصول ہوئی ہے۔ ہم جلد ہی آپ سے رابطہ کریں گے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.title', 'ur', 'مدد طلب کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.topic', 'ur', 'مسئلہ کی قسم')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service1.text', 'ur', 'ہم آپ کو آپ کے حقوق آسان زبان میں اور آپ کی اپنی زبان میں بیان کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service1.title', 'ur', 'اپنے حقوق کا شعور')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service2.text', 'ur', 'ہم آپ کا مسئلہ سنتے ہیں، آپ کے ساتھ فالو اپ کرتے ہیں، اور قدم بہ قدم آپ کی رہنمائی کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service2.title', 'ur', 'سنیں اور عمل کریں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service3.text', 'ur', 'ہم آپ کو سرکاری حکام سے جوڑیں گے اور آپ کو اقدامات کی وضاحت کریں گے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service3.title', 'ur', 'صحیح سمت میں ہدایت کرنا')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service4.text', 'ur', 'ہم آپ کو شکایت کے عمل اور اسے کب اور کہاں جمع کروانے کی وضاحت کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service4.title', 'ur', 'منظم حمایت')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('services.title', 'ur', 'جو ہم آپ کو پیش کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step1.text', 'ur', 'اسکرین کے نیچے واٹس ایپ بٹن۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step1.title', 'ur', 'سبز بٹن دبائیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step2.text', 'ur', 'ٹائپ کریں، یا صوتی پیغام بھیجیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step2.title', 'ur', 'اپنی زبان میں اپنا مسئلہ بتائیں')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step3.text', 'ur', 'ہم آپ کو آپ کے حقوق کی وضاحت کرتے ہیں، اور ہم آپ کو صحیح منزل سے جوڑتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step3.title', 'ur', 'ہم آپ کو جواب دیتے ہیں اور آپ کی مدد کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('steps.subtitle', 'ur', 'صرف تین قدم')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('steps.title', 'ur', 'ہم آپ کی مدد کیسے کر سکتے ہیں؟')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.abuse', 'ur', 'وہ میرے ساتھ برا سلوک کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.abuse.desc', 'ur', 'مارنا، قید کرنا، یا کھانے یا آرام سے روکنا')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.contract', 'ur', 'غیر معاہدہ کام')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.contract.desc', 'ur', 'گھنٹے، کام، یا تنخواہ جو لکھا گیا ہے اس سے مختلف ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.eosb', 'ur', 'میں کام چھوڑنا چاہتا ہوں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.eosb.desc', 'ur', 'سروس کی منتقلی، حتمی اخراج، یا واجبات')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.housing', 'ur', 'رہائش یا کھانا')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.housing.desc', 'ur', 'ناکافی رہائش یا کھانا یا پانی روکنا')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.injury', 'ur', 'آپ کام پر زخمی یا بیمار ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.injury.desc', 'ur', 'کام کی چوٹ، علاج یا ہیلتھ انشورنس')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.other', 'ur', 'ایک اور بات')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.other.desc', 'ur', 'اپنا مسئلہ اپنے الفاظ میں بتائیں')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.passport', 'ur', 'میرا پاسپورٹ یا رہائش رکھی جا رہی ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.passport.desc', 'ur', 'آجر کے پاس پاسپورٹ ہے یا اس نے رہائش کی تجدید نہیں کی ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.rights', 'ur', 'میں اپنے حقوق جاننا چاہتا ہوں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.rights.desc', 'ur', 'چھٹی، کام کے اوقات اور انشورنس')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.salary', 'ur', 'میری تنخواہ نہیں آئی')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.salary.desc', 'ur', 'تنخواہ میں تاخیر، کمی یا انکار')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topics.subtitle', 'ur', 'اس تصویر پر کلک کریں جو آپ کے مسئلے سے ملتی جلتی ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topics.title', 'ur', 'آپ کا مسئلہ کیا ہے؟')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why.title', 'ur', 'ہم پر بھروسہ کیوں؟')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why1.text', 'ur', 'ہم آپ سے کبھی پیسے نہیں مانگتے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why1.title', 'ur', 'مکمل طور پر مفت')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why2.text', 'ur', 'چیٹ میں چھ زبانیں اور فوری ترجمہ۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why2.title', 'ur', 'اپنی زبان میں')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why3.text', 'ur', 'ہم آپ کی اجازت کے علاوہ آپ کے آجر یا دوسروں کے ساتھ آپ کا ڈیٹا شیئر نہیں کرتے ہیں۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why3.title', 'ur', 'آپ کی پرائیویسی محفوظ ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why4.text', 'ur', 'وہ لوگ جنہوں نے برسوں سے غیر ملکی کارکنوں کے ساتھ کام کیا ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why4.title', 'ur', 'ایک ٹیم جو آپ کو سمجھتی ہے۔')
  ON DUPLICATE KEY UPDATE value = VALUES(value);

-- ---------- hi — الهندية ----------
INSERT INTO contents (contentKey, lang, value) VALUES ('about.point', 'hi', 'गैर-लाभकारी समाज सेवा')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.text', 'hi', '"आपके अधिकार" एक गैर-लाभकारी, स्वैच्छिक नागरिक पहल है। हमारे निवासियों और सउदी लोगों की टीम आपकी भाषा बोलती है। हम आपको आपके अधिकारों को सरल शब्दों में समझाते हैं और आपको सही आधिकारिक प्राधिकारी तक निर्देशित करते हैं। सेवा पूरी तरह से मुफ़्त है, और जब तक आप इसके लिए अनुरोध नहीं करते, हम आपके नियोक्ता से संपर्क नहीं करते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.title', 'hi', 'हम कौन हैं?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.1', 'hi', 'एक गैर-लाभकारी, स्वयंसेवी पहल')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.2', 'hi', 'एक टीम जो आपकी भाषा बोलती है और आपकी स्थिति को समझती है')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.3', 'hi', 'हम आपको आपके अधिकार समझाते हैं और आपको आधिकारिक प्राधिकारी के पास निर्देशित करते हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.title', 'hi', 'हम')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.1', 'hi', 'हम न तो कोई सरकारी एजेंसी हैं और न ही पुलिस')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.2', 'hi', 'हम न तो दूतावास हैं और न ही भर्ती कार्यालय हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.3', 'hi', 'हम कोई कानूनी फर्म नहीं हैं और हम आपके लिए मुकदमे नहीं लड़ते हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.title', 'hi', 'हम नहीं कर रहे हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.1', 'hi', 'निर्माण और कारखाने के श्रमिक')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.2', 'hi', 'घर में काम करने वाले')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.3', 'hi', 'ड्राइवर और डिलीवरी कर्मचारी')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.4', 'hi', 'रेस्तरां और स्टोर कर्मचारी')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.title', 'hi', 'यह सेवा किसके लिए है?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('brand.name', 'hi', 'आपके हक')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.agentJoined', 'hi', 'आपके साथ {name}')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.close', 'hi', 'बातचीत बंद करें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.closed', 'hi', 'बंद किया हुआ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.empty', 'hi', 'अभी तक कोई संदेश नहीं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.ended', 'hi', 'बातचीत ख़त्म हो गई')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.namePrompt', 'hi', 'अपना नाम लिखें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.offline', 'hi', 'बाहर काम के घंटे')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.offlineText', 'hi', 'अपना संदेश व्हाट्सएप पर छोड़ें और हम पहले कार्य समय पर आपको जवाब देंगे।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.online', 'hi', 'अब उपलब्ध है')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.original', 'hi', 'मूललेख')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.pick', 'hi', 'एक वार्तालाप चुनें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.placeholder', 'hi', 'यहां अपना संदेश लिखें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.selectHint', 'hi', 'उत्तर देने के लिए सूची से एक वार्तालाप चुनें।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.start', 'hi', 'चैट करना शुरू करें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.title', 'hi', 'बात करना')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.translate', 'hi', 'स्वचालित अनुवाद')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.visitorLang', 'hi', 'आगंतुक भाषा')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.waiting', 'hi', 'हम आपके जवाब के लिए किसी कर्मचारी की प्रतीक्षा कर रहे हैं...')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.welcome', 'hi', 'अरु तुम। हमें अपनी समस्या अपनी भाषा में बताएं.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.cta', 'hi', 'किसी उपदेशक से अपनी भाषा में बात करें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.note', 'hi', 'वैकल्पिक सेवा. आपके अधिकारों के लिए सहायता बिना किसी शर्त के सभी के लिए उपलब्ध है।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.text', 'hi', 'हमारे पास ऐसे उपदेशक हैं जो आपकी भाषा बोलते हैं और आपके धर्म के मामलों के बारे में आपके प्रश्नों का उत्तर पूरे सम्मान के साथ और बिना किसी बाध्यता के देते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.title', 'hi', 'अपने धर्म के बारे में जानें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.about', 'hi', 'सेवा के बारे में')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.contact', 'hi', 'हमसे संपर्क करें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.follow', 'hi', 'हमारे पर का पालन करें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.free', 'hi', 'मुफ़्त सेवा · हम आपकी गोपनीयता का सम्मान करते हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.identity', 'hi', 'एक गैर-लाभकारी नागरिक पहल · हम कोई सरकारी संस्था नहीं हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.privacy', 'hi', 'गोपनीयता नीति')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.rights', 'hi', 'सर्वाधिकार सुरक्षित')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.whatsappLabel', 'hi', 'व्हाट्सएप नंबर')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.badge', 'hi', 'निःशुल्क · गोपनीय · आपकी भाषा में')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaChat', 'hi', 'सीधी बातचीत')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaHelp', 'hi', 'मदद के लिए पूछना')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaWhatsapp', 'hi', 'व्हाट्सएप पर हमसे संपर्क करें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.subtitle', 'hi', 'आपको कितना वेतन मिला? क्या आपका पासपोर्ट किसी और के पास है? काम पर थक गए? अभी हमसे बात करो.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.title', 'hi', 'आपका अधिकार सुरक्षित है. हम आपकी मदद करते हैं.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.0', 'hi', 'रविवार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.1', 'hi', 'सोमवार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.2', 'hi', 'मंगलवार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.3', 'hi', 'बुधवार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.4', 'hi', 'गुरुवार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.5', 'hi', 'शुक्रवार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.6', 'hi', 'शनिवार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.all', 'hi', 'सप्ताह के प्रत्येक दिन')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.note', 'hi', 'व्हाट्सएप को आपका संदेश किसी भी समय प्राप्त होता है, और हम पहले कामकाजी घंटे में आपको जवाब देते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.range', 'hi', '{start} से {end} तक')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.title', 'hi', 'कार्य के घंटे')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('lang.choose', 'hi', 'अपनी भाषा चुनें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('lang.subtitle', 'hi', 'जारी रखने के लिए अपनी भाषा चुनें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('partners.subtitle', 'hi', 'हम जिन संस्थाओं के साथ काम करते हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('partners.title', 'hi', 'हमारे सहयोगियों')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.agree', 'hi', 'सहमत · पूर्ण')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.back', 'hi', 'साइट पर वापस जाएँ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.consent', 'hi', 'जारी रखकर, आप हमें आपके द्वारा सबमिट की गई जानकारी का उपयोग केवल एक उद्देश्य के लिए करने की अनुमति देते हैं: आपकी समस्या में मदद करने के लिए।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.contact', 'hi', 'गोपनीयता के बारे में किसी भी प्रश्न के लिए, व्हाट्सएप पर हमसे संपर्क करें।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.intro', 'hi', 'हम यथासंभव कम जानकारी एकत्र करते हैं, और हम इसका उपयोग एक उद्देश्य के लिए करते हैं: आपकी सहायता के लिए।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.link', 'hi', 'गोपनीयता नीति')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p1.text', 'hi', 'आपका नाम, मोबाइल नंबर, भाषा, आपकी समस्या का विवरण और आप चैट में क्या भेजते हैं। हम निवास संख्या या दस्तावेजों की प्रतियां नहीं मांगते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p1.title', 'hi', 'हम क्या इकट्ठा करते हैं?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p2.text', 'hi', 'आपकी समस्या को समझने के लिए, आपको जवाब देने के लिए और आपको सही दिशा में निर्देशित करने के लिए। हम आपका डेटा नहीं बेचते हैं या विज्ञापन के लिए इसका उपयोग नहीं करते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p2.title', 'hi', 'हम इसका प्रयोग कैसे करते हैं?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p3.text', 'hi', 'आपकी अनुमति के बाद, या कानूनी रूप से सक्षम न्यायिक प्राधिकारी द्वारा अनुरोध किए जाने के अलावा हम आपके नियोक्ता के साथ संवाद नहीं करते हैं या किसी भी पक्ष के साथ आपका डेटा साझा नहीं करते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p3.title', 'hi', 'हम इसे किसके साथ साझा करें?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p4.text', 'hi', 'हम आपके अनुरोध को केवल तब तक ही रखते हैं जब तक वह संसाधित हो जाता है, उसके बाद उसे हटा देते हैं। आप किसी भी समय अपना डेटा हटाने का अनुरोध कर सकते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p4.title', 'hi', 'हम कितना रखते हैं?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p5.text', 'hi', 'आप हमें व्हाट्सएप पर संदेश भेजकर अपने डेटा की एक प्रति का अनुरोध कर सकते हैं, उसे सही कर सकते हैं या उसे हटा सकते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p5.title', 'hi', 'आपके डेटा पर आपका अधिकार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.title', 'hi', 'आपकी गोपनीयता')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.message', 'hi', 'हमें अपनी समस्या बताएं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.name', 'hi', 'आपका नाम')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.phone', 'hi', 'आपका मोबाइल नंबर')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.submit', 'hi', 'अनुरोध सबमिट करें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.subtitle', 'hi', 'हमें लिखें और हम आपसे संपर्क करेंगे।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.success', 'hi', 'हमें आपका अनुरोध प्राप्त हुआ है. हम आपसे शीघ्र ही संपर्क करेंगे।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.title', 'hi', 'मदद के लिए पूछना')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.topic', 'hi', 'समस्या का प्रकार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service1.text', 'hi', 'हम आपको आपके अधिकार सरल भाषा में और आपकी ही भाषा में समझाते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service1.title', 'hi', 'अपने अधिकारों के प्रति जागरूकता')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service2.text', 'hi', 'हम आपकी समस्या सुनते हैं, आपसे संपर्क करते हैं और चरण दर चरण आपका मार्गदर्शन करते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service2.title', 'hi', 'सुनें और पालन करें')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service3.text', 'hi', 'हम आपको आधिकारिक अधिकारियों से जोड़ेंगे और आपको चरण समझाएंगे।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service3.title', 'hi', 'सही दिशा में निर्देशित करना')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service4.text', 'hi', 'हम आपको शिकायत की प्रक्रिया समझाते हैं और इसे कब और कहां जमा करना है।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service4.title', 'hi', 'व्यवस्थित समर्थन')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('services.title', 'hi', 'हम आपको क्या ऑफर करते हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step1.text', 'hi', 'स्क्रीन के नीचे व्हाट्सएप बटन।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step1.title', 'hi', 'हरा बटन दबाएँ')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step2.text', 'hi', 'टाइप करें, या ध्वनि संदेश भेजें.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step2.title', 'hi', 'अपनी समस्या अपनी भाषा में बताएं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step3.text', 'hi', 'हम आपको आपके अधिकार समझाते हैं, और हम आपको सही मंजिल से जोड़ते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step3.title', 'hi', 'हम आपको जवाब देते हैं और आपकी मदद करते हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('steps.subtitle', 'hi', 'केवल तीन कदम')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('steps.title', 'hi', 'हम आपकी कैसे मदद कर सकते हैं?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.abuse', 'hi', 'वे मेरे साथ बुरा व्यवहार करते हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.abuse.desc', 'hi', 'पीटना, कैद करना, या भोजन या आराम करने से रोकना')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.contract', 'hi', 'गैर-ठेका कार्य')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.contract.desc', 'hi', 'घंटे, कार्य या वेतन जो लिखा गया है उससे भिन्न')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.eosb', 'hi', 'मैं काम छोड़ना चाहता हूं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.eosb.desc', 'hi', 'सेवा का स्थानांतरण, अंतिम निकास, या बकाया')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.housing', 'hi', 'आवास या भोजन')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.housing.desc', 'hi', 'अपर्याप्त आवास या भोजन या पानी रोकना')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.injury', 'hi', 'आप काम के दौरान घायल या बीमार हैं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.injury.desc', 'hi', 'कार्य चोट, उपचार या स्वास्थ्य बीमा')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.other', 'hi', 'एक और बात')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.other.desc', 'hi', 'हमें अपनी समस्या अपने शब्दों में बताएं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.passport', 'hi', 'मेरा पासपोर्ट या निवास स्थान धारण किया जा रहा है')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.passport.desc', 'hi', 'नियोक्ता के पास पासपोर्ट है या उसने निवास का नवीनीकरण नहीं किया है')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.rights', 'hi', 'मैं अपने अधिकार जानना चाहता हूं')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.rights.desc', 'hi', 'छुट्टियाँ, काम के घंटे और बीमा')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.salary', 'hi', 'मेरी सैलरी नहीं आई है')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.salary.desc', 'hi', 'वेतन में देरी, कमी या इनकार')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topics.subtitle', 'hi', 'उस छवि पर क्लिक करें जो आपकी समस्या से मिलती जुलती है')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topics.title', 'hi', 'तुम्हारी समस्या क्या है?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why.title', 'hi', 'हम पर भरोसा क्यों करें?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why1.text', 'hi', 'हम आपसे कभी कोई पैसा नहीं मांगते.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why1.title', 'hi', 'पूर्णतः निःशुल्क')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why2.text', 'hi', 'चैट में छह भाषाएँ और त्वरित अनुवाद।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why2.title', 'hi', 'अपनी भाषा में')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why3.text', 'hi', 'हम आपकी अनुमति के बिना आपका डेटा आपके नियोक्ता या अन्य के साथ साझा नहीं करते हैं।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why3.title', 'hi', 'आपकी गोपनीयता सुरक्षित है')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why4.text', 'hi', 'वे लोग जिन्होंने वर्षों तक प्रवासी श्रमिकों के साथ काम किया है।')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why4.title', 'hi', 'एक टीम जो आपको समझती है')
  ON DUPLICATE KEY UPDATE value = VALUES(value);

-- ---------- tl — الفلبينية ----------
INSERT INTO contents (contentKey, lang, value) VALUES ('about.point', 'tl', 'Non-profit na serbisyong panlipunan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.text', 'tl', 'Ang “Your Rights” ay isang non-profit, boluntaryong inisyatiba ng sibil. Ang aming pangkat ng mga residente at Saudi ay nagsasalita ng iyong wika. Ipinapaliwanag namin sa iyo ang iyong mga karapatan sa simpleng salita at ididirekta ka namin sa tamang opisyal na awtoridad. Ang serbisyo ay ganap na libre, at hindi kami nakikipag-ugnayan sa iyong employer maliban kung hihilingin mo ito.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.title', 'tl', 'Sino tayo?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.1', 'tl', 'Isang non-profit, boluntaryong inisyatiba')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.2', 'tl', 'Isang pangkat na nagsasalita ng iyong wika at nauunawaan ang iyong sitwasyon')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.3', 'tl', 'Ipinapaliwanag namin sa iyo ang iyong mga karapatan at ididirekta ka namin sa opisyal na awtoridad')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.title', 'tl', 'tayo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.1', 'tl', 'Hindi tayo ahensya ng gobyerno o pulis')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.2', 'tl', 'Hindi kami embassy o recruitment office')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.3', 'tl', 'Hindi kami law firm at hindi kami naglilitis ng mga kaso para sa iyo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.title', 'tl', 'hindi kami')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.1', 'tl', 'Mga manggagawa sa konstruksyon at pabrika')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.2', 'tl', 'Mga manggagawa sa bahay')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.3', 'tl', 'Mga driver at delivery worker')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.4', 'tl', 'Mga manggagawa sa restawran at tindahan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.title', 'tl', 'Para kanino ang serbisyong ito?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('brand.name', 'tl', 'Ang iyong mga karapatan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.agentJoined', 'tl', 'kasama mo si {name}.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.close', 'tl', 'Isara ang usapan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.closed', 'tl', 'sarado')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.empty', 'tl', 'Wala pang mensahe')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.ended', 'tl', 'Tapos na ang usapan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.namePrompt', 'tl', 'Isulat ang iyong pangalan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.offline', 'tl', 'Sa labas ng oras ng trabaho')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.offlineText', 'tl', 'Iwanan ang iyong mensahe sa WhatsApp at tutugon kami sa iyo sa unang oras ng pagtatrabaho.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.online', 'tl', 'Available na')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.original', 'tl', 'Orihinal na teksto')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.pick', 'tl', 'Pumili ng pag-uusap')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.placeholder', 'tl', 'Isulat ang iyong mensahe dito')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.selectHint', 'tl', 'Pumili ng pag-uusap mula sa listahang sasagutan.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.start', 'tl', 'Simulan ang pakikipag-chat')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.title', 'tl', 'Chat')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.translate', 'tl', 'Awtomatikong pagsasalin')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.visitorLang', 'tl', 'Wika ng bisita')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.waiting', 'tl', 'Naghihintay kami ng isang empleyado na tumugon sa iyo...')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.welcome', 'tl', 'Hoy, ikaw. Sabihin sa amin ang iyong problema sa iyong wika.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.cta', 'tl', 'Makipag-usap sa isang mangangaral sa iyong wika')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.note', 'tl', 'Opsyonal na serbisyo. Ang tulong sa iyong mga karapatan ay makukuha ng lahat nang walang anumang kundisyon.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.text', 'tl', 'Mayroon kaming mga mangangaral na nagsasalita ng iyong wika at sumasagot sa iyong mga tanong tungkol sa mga bagay ng iyong relihiyon, nang buong paggalang at walang anumang obligasyon.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.title', 'tl', 'Alamin ang tungkol sa iyong relihiyon')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.about', 'tl', 'Tungkol sa serbisyo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.contact', 'tl', 'Makipag-ugnayan sa amin')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.follow', 'tl', 'Sundan kami')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.free', 'tl', 'Libreng serbisyo · Iginagalang namin ang iyong privacy')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.identity', 'tl', 'Isang non-profit na civil initiative · Hindi kami isang entity ng gobyerno')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.privacy', 'tl', 'patakaran sa privacy')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.rights', 'tl', 'Lahat ng karapatan ay nakalaan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.whatsappLabel', 'tl', 'Numero ng WhatsApp')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.badge', 'tl', 'Libre · Kumpidensyal · Sa iyong wika')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaChat', 'tl', 'Live chat')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaHelp', 'tl', 'Humingi ng tulong')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaWhatsapp', 'tl', 'Makipag-ugnayan sa amin sa WhatsApp')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.subtitle', 'tl', 'Anong suweldo ang natanggap mo? May hawak bang iba ang passport mo? Pagod sa trabaho? Kausapin mo kami ngayon.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.title', 'tl', 'Ang iyong karapatan ay pinangangalagaan. Tinutulungan ka namin.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.0', 'tl', 'Linggo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.1', 'tl', 'Lunes')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.2', 'tl', 'Martes')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.3', 'tl', 'Miyerkules')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.4', 'tl', 'Huwebes')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.5', 'tl', 'Biyernes')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.6', 'tl', 'Sabado')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.all', 'tl', 'Araw-araw ng linggo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.note', 'tl', 'Natatanggap ng WhatsApp ang iyong mensahe anumang oras, at tumutugon kami sa iyo sa unang oras ng trabaho.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.range', 'tl', 'Mula {start} hanggang {end}')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.title', 'tl', 'Oras ng trabaho')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('lang.choose', 'tl', 'Piliin ang iyong wika')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('lang.subtitle', 'tl', 'Piliin ang iyong wika upang magpatuloy')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('partners.subtitle', 'tl', 'Mga entity na pinagtatrabahuhan namin')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('partners.title', 'tl', 'Ang aming mga kasosyo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.agree', 'tl', 'Sumasang-ayon · Kumpleto')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.back', 'tl', 'Bumalik sa site')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.consent', 'tl', 'Sa pagpapatuloy, pinapayagan mo kaming gamitin ang impormasyong isinumite mo para sa isang layunin lamang: upang matulungan ka sa iyong problema.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.contact', 'tl', 'Para sa anumang mga katanungan tungkol sa privacy, makipag-ugnayan sa amin sa WhatsApp.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.intro', 'tl', 'Kinokolekta namin ang kaunting impormasyon hangga\'t maaari, at ginagamit namin ito para sa isang layunin: upang matulungan ka.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.link', 'tl', 'patakaran sa privacy')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p1.text', 'tl', 'Ang iyong pangalan, numero ng mobile, wika, paglalarawan ng iyong problema, at kung ano ang iyong ipinadala sa chat. Hindi namin hinihingi ang numero ng tirahan o mga kopya ng mga dokumento.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p1.title', 'tl', 'Ano ang kinokolekta natin?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p2.text', 'tl', 'Upang maunawaan ang iyong problema, tumugon sa iyo, at ituro ka sa tamang direksyon. Hindi namin ibinebenta ang iyong data o ginagamit ito para sa advertising.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p2.title', 'tl', 'Paano natin ito ginagamit?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p3.text', 'tl', 'Hindi kami nakikipag-ugnayan sa iyong tagapag-empleyo o ibinabahagi ang iyong data sa alinmang partido maliban pagkatapos ng iyong pahintulot, o kung hiniling ng isang legal na may kakayahang hudisyal na awtoridad.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p3.title', 'tl', 'Kanino natin ito ibabahagi?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p4.text', 'tl', 'Itatago lang namin ang iyong kahilingan hangga\'t ito ay naproseso, pagkatapos ay tanggalin ito. Maaari kang humiling ng pagtanggal ng iyong data anumang oras.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p4.title', 'tl', 'Magkano ang iniingatan natin?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p5.text', 'tl', 'Maaari kang humiling ng kopya ng iyong data, itama ito, o tanggalin ito sa pamamagitan ng pagmemensahe sa amin sa WhatsApp.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p5.title', 'tl', 'Ang iyong mga karapatan sa iyong data')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.title', 'tl', 'Ang iyong privacy')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.message', 'tl', 'Sabihin sa amin ang iyong problema')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.name', 'tl', 'pangalan mo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.phone', 'tl', 'Ang iyong mobile number')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.submit', 'tl', 'Isumite ang kahilingan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.subtitle', 'tl', 'Sumulat sa amin at makikipag-ugnayan kami sa iyo.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.success', 'tl', 'Natanggap namin ang iyong kahilingan. Makikipag-ugnayan kami sa iyo sa lalong madaling panahon.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.title', 'tl', 'Humingi ng tulong')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.topic', 'tl', 'Uri ng problema')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service1.text', 'tl', 'Ipinapaliwanag namin ang iyong mga karapatan sa iyo sa simpleng wika at sa sarili mong wika.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service1.title', 'tl', 'Kamalayan sa iyong mga karapatan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service2.text', 'tl', 'Naririnig namin ang iyong problema, nag-follow up sa iyo, at ginagabayan ka nang hakbang-hakbang.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service2.title', 'tl', 'Makinig at sumunod')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service3.text', 'tl', 'Ikokonekta ka namin sa mga opisyal na awtoridad at ipapaliwanag sa iyo ang mga hakbang.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service3.title', 'tl', 'Pagdidirekta sa tamang direksyon')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service4.text', 'tl', 'Ipinapaliwanag namin sa iyo ang proseso ng reklamo at kung kailan at saan ito isusumite.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service4.title', 'tl', 'Systematic na suporta')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('services.title', 'tl', 'Ang iniaalok namin sa iyo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step1.text', 'tl', 'Button ng WhatsApp sa ibaba ng screen.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step1.title', 'tl', 'Pindutin ang berdeng pindutan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step2.text', 'tl', 'Mag-type, o magpadala ng voice message.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step2.title', 'tl', 'Sabihin ang iyong problema sa iyong wika')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step3.text', 'tl', 'Ipinapaliwanag namin sa iyo ang iyong mga karapatan, at ikinokonekta ka namin sa tamang destinasyon.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step3.title', 'tl', 'Tumugon kami sa iyo at tinutulungan ka')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('steps.subtitle', 'tl', 'Tatlong hakbang lang')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('steps.title', 'tl', 'Paano ka namin matutulungan?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.abuse', 'tl', 'Masama ang pakikitungo nila sa akin')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.abuse.desc', 'tl', 'Pambubugbog, pagkulong, o pagpigil sa pagkain o pagpapahinga')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.contract', 'tl', 'Hindi kontratang trabaho')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.contract.desc', 'tl', 'Iba ang oras, gawain, o suweldo sa nakasulat')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.eosb', 'tl', 'Gusto kong umalis sa trabaho')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.eosb.desc', 'tl', 'Paglipat ng serbisyo, huling paglabas, o mga bayarin')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.housing', 'tl', 'Akomodasyon o pagkain')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.housing.desc', 'tl', 'Hindi sapat na tirahan o pagpigil ng pagkain o tubig')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.injury', 'tl', 'Ikaw ay nasugatan o may sakit sa trabaho')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.injury.desc', 'tl', 'Pinsala sa trabaho, paggamot o segurong pangkalusugan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.other', 'tl', 'Isa pang bagay')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.other.desc', 'tl', 'Sabihin sa amin ang iyong problema sa iyong sariling mga salita')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.passport', 'tl', 'Ang aking pasaporte o paninirahan ay hawak')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.passport.desc', 'tl', 'Hawak ng employer ang pasaporte o hindi nag-renew ng paninirahan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.rights', 'tl', 'Gusto kong malaman ang aking mga karapatan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.rights.desc', 'tl', 'Bakasyon, oras ng trabaho at insurance')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.salary', 'tl', 'Hindi pa dumating ang sweldo ko')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.salary.desc', 'tl', 'Pagkaantala, pagbaba o pagtanggi sa suweldo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topics.subtitle', 'tl', 'Mag-click sa larawan na kahawig ng iyong problema')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topics.title', 'tl', 'Ano bang problema mo?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why.title', 'tl', 'Bakit kami magtitiwala?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why1.text', 'tl', 'Hindi kami kailanman humihingi ng pera sa iyo.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why1.title', 'tl', 'Ganap na libre')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why2.text', 'tl', 'Anim na wika at agarang pagsasalin sa chat.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why2.title', 'tl', 'Sa sarili mong wika')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why3.text', 'tl', 'Hindi namin ibinabahagi ang iyong data sa iyong employer o sa iba maliban sa iyong pahintulot.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why3.title', 'tl', 'Ang iyong privacy ay pinapanatili')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why4.text', 'tl', 'Mga taong nagtrabaho nang maraming taon sa mga dayuhang manggagawa.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why4.title', 'tl', 'Isang pangkat na nakakaintindi sa iyo')
  ON DUPLICATE KEY UPDATE value = VALUES(value);

-- ---------- id — الإندونيسية ----------
INSERT INTO contents (contentKey, lang, value) VALUES ('about.point', 'id', 'Layanan sosial nirlaba')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.text', 'id', '“Hak Anda” adalah inisiatif sipil yang bersifat nirlaba dan bersifat sukarela. Tim warga kami dan warga Saudi berbicara dalam bahasa Anda. Kami menjelaskan hak Anda kepada Anda dengan kata-kata sederhana dan mengarahkan Anda ke otoritas resmi yang benar. Layanan ini sepenuhnya gratis, dan kami tidak akan menghubungi perusahaan Anda kecuali Anda memintanya.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.title', 'id', 'Siapa kita?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.1', 'id', 'Inisiatif sukarelawan nirlaba')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.2', 'id', 'Sebuah tim yang berbicara dalam bahasa Anda dan memahami situasi Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.3', 'id', 'Kami menjelaskan hak Anda kepada Anda dan mengarahkan Anda ke otoritas resmi')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAre.title', 'id', 'Kami')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.1', 'id', 'Kami bukan lembaga pemerintah atau polisi')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.2', 'id', 'Kami bukan kedutaan atau kantor perekrutan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.3', 'id', 'Kami bukan firma hukum dan kami tidak mengajukan perkara untuk Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('about.weAreNot.title', 'id', 'Kami tidak')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.1', 'id', 'Pekerja konstruksi dan pabrik')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.2', 'id', 'Pekerja rumahan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.3', 'id', 'Pengemudi dan pekerja pengiriman')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.4', 'id', 'Pekerja restoran dan toko')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('audience.title', 'id', 'Untuk siapa layanan ini?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('brand.name', 'id', 'Hak Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.agentJoined', 'id', 'Bersamamu {name}')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.close', 'id', 'Tutup percakapan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.closed', 'id', 'Tertutup')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.empty', 'id', 'Belum ada pesan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.ended', 'id', 'Percakapan selesai')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.namePrompt', 'id', 'Tulis nama Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.offline', 'id', 'Di luar jam kerja')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.offlineText', 'id', 'Tinggalkan pesan Anda di WhatsApp dan kami akan merespons Anda pada waktu kerja pertama.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.online', 'id', 'Tersedia sekarang')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.original', 'id', 'Teks asli')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.pick', 'id', 'Pilih percakapan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.placeholder', 'id', 'Tulis pesan Anda di sini')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.selectHint', 'id', 'Pilih percakapan dari daftar untuk dibalas.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.start', 'id', 'Mulailah mengobrol')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.title', 'id', 'Mengobrol')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.translate', 'id', 'Terjemahan otomatis')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.visitorLang', 'id', 'Bahasa pengunjung')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.waiting', 'id', 'Kami sedang menunggu karyawan untuk merespons Anda...')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('chat.welcome', 'id', 'Hei kamu. Beritahu kami masalah Anda dalam bahasa Anda.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.cta', 'id', 'Bicaralah dengan seorang pengkhotbah dalam bahasa Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.note', 'id', 'Layanan opsional. Bantuan dengan hak-hak Anda tersedia untuk semua orang tanpa syarat apa pun.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.text', 'id', 'Kami memiliki pengkhotbah yang berbicara dalam bahasa Anda dan menjawab pertanyaan Anda tentang masalah agama Anda, dengan segala hormat dan tanpa kewajiban apa pun.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('dawah.title', 'id', 'Pelajari tentang agama Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.about', 'id', 'Tentang layanan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.contact', 'id', 'Hubungi kami')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.follow', 'id', 'Ikuti kami')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.free', 'id', 'Layanan gratis · Kami menghormati privasi Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.identity', 'id', 'Inisiatif sipil nirlaba · Kami bukan entitas pemerintah')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.privacy', 'id', 'kebijakan privasi')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.rights', 'id', 'Semua hak dilindungi undang-undang')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('footer.whatsappLabel', 'id', 'Nomor WhatsApp')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.badge', 'id', 'Gratis · Rahasia · Dalam bahasa Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaChat', 'id', 'Obrolan langsung')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaHelp', 'id', 'Minta bantuan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.ctaWhatsapp', 'id', 'Hubungi kami di WhatsApp')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.subtitle', 'id', 'Berapa gaji yang Anda terima? Apakah paspor Anda dipegang oleh orang lain? Lelah di tempat kerja? Bicaralah dengan kami sekarang.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hero.title', 'id', 'Hak Anda dipertahankan. Kami membantu Anda.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.0', 'id', 'Minggu')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.1', 'id', 'Senin')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.2', 'id', 'Selasa')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.3', 'id', 'Rabu')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.4', 'id', 'Kamis')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.5', 'id', 'Jumat')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.6', 'id', 'Sabtu')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.day.all', 'id', 'Setiap hari dalam seminggu')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.note', 'id', 'WhatsApp menerima pesan Anda kapan saja, dan kami merespons Anda pada jam kerja pertama.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.range', 'id', 'Dari {start} hingga {end}')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('hours.title', 'id', 'Jam kerja')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('lang.choose', 'id', 'Pilih bahasa Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('lang.subtitle', 'id', 'Pilih bahasa Anda untuk melanjutkan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('partners.subtitle', 'id', 'Entitas tempat kami bekerja')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('partners.title', 'id', 'Mitra kami')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.agree', 'id', 'Setuju · Lengkap')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.back', 'id', 'Kembali ke situs')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.consent', 'id', 'Dengan melanjutkan, Anda mengizinkan kami menggunakan informasi yang Anda kirimkan hanya untuk satu tujuan: untuk membantu mengatasi masalah Anda.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.contact', 'id', 'Untuk pertanyaan apa pun tentang privasi, hubungi kami di WhatsApp.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.intro', 'id', 'Kami mengumpulkan informasi sesedikit mungkin, dan kami menggunakannya untuk satu tujuan: membantu Anda.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.link', 'id', 'kebijakan privasi')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p1.text', 'id', 'Nama Anda, nomor ponsel, bahasa, deskripsi masalah Anda, dan apa yang Anda kirimkan dalam obrolan. Kami tidak meminta nomor tempat tinggal atau salinan dokumen.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p1.title', 'id', 'Apa yang kami kumpulkan?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p2.text', 'id', 'Untuk memahami masalah Anda, merespons Anda, dan mengarahkan Anda ke arah yang benar. Kami tidak menjual data Anda atau menggunakannya untuk iklan.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p2.title', 'id', 'Bagaimana kita menggunakannya?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p3.text', 'id', 'Kami tidak berkomunikasi dengan perusahaan Anda atau membagikan data Anda dengan pihak mana pun kecuali setelah izin Anda, atau jika diminta oleh otoritas peradilan yang berwenang secara hukum.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p3.title', 'id', 'Dengan siapa kita membaginya?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p4.text', 'id', 'Kami hanya menyimpan permintaan Anda selama masih diproses, lalu menghapusnya. Anda dapat meminta penghapusan data Anda kapan saja.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p4.title', 'id', 'Berapa banyak yang kita simpan?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p5.text', 'id', 'Anda dapat meminta salinan data Anda, memperbaikinya, atau menghapusnya dengan mengirim pesan kepada kami di WhatsApp.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.p5.title', 'id', 'Hak Anda atas data Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('privacy.title', 'id', 'Privasi Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.message', 'id', 'Beritahu kami masalah Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.name', 'id', 'namamu')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.phone', 'id', 'Nomor ponsel Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.submit', 'id', 'Kirimkan permintaan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.subtitle', 'id', 'Kirimkan surat kepada kami dan kami akan menghubungi Anda.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.success', 'id', 'Kami telah menerima permintaan Anda. Kami akan segera menghubungi Anda.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.title', 'id', 'Minta bantuan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('request.topic', 'id', 'Jenis masalah')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service1.text', 'id', 'Kami menjelaskan hak-hak Anda kepada Anda dalam bahasa yang sederhana dan dalam bahasa Anda sendiri.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service1.title', 'id', 'Kesadaran akan hak-hak Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service2.text', 'id', 'Kami mendengarkan masalah Anda, menindaklanjutinya, dan memandu Anda langkah demi langkah.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service2.title', 'id', 'Dengarkan dan ikuti')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service3.text', 'id', 'Kami akan menghubungkan Anda dengan otoritas resmi dan menjelaskan langkah-langkahnya kepada Anda.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service3.title', 'id', 'Mengarahkan ke arah yang benar')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service4.text', 'id', 'Kami menjelaskan kepada Anda proses pengaduan dan kapan serta di mana menyampaikannya.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('service4.title', 'id', 'Dukungan sistematis')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('services.title', 'id', 'Apa yang kami tawarkan kepada Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step1.text', 'id', 'Tombol WhatsApp di bagian bawah layar.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step1.title', 'id', 'Tekan tombol hijau')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step2.text', 'id', 'Ketik, atau kirim pesan suara.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step2.title', 'id', 'Ceritakan masalah Anda dalam bahasa Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step3.text', 'id', 'Kami menjelaskan hak Anda kepada Anda, dan kami menghubungkan Anda ke tujuan yang tepat.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('step3.title', 'id', 'Kami menanggapi Anda dan membantu Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('steps.subtitle', 'id', 'Hanya tiga langkah')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('steps.title', 'id', 'Apa yang bisa kami bantu?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.abuse', 'id', 'Mereka memperlakukan saya dengan buruk')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.abuse.desc', 'id', 'Memukuli, memenjarakan, atau mencegah makan atau istirahat')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.contract', 'id', 'Pekerjaan non-kontrak')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.contract.desc', 'id', 'Jam, tugas, atau gaji berbeda dengan yang tertulis')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.eosb', 'id', 'Saya ingin meninggalkan pekerjaan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.eosb.desc', 'id', 'Pengalihan layanan, keluar akhir, atau iuran')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.housing', 'id', 'Akomodasi atau makanan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.housing.desc', 'id', 'Perumahan yang tidak memadai atau tidak tersedianya makanan atau air')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.injury', 'id', 'Anda terluka atau sakit di tempat kerja')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.injury.desc', 'id', 'Cedera kerja, perawatan atau asuransi kesehatan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.other', 'id', 'Hal lain')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.other.desc', 'id', 'Ceritakan masalah Anda dengan kata-kata Anda sendiri')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.passport', 'id', 'Paspor atau tempat tinggal saya ditahan')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.passport.desc', 'id', 'Majikan memegang paspor atau belum memperbarui izin tinggalnya')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.rights', 'id', 'Saya ingin mengetahui hak-hak saya')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.rights.desc', 'id', 'Liburan, jam kerja dan asuransi')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.salary', 'id', 'Gaji saya belum tiba')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topic.salary.desc', 'id', 'Penundaan, penurunan atau penolakan gaji')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topics.subtitle', 'id', 'Klik pada gambar yang menyerupai masalah Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('topics.title', 'id', 'Apa masalahmu?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why.title', 'id', 'Mengapa mempercayai kami?')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why1.text', 'id', 'Kami tidak pernah meminta uang dari Anda.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why1.title', 'id', 'Sepenuhnya gratis')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why2.text', 'id', 'Enam bahasa dan terjemahan instan dalam obrolan.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why2.title', 'id', 'Dalam bahasa Anda sendiri')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why3.text', 'id', 'Kami tidak membagikan data Anda dengan perusahaan Anda atau orang lain kecuali dengan izin Anda.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why3.title', 'id', 'Privasi Anda terjaga')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why4.text', 'id', 'Orang yang telah bekerja bertahun-tahun dengan pekerja ekspatriat.')
  ON DUPLICATE KEY UPDATE value = VALUES(value);
INSERT INTO contents (contentKey, lang, value) VALUES ('why4.title', 'id', 'Sebuah tim yang memahami Anda')
  ON DUPLICATE KEY UPDATE value = VALUES(value);

COMMIT;

-- للتحقق بعد الاستيراد، شغّل هذا في phpMyAdmin ← SQL:
-- SELECT lang, COUNT(*) AS total, SUM(TRIM(value) <> '') AS filled FROM contents GROUP BY lang;
-- المتوقع: ar = 197، en = 197، وكل من ur/hi/tl/id = 140