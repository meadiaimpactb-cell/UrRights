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
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "agent", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
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
