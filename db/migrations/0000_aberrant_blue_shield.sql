CREATE TABLE `chat_messages` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`sessionId` bigint unsigned NOT NULL,
	`sender` enum('visitor','agent','system') NOT NULL,
	`text` text NOT NULL,
	`lang` varchar(16) NOT NULL DEFAULT 'ar',
	`translatedText` text,
	`translatedLang` varchar(16),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_sessions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`visitorName` varchar(200) NOT NULL,
	`visitorLang` varchar(16) NOT NULL DEFAULT 'ar',
	`status` enum('waiting','active','closed') NOT NULL DEFAULT 'waiting',
	`agentId` bigint unsigned,
	`agentName` varchar(200) NOT NULL DEFAULT '',
	`agentLang` varchar(16) NOT NULL DEFAULT 'ar',
	`translateEnabled` boolean NOT NULL DEFAULT true,
	`lastMessageAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contents` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`contentKey` varchar(120) NOT NULL,
	`lang` varchar(16) NOT NULL,
	`value` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contents_id` PRIMARY KEY(`id`),
	CONSTRAINT `key_lang` UNIQUE(`contentKey`,`lang`)
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`code` varchar(16) NOT NULL,
	`nameEn` varchar(100) NOT NULL,
	`nameNative` varchar(100) NOT NULL,
	`dir` enum('rtl','ltr') NOT NULL DEFAULT 'ltr',
	`enabled` boolean NOT NULL DEFAULT true,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `languages_id` PRIMARY KEY(`id`),
	CONSTRAINT `languages_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nameAr` varchar(200) NOT NULL,
	`nameEn` varchar(200) NOT NULL DEFAULT '',
	`logoUrl` text,
	`websiteUrl` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`enabled` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `requests` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`phone` varchar(60) NOT NULL DEFAULT '',
	`lang` varchar(16) NOT NULL DEFAULT 'ar',
	`topic` varchar(60) NOT NULL DEFAULT 'other',
	`message` text NOT NULL,
	`status` enum('new','in_progress','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` varchar(100) NOT NULL,
	`value` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `settings_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`unionId` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`avatar` text,
	`role` enum('user','agent','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`lastSignInAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_unionId_unique` UNIQUE(`unionId`)
);
--> statement-breakpoint
CREATE INDEX `chat_msg_session_idx` ON `chat_messages` (`sessionId`);--> statement-breakpoint
CREATE INDEX `chat_status_idx` ON `chat_sessions` (`status`);--> statement-breakpoint
CREATE INDEX `req_status_idx` ON `requests` (`status`);