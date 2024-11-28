-- DropForeignKey
ALTER TABLE `donate_item` DROP FOREIGN KEY `donate_item_donate_id_fkey`;

-- AddForeignKey
ALTER TABLE `donate_item` ADD CONSTRAINT `donate_item_donate_id_fkey` FOREIGN KEY (`donate_id`) REFERENCES `donate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
