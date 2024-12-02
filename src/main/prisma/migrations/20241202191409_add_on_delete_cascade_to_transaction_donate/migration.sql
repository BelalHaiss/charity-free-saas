-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_donate_id_fkey`;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_donate_id_fkey` FOREIGN KEY (`donate_id`) REFERENCES `donate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
