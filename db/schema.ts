import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  boolean,
  int,
  uniqueIndex,
  index,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).unique(),
  passwordHash: varchar("passwordHash", { length: 255 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "agent", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
  /** الحساب موقوف: يظهر في اللوحة لكنه لا يستطيع تسجيل الدخول */
  suspended: boolean("suspended").default(false).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Languages available on the public site. Admins can add any language. */
export const languages = mysqlTable("languages", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 16 }).notNull().unique(), // ar, en, ur, hi, id, tl ...
  nameEn: varchar("nameEn", { length: 100 }).notNull(),
  nameNative: varchar("nameNative", { length: 100 }).notNull(),
  dir: mysqlEnum("dir", ["rtl", "ltr"]).default("ltr").notNull(),
  enabled: boolean("enabled").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Language = typeof languages.$inferSelect;

/** Key-value settings: whatsapp number, social links, chat availability ... */
export const settings = mysqlTable("settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value"),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
export type Setting = typeof settings.$inferSelect;

/** CMS content: a translatable text per (key, lang). */
export const contents = mysqlTable(
  "contents",
  {
    id: serial("id").primaryKey(),
    contentKey: varchar("contentKey", { length: 120 }).notNull(),
    lang: varchar("lang", { length: 16 }).notNull(),
    value: text("value").notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    keyLang: uniqueIndex("key_lang").on(t.contentKey, t.lang),
  }),
);
export type Content = typeof contents.$inferSelect;

/** Partner logos shown on the site. */
export const partners = mysqlTable("partners", {
  id: serial("id").primaryKey(),
  nameAr: varchar("nameAr", { length: 200 }).notNull(),
  nameEn: varchar("nameEn", { length: 200 }).default("").notNull(),
  logoUrl: text("logoUrl"),
  websiteUrl: text("websiteUrl"),
  sortOrder: int("sortOrder").default(0).notNull(),
  enabled: boolean("enabled").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Partner = typeof partners.$inferSelect;

/** Help requests sent by beneficiaries from the site form. */
export const requests = mysqlTable(
  "requests",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    phone: varchar("phone", { length: 60 }).default("").notNull(),
    lang: varchar("lang", { length: 16 }).default("ar").notNull(),
    topic: varchar("topic", { length: 60 }).default("other").notNull(),
    /** منطقة السكن والحي — مطلوبة في نموذج الطلب */
    area: varchar("area", { length: 200 }).default("").notNull(),
    /** إجابات الاستبيان وقت الإرسال (JSON) — نصوص محفوظة كما رآها الزائر */
    answers: text("answers"),
    message: text("message").notNull(),
    status: mysqlEnum("status", ["new", "in_progress", "closed"])
      .default("new")
      .notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({ statusIdx: index("req_status_idx").on(t.status) }),
);
export type Request = typeof requests.$inferSelect;

/** Live chat sessions between visitors and agents. */
export const chatSessions = mysqlTable(
  "chat_sessions",
  {
    id: serial("id").primaryKey(),
    visitorName: varchar("visitorName", { length: 200 }).notNull(),
    visitorLang: varchar("visitorLang", { length: 16 }).default("ar").notNull(),
    status: mysqlEnum("status", ["waiting", "active", "closed"])
      .default("waiting")
      .notNull(),
    agentId: bigint("agentId", { mode: "number", unsigned: true }),
    agentName: varchar("agentName", { length: 200 }).default("").notNull(),
    agentLang: varchar("agentLang", { length: 16 }).default("ar").notNull(),
    translateEnabled: boolean("translateEnabled").default(true).notNull(),
    lastMessageAt: timestamp("lastMessageAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({ statusIdx: index("chat_status_idx").on(t.status) }),
);
export type ChatSession = typeof chatSessions.$inferSelect;

export const chatMessages = mysqlTable(
  "chat_messages",
  {
    id: serial("id").primaryKey(),
    sessionId: bigint("sessionId", { mode: "number", unsigned: true }).notNull(),
    sender: mysqlEnum("sender", ["visitor", "agent", "system"]).notNull(),
    text: text("text").notNull(), // original text as typed
    lang: varchar("lang", { length: 16 }).default("ar").notNull(), // original lang
    translatedText: text("translatedText"), // translation for the other party
    translatedLang: varchar("translatedLang", { length: 16 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({ sessionIdx: index("chat_msg_session_idx").on(t.sessionId) }),
);
export type ChatMessage = typeof chatMessages.$inferSelect;

/* ------------------------------------------------------------------ */
/* أقسام الصفحة الرئيسية وعناصرها — يتحكّم بها المسؤول من اللوحة        */
/* ------------------------------------------------------------------ */

/** إظهار/إخفاء وترتيب أقسام الصفحة الرئيسية. */
export const pageSections = mysqlTable("page_sections", {
  key: varchar("key", { length: 40 }).primaryKey(),
  enabled: boolean("enabled").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type PageSection = typeof pageSections.$inferSelect;

/**
 * عناصر الأقسام المتكرّرة (المشكلات، الخدمات، لماذا تثق بنا، الخطوات…).
 * النصوص نفسها تبقى في جدول contents عبر titleKey و descKey،
 * فتبقى قابلة للترجمة لكل لغة كبقية نصوص الموقع.
 */
export const blocks = mysqlTable(
  "blocks",
  {
    id: serial("id").primaryKey(),
    section: varchar("section", { length: 40 }).notNull(),
    itemKey: varchar("itemKey", { length: 60 }).notNull(),
    titleKey: varchar("titleKey", { length: 120 }).notNull(),
    descKey: varchar("descKey", { length: 120 }),
    icon: varchar("icon", { length: 40 }).default("dots").notNull(),
    tint: varchar("tint", { length: 40 }).default("brand").notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
    enabled: boolean("enabled").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({
    sectionItem: uniqueIndex("blocks_section_item").on(t.section, t.itemKey),
    sectionIdx: index("blocks_section_idx").on(t.section),
  }),
);
export type Block = typeof blocks.$inferSelect;

/* ------------------------------------------------------------------ */
/* الاستبيانات: أسئلة لكل نوع مشكلة، يديرها المسؤول من اللوحة          */
/* ------------------------------------------------------------------ */

export const questions = mysqlTable(
  "questions",
  {
    id: serial("id").primaryKey(),
    /** يطابق blocks.itemKey للقسم "topic" */
    topicKey: varchar("topicKey", { length: 60 }).notNull(),
    /** مفتاح نص السؤال في جدول contents */
    labelKey: varchar("labelKey", { length: 120 }).notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
    enabled: boolean("enabled").default(true).notNull(),
    required: boolean("required").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({ topicIdx: index("questions_topic_idx").on(t.topicKey) }),
);
export type Question = typeof questions.$inferSelect;

export const questionOptions = mysqlTable(
  "question_options",
  {
    id: serial("id").primaryKey(),
    questionId: bigint("questionId", { mode: "number", unsigned: true }).notNull(),
    labelKey: varchar("labelKey", { length: 120 }).notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
    enabled: boolean("enabled").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({ questionIdx: index("qopt_question_idx").on(t.questionId) }),
);
export type QuestionOption = typeof questionOptions.$inferSelect;

/* ------------------------------------------------------------------ */
/* سجل التدقيق والصلاحيات                                              */
/* ------------------------------------------------------------------ */

/** من فعل ماذا ومتى. يُكتب تلقائيًا عند كل إجراء إداري مؤثّر. */
export const auditLog = mysqlTable(
  "audit_log",
  {
    id: serial("id").primaryKey(),
    userId: bigint("userId", { mode: "number", unsigned: true }),
    /** اسم المنفّذ وقت الحدث — يبقى صحيحًا حتى لو حُذف الحساب لاحقًا */
    userName: varchar("userName", { length: 255 }).default("").notNull(),
    action: varchar("action", { length: 80 }).notNull(),
    resource: varchar("resource", { length: 80 }).default("").notNull(),
    details: text("details"),
    ip: varchar("ip", { length: 60 }).default("").notNull(),
    /** أحداث حساسة: تغيير صلاحيات أو كلمات مرور أو حذف حسابات */
    sensitive: boolean("sensitive").default(false).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => ({
    createdIdx: index("audit_created_idx").on(t.createdAt),
    userIdx: index("audit_user_idx").on(t.userId),
  }),
);
export type AuditEntry = typeof auditLog.$inferSelect;

/** مصفوفة الصلاحيات: ما يملكه كل دور في كل قسم من اللوحة. */
export const rolePermissions = mysqlTable(
  "role_permissions",
  {
    role: varchar("role", { length: 20 }).notNull(),
    area: varchar("area", { length: 40 }).notNull(),
    allowed: boolean("allowed").default(false).notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.role, t.area] }) }),
);
export type RolePermission = typeof rolePermissions.$inferSelect;
