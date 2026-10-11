CREATE TABLE IF NOT EXISTS `questions` (
	`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
	`topicKey` varchar(60) NOT NULL,
	`labelKey` varchar(120) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`enabled` tinyint(1) NOT NULL DEFAULT 1,
	`required` tinyint(1) NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	KEY `questions_topic_idx` (`topicKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `question_options` (
	`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
	`questionId` bigint(20) unsigned NOT NULL,
	`labelKey` varchar(120) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`enabled` tinyint(1) NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	KEY `qopt_question_idx` (`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--> statement-breakpoint
ALTER TABLE `requests` ADD COLUMN `area` varchar(200) NOT NULL DEFAULT '', ADD COLUMN `answers` text DEFAULT NULL;
