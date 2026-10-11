CREATE TABLE IF NOT EXISTS `audit_log` (
	`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
	`userId` bigint(20) unsigned DEFAULT NULL,
	`userName` varchar(255) NOT NULL DEFAULT '',
	`action` varchar(80) NOT NULL,
	`resource` varchar(80) NOT NULL DEFAULT '',
	`details` text DEFAULT NULL,
	`ip` varchar(60) NOT NULL DEFAULT '',
	`sensitive` tinyint(1) NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	KEY `audit_created_idx` (`createdAt`),
	KEY `audit_user_idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `role_permissions` (
	`role` varchar(20) NOT NULL,
	`area` varchar(40) NOT NULL,
	`allowed` tinyint(1) NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`role`,`area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
