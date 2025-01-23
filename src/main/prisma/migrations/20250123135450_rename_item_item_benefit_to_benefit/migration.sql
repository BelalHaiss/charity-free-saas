-- DropForeignKey
ALTER TABLE `beneficiary_benefit` DROP FOREIGN KEY `beneficiary_benefit_benefit_id_fkey`;

-- DropForeignKey
ALTER TABLE `financial_benefit` DROP FOREIGN KEY `financial_benefit_benefit_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `item_benefit_id_fkey`;

-- AddForeignKey
ALTER TABLE `financial_benefit` ADD CONSTRAINT `financial_benefit_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiary_benefit` ADD CONSTRAINT `beneficiary_benefit_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
