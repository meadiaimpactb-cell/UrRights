# النشر على Hostinger — حقوقك

الاستضافة من نوع **Node.js Web App** (كما في لوحة hPanel ← Websites ← urrights.org). هي تبني المشروع بنفسها وتشغّله، فلا تحتاج أي سطر أوامر على الخادم.

**كيف يعمل التشغيل الأول:** عند بدء الخادم في الإنتاج ينفّذ [api/lib/bootstrap.ts](api/lib/bootstrap.ts) تلقائيًا:
1. إنشاء/تحديث الجداول من `db/migrations`.
2. تعبئة اللغات والإعدادات والمحتوى (عربي + إنجليزي) إن كانت قاعدة البيانات فارغة.
3. إنشاء حساب المدير من `ADMIN_EMAIL` و`ADMIN_PASSWORD` إن لم يكن موجودًا.

كل الخطوات آمنة للتكرار عند كل إعادة تشغيل.

---

## 1. قاعدة البيانات

hPanel ← **Databases** ← Management ← Create new database:

- Database name: مثل `u123456_urrights`
- Username / Password: احفظهما

بعد الإنشاء ستجد **Host** (مثل `srv1234.hstgr.io` أو `localhost`) والمنفذ `3306`.

كوّن الرابط بهذه الصيغة:

```
mysql://USERNAME:PASSWORD@HOST:3306/DATABASE
```

> لو كانت كلمة المرور تحتوي رموزًا مثل `@` أو `#` أو `/` فشفّرها: `@` → `%40`، `#` → `%23`، `/` → `%2F`.

---

## 2. متغيرات البيئة

hPanel ← Websites ← urrights.org ← **Environment variables** ← أضف:

| المتغير | القيمة |
|---|---|
| `DATABASE_URL` | الرابط من الخطوة 1 |
| `APP_SECRET` | سلسلة عشوائية طويلة (32+ حرفًا) |
| `NODE_ENV` | `production` |
| `ADMIN_EMAIL` | بريد المدير الأول |
| `ADMIN_PASSWORD` | كلمة مروره (8+ أحرف) |
| `ADMIN_NAME` | اسمه (اختياري) |

لا تضع `PORT` — الاستضافة تحدده بنفسها.

لتوليد `APP_SECRET` على جهازك:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

---

## 3. الرفع

ارفع ملف `urrights-deploy.zip` (يُنتَج بـ `npm run package`) من **Deployments** ← Upload.

إعدادات النشر:

| الإعداد | القيمة |
|---|---|
| Root directory | `./` (الملفات في جذر الأرشيف) |
| Framework | Hono (يُكتشف تلقائيًا) |
| Node version | **22.x** (يعمل أيضًا على 20.x) |
| Build command | `npm run build` |
| Entry file | `dist/index.js` (الافتراضي لإطار Hono عند Hostinger — يطابق ناتج البناء) |
| Output directory | اتركه فارغًا (التطبيق خادم وليس ملفات ثابتة) |

> إن كان "Build and output settings" على **Default** ولم يُحدَّد Entry file، ينجح البناء ثم تظهر الحالة "Build failed" لأن الاستضافة لا تجد ملف التشغيل. افتح Redeploy ← Build and output settings وحدّد `server.js`.

ثم **Redeploy**. راقب **Runtime logs**: يجب أن ترى `Server running` ثم `[bootstrap] migrations applied`.

**تشخيص سريع من المتصفح:** افتح `https://urrights.org/api/health?db=1`:
- `"db":{"ok":true}` ← كل شيء سليم.
- `ER_ACCESS_DENIED_ERROR` ← اسم المستخدم أو كلمة المرور في `DATABASE_URL` خاطئان.
- `ECONNREFUSED` أو `ENOTFOUND` ← المضيف أو المنفذ خاطئان (جرّب host الظاهر في صفحة Databases بدل `localhost`).
- `ER_BAD_DB_ERROR` ← اسم قاعدة البيانات خاطئ.

---

## 4. بعد أول تشغيل

- ادخل على `https://urrights.org/login` بالبريد وكلمة المرور من الخطوة 2.
- **رقم الواتساب** — اللوحة ← الروابط والإعدادات. الافتراضي `966500000000` رقم وهمي، ولا يظهر الرقم في التذييل حتى تضع رقمًا حقيقيًا.
- **أوقات العمل** — نفس الصفحة. تتحكم بشارة «متوفرون الآن / خارج أوقات العمل» وبتوفر الدردشة المباشرة. الافتراضي السبت–الخميس 9:00 ص – 9:00 م (+03:00).
- **قسم «تعرف على دينك»** — نفس الصفحة، مخفي افتراضيًا. يظهر بعد التفعيل وإدخال رقم واتساب الداعية.
- **الشركاء** — اللوحة ← الشركاء. صحّح أسماء «الجمعية المنفّذة» و«قسط» وارفع شعاراتهم.
  > الشعارات الحكومية (وزارة الموارد، مساند) تحتاج اتفاقية مكتوبة قبل عرضها — لا تُفعّلها بدونها.
- أضف الموظفين من لوحة التحكم ← المستخدمون.
- لتعبئة اللغات الأخرى (أردو، هندي، فلبيني، إندونيسي) ترجمةً آلية، شغّل من جهازك مع `DATABASE_URL` يشير إلى قاعدة الاستضافة (فعّل Remote MySQL في hPanel وأضف عنوان IP جهازك):

```bash
npm run db:seed:translate
```

---

## عند أي تعديل لاحق

```bash
npm run package        # يبني المشروع وينتج urrights-deploy.zip
```

ثم ارفعه من Deployments ← Redeploy. قاعدة البيانات ومحتواها لا يتأثران.

**كيف تصل نصوص النسخة الجديدة؟** عند التشغيل يقارن الخادم `content_revision` في جدول الإعدادات
برقم المراجعة في `db/seed.mjs`، فيضيف المفاتيح الجديدة فقط ويطبّق تعديلات النصوص المعلنة مرة واحدة.
النصوص التي عدّلتها من اللوحة **لا تُمس**. أي مفتاح غير مترجم في لغة ما يسقط تلقائيًا إلى الإنجليزية ثم العربية،
فلا تظهر صفحة فارغة أبدًا.

**فتح الموقع بلغة محددة** للاختبار أو للمشاركة: `https://urrights.org/?lang=ur`
(ar, en, ur, hi, tl, id).

---

## الأخطاء الشائعة

| العرض | السبب | الحل |
|---|---|---|
| Build failed: `npm ci` … not in sync | `package-lock.json` قديم | شغّل `npm install` محليًا وارفع الملف المحدّث |
| البناء ينتهي بـ `Done` ثم الحالة Build failed | لم يُحدَّد Entry file | Redeploy ← Build and output settings ← Entry file = `server.js` |
| Build failed: `sh: vite: command not found` | الاستضافة تثبّت بدون devDependencies عندما `NODE_ENV=production` | أدوات البناء (vite, esbuild, tailwind…) موضوعة في `dependencies` عمدًا — لا تنقلها إلى devDependencies |
| `[bootstrap] database initialization failed: ECONNREFUSED` | `DATABASE_URL` خاطئ أو الاستضافة لا تصل للقاعدة | راجع Host والمنفذ من صفحة Databases |
| `Access denied for user` | اسم المستخدم/كلمة المرور خاطئة | أعد ضبطهما من Databases وحدّث المتغير |
| الموقع يعمل لكن الدخول يقول بيانات خاطئة | `ADMIN_EMAIL`/`ADMIN_PASSWORD` لم تكن موجودة عند أول تشغيل | أضفهما ثم Redeploy — يُنشأ الحساب إن لم يكن موجودًا |
| النشر Completed لكن الموقع 503 بينما `/robots.txt` يفتح | عملية Node انهارت عند البدء | افتح Runtime logs وتأكد أن Entry file = `dist/index.js` |
| Runtime logs: `ERR_REQUIRE_ASYNC_MODULE` … `lsnode.js` | مشغّل الاستضافة يحمّل الملف بـ `require()` ولا يقبل ESM مع await أعلى الملف | الخادم يُبنى CommonJS عبر `scripts-build-server.mjs` — لا تعد صيغة ESM |
| النصوص تظهر كمفاتيح مثل `hero.title` | التعبئة لم تعمل | راجع Runtime logs، وتأكد أن `AUTO_MIGRATE` ليس `false` |

---

## التجربة محليًا على http://urrights.test (Laragon)

- Apache يعمل وكيلًا عكسيًا إلى Node على المنفذ 3000 عبر `C:\laragon\etc\apache2\sites-enabled\00-urrights.test.conf`، والنطاق مضاف في ملف hosts.
- قاعدة البيانات المحلية `urrights_local`، وبيانات المدير في `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).
- **وضع الإنتاج (مطابق للاستضافة):** `npm run build` ثم `npm start`.
- **وضع التطوير (تحديث فوري):** `npm run dev` — نفس المنفذ، لذا أوقف الآخر أولًا.
