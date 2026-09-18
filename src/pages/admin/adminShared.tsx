import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type AdminLang = "ar" | "en";

const D: Record<string, { ar: string; en: string }> = {
  "nav.dashboard": { ar: "نظرة عامة", en: "Overview" },
  "nav.content": { ar: "المحتوى", en: "Content" },
  "nav.languages": { ar: "اللغات", en: "Languages" },
  "nav.chat": { ar: "المحادثات", en: "Live chat" },
  "nav.requests": { ar: "الطلبات", en: "Requests" },
  "nav.partners": { ar: "الشركاء", en: "Partners" },
  "nav.settings": { ar: "الروابط والإعدادات", en: "Links & settings" },
  "nav.users": { ar: "المستخدمون", en: "Users" },
  "common.save": { ar: "حفظ", en: "Save" },
  "common.saved": { ar: "تم الحفظ ✓", en: "Saved ✓" },
  "common.add": { ar: "إضافة", en: "Add" },
  "common.delete": { ar: "حذف", en: "Delete" },
  "common.cancel": { ar: "إلغاء", en: "Cancel" },
  "common.search": { ar: "بحث…", en: "Search…" },
  "common.loading": { ar: "جاري التحميل…", en: "Loading…" },
  "common.logout": { ar: "تسجيل الخروج", en: "Sign out" },
  "common.viewSite": { ar: "عرض الموقع", en: "View site" },
  "dash.title": { ar: "نظرة عامة", en: "Overview" },
  "dash.newRequests": { ar: "طلبات جديدة", en: "New requests" },
  "dash.totalRequests": { ar: "إجمالي الطلبات", en: "Total requests" },
  "dash.waitingChats": { ar: "محادثات بالانتظار", en: "Waiting chats" },
  "dash.activeChats": { ar: "محادثات نشطة", en: "Active chats" },
  "dash.languages": { ar: "لغات الموقع", en: "Site languages" },
  "dash.chatToggle": { ar: "استقبال المحادثات", en: "Accepting chats" },
  "dash.chatOn": { ar: "مفعّل — الزوار يشوفون «متوفرون الآن»", en: "On — visitors see “we are online”" },
  "dash.chatOff": { ar: "متوقف — الزوار يشوفون «لسنا متوفرين»", en: "Off — visitors see “not available”" },
  "dash.recentRequests": { ar: "أحدث الطلبات", en: "Latest requests" },
  "dash.noRequests": { ar: "لا توجد طلبات بعد", en: "No requests yet" },
  "content.title": { ar: "إدارة المحتوى", en: "Content management" },
  "content.hint": {
    ar: "عدّل أي نص في الموقع لأي لغة. النص الإنجليزي يظهر كمرجع.",
    en: "Edit any site text in any language. The English text is shown as a reference.",
  },
  "content.addKey": { ar: "مفتاح جديد", en: "New key" },
  "content.keyPlaceholder": { ar: "مثال: hero.title", en: "e.g. hero.title" },
  "content.ref": { ar: "المرجع (إنجليزي)", en: "Reference (English)" },
  "lang.title": { ar: "لغات الموقع", en: "Site languages" },
  "lang.add": { ar: "إضافة لغة", en: "Add language" },
  "lang.code": { ar: "الرمز (مثل fr)", en: "Code (e.g. fr)" },
  "lang.nameEn": { ar: "الاسم بالإنجليزية", en: "Name in English" },
  "lang.nameNative": { ar: "الاسم بلغته الأصلية", en: "Native name" },
  "lang.dir": { ar: "الاتجاه", en: "Direction" },
  "lang.enabled": { ar: "مفعّلة", en: "Enabled" },
  "lang.order": { ar: "الترتيب", en: "Order" },
  "lang.addedHint": {
    ar: "أُنشئت اللغة مع نسخ فارغة من كل النصوص — ترجمها من صفحة المحتوى.",
    en: "Language created with empty copies of all texts — translate them in the Content page.",
  },
  "settings.title": { ar: "الروابط والإعدادات", en: "Links & settings" },
  "settings.whatsapp": { ar: "رقم الواتساب (بصيغة دولية بدون +)", en: "WhatsApp number (international, no +)" },
  "settings.social": { ar: "روابط التواصل الاجتماعي", en: "Social media links" },
  "settings.preview": { ar: "معاينة الرابط", en: "Link preview" },
  "chat.title": { ar: "المحادثات المباشرة", en: "Live chat" },
  "chat.waiting": { ar: "بالانتظار", en: "Waiting" },
  "chat.mine": { ar: "محادثاتي", en: "Mine" },
  "chat.closed": { ar: "مغلقة", en: "Closed" },
  "chat.pick": { ar: "استلام المحادثة", en: "Pick up" },
  "chat.close": { ar: "إنهاء", en: "Close" },
  "chat.translate": { ar: "ترجمة مباشرة", en: "Live translation" },
  "chat.original": { ar: "النص الأصلي", en: "Original" },
  "chat.empty": { ar: "لا توجد محادثات هنا", en: "No conversations here" },
  "chat.placeholder": { ar: "اكتب ردك… (يُترجم تلقائيًا للغة الزائر)", en: "Type your reply… (auto-translated to the visitor's language)" },
  "chat.selectHint": { ar: "اختر محادثة من القائمة", en: "Select a conversation from the list" },
  "chat.visitorLang": { ar: "لغة الزائر", en: "Visitor language" },
  "req.title": { ar: "طلبات المساعدة", en: "Help requests" },
  "req.status.new": { ar: "جديد", en: "New" },
  "req.status.in_progress": { ar: "قيد المعالجة", en: "In progress" },
  "req.status.closed": { ar: "مغلق", en: "Closed" },
  "req.empty": { ar: "لا توجد طلبات", en: "No requests" },
  "partners.title": { ar: "الشركاء", en: "Partners" },
  "partners.nameAr": { ar: "الاسم بالعربية", en: "Arabic name" },
  "partners.nameEn": { ar: "الاسم بالإنجليزية", en: "English name" },
  "partners.logo": { ar: "رابط الشعار", en: "Logo URL" },
  "partners.website": { ar: "الموقع الإلكتروني", en: "Website" },
  "partners.edit": { ar: "تعديل", en: "Edit" },
  "users.title": { ar: "المستخدمون والصلاحيات", en: "Users & roles" },
  "users.hint": {
    ar: "أي شخص يسجل دخوله بحساب Kimi يظهر هنا — غيّر صلاحيته إلى «موظف» ليستطيع الرد على المحادثات، أو «مدير» لكامل اللوحة.",
    en: "Anyone who signs in with Kimi appears here — set their role to “Agent” so they can answer chats, or “Admin” for full access.",
  },
  "users.role.user": { ar: "بدون صلاحية", en: "No access" },
  "users.role.agent": { ar: "موظف (شات)", en: "Agent (chat)" },
  "users.role.admin": { ar: "مدير", en: "Admin" },
  "users.you": { ar: "أنت", en: "You" },
  "noaccess.title": { ar: "لا تملك صلاحية الدخول", en: "No access" },
  "noaccess.text": {
    ar: "حسابك مسجل لكن بدون صلاحيات. اطلب من المدير الرئيسي ترقيتك إلى «موظف» أو «مدير».",
    en: "Your account is registered but has no permissions. Ask the super admin to promote you to Agent or Admin.",
  },
};

type CtxT = {
  al: AdminLang;
  setAl: (l: AdminLang) => void;
  at: (key: string) => string;
  adir: "rtl" | "ltr";
};

const AdminCtx = createContext<CtxT | null>(null);

export function AdminLangProvider({ children }: { children: ReactNode }) {
  const [al, setAl] = useState<AdminLang>(
    () => (localStorage.getItem("yr_admin_lang") as AdminLang) || "ar",
  );
  const value = useMemo<CtxT>(() => {
    const set = (l: AdminLang) => {
      localStorage.setItem("yr_admin_lang", l);
      setAl(l);
    };
    return {
      al,
      setAl: set,
      at: (key) => D[key]?.[al] ?? key,
      adir: al === "ar" ? "rtl" : "ltr",
    };
  }, [al]);
  return <AdminCtx.Provider value={value}>{children}</AdminCtx.Provider>;
}

export function useAdminT() {
  const ctx = useContext(AdminCtx);
  if (!ctx) throw new Error("useAdminT outside provider");
  return ctx;
}

export const TOPIC_LABELS: Record<string, { ar: string; en: string }> = {
  salary: { ar: "راتب متأخر", en: "Late salary" },
  contract: { ar: "مشكلة عقد", en: "Contract" },
  abuse: { ar: "معاملة سيئة", en: "Bad treatment" },
  eosb: { ar: "نهاية الخدمة", en: "End of service" },
  rights: { ar: "استفسار حقوق", en: "Rights info" },
  other: { ar: "أخرى", en: "Other" },
};
