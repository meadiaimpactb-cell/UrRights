CREATE TABLE IF NOT EXISTS `chat_files` (
	`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
	`sessionId` bigint(20) unsigned NOT NULL,
	`token` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`mime` varchar(120) NOT NULL DEFAULT '',
	`size` int NOT NULL DEFAULT 0,
	`storedName` varchar(120) NOT NULL,
	`uploadedBy` enum('visitor','agent') NOT NULL DEFAULT 'visitor',
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	UNIQUE KEY `chat_files_token` (`token`),
	KEY `chat_files_session_idx` (`sessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--> statement-breakpoint
ALTER TABLE `chat_messages` ADD COLUMN `attachmentId` bigint(20) unsigned DEFAULT NULL;
