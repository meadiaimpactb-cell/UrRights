-- ============================================================
-- تصحيح الشركاء — حقوقك / UrRights
--
-- سبب هذا الملف (ملاحظتا التقييم 8 و 9):
--   • شعار وزارة الموارد البشرية ومساند يحتاج اتفاقية مكتوبة قبل عرضه.
--   • الصفوف الحالية مكرّرة مرتين لكل جهة (خطأ تعبئة قديم).
--
-- ما يفعله هذا الملف:
--   1. يُخفي الشعارات الحكومية من الموقع (enabled = 0) دون حذفها،
--      فتبقى الصفوف موجودة ويمكن إعادة تفعيلها فورًا بعد الحصول على الإذن.
--   2. يضيف الشريكين الفعليين باسم مؤقت وبلا شعار.
--
-- بعد الاستيراد: صحّح الاسم الرسمي وارفع الشعار من
-- لوحة التحكم ← الشركاء.
--
-- آمن للتكرار. لا يمسّ أي جدول آخر.
-- ============================================================

SET NAMES utf8mb4;
START TRANSACTION;

-- 1) إخفاء الشعارات الحكومية (بدون حذف)
UPDATE partners
   SET enabled = 0
 WHERE logoUrl IN ('/assets/partners/mhrsd.svg', '/assets/partners/musaned.svg');

-- 2) إضافة الشركاء الفعليين (مرة واحدة فقط)
INSERT INTO partners (nameAr, nameEn, logoUrl, websiteUrl, sortOrder, enabled)
SELECT 'الجمعية المنفّذة', 'The implementing association', '', '', 1, 1
 WHERE NOT EXISTS (SELECT 1 FROM partners WHERE nameAr = 'الجمعية المنفّذة');

INSERT INTO partners (nameAr, nameEn, logoUrl, websiteUrl, sortOrder, enabled)
SELECT 'قسط', 'Qist', '', '', 2, 1
 WHERE NOT EXISTS (SELECT 1 FROM partners WHERE nameAr = 'قسط');

COMMIT;

-- للتحقق بعد الاستيراد:
-- SELECT id, nameAr, enabled FROM partners ORDER BY sortOrder, id;
-- المتوقع: الصفوف الحكومية enabled = 0، والشريكان الجديدان enabled = 1
