CREATE TABLE `page_sections` (
	`key` varchar(40) NOT NULL,
	`enabled` boolean NOT NULL DEFAULT true,
	`sortOrder` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_sections_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `blocks` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`section` varchar(40) NOT NULL,
	`itemKey` varchar(60) NOT NULL,
	`titleKey` varchar(120) NOT NULL,
	`descKey` varchar(120),
	`icon` varchar(40) NOT NULL DEFAULT 'dots',
	`tint` varchar(40) NOT NULL DEFAULT 'brand',
	`sortOrder` int NOT NULL DEFAULT 0,
	`enabled` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blocks_id` PRIMARY KEY(`id`),
	CONSTRAINT `blocks_section_item` UNIQUE(`section`,`itemKey`)
);
--> statement-breakpoint
CREATE INDEX `blocks_section_idx` ON `blocks` (`section`);
