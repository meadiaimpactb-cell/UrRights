CREATE TABLE IF NOT EXISTS `page_sections` (
	`key` varchar(40) NOT NULL,
	`enabled` tinyint(1) NOT NULL DEFAULT 1,
	`sortOrder` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `blocks` (
	`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
	`section` varchar(40) NOT NULL,
	`itemKey` varchar(60) NOT NULL,
	`titleKey` varchar(120) NOT NULL,
	`descKey` varchar(120) DEFAULT NULL,
	`icon` varchar(40) NOT NULL DEFAULT 'dots',
	`tint` varchar(40) NOT NULL DEFAULT 'brand',
	`sortOrder` int NOT NULL DEFAULT 0,
	`enabled` tinyint(1) NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	UNIQUE KEY `blocks_section_item` (`section`,`itemKey`),
	KEY `blocks_section_idx` (`section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
