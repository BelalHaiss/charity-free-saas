/*
  Warnings:

  - You are about to drop the column `financial_sponsorship_name` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `financial_sponsorship_unit_id` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `financial_sponsorship_unit_size` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `financial_sponsorship_value` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `benefit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[benefit_id]` on the table `item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `benefit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `benefit_id` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `benefit` DROP FOREIGN KEY `benefit_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `donate_item` DROP FOREIGN KEY `donate_item_benefit_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_unit_id_fkey`;

-- AlterTable
ALTER TABLE `benefit` DROP COLUMN `financial_sponsorship_name`,
    DROP COLUMN `financial_sponsorship_unit_id`,
    DROP COLUMN `financial_sponsorship_unit_size`,
    DROP COLUMN `financial_sponsorship_value`,
    DROP COLUMN `item_id`,
    ADD COLUMN `type` ENUM('FINANCIAL', 'ITEM') NOT NULL;

-- AlterTable
ALTER TABLE `item` ADD COLUMN `benefit_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `financial_benefit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `benefit_id` INTEGER NOT NULL,

    UNIQUE INDEX `financial_benefit_benefit_id_key`(`benefit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `item_benefit_id_key` ON `item`(`benefit_id`);

-- AddForeignKey
ALTER TABLE `financial_benefit` ADD CONSTRAINT `financial_benefit_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `money_unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_benefit` ADD CONSTRAINT `financial_benefit_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `money_unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
