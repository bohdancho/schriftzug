CREATE TABLE `pack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `word` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`value` text(256) NOT NULL,
	`pack_id` integer,
	FOREIGN KEY (`pack_id`) REFERENCES `pack`(`id`) ON UPDATE no action ON DELETE cascade
);
