/*
  Warnings:

  - You are about to drop the column `benefit_id` on the `donate_item` table. All the data in the column will be lost.
  - You are about to drop the column `unit_id` on the `donate_item` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `donate_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `donate_item` DROP FOREIGN KEY `donate_item_unit_id_fkey`;

-- DropIndex
DROP INDEX `donate_item_benefit_id_fkey` ON `donate_item`;

-- AlterTable
ALTER TABLE `donate_item` DROP COLUMN `benefit_id`,
    DROP COLUMN `unit_id`,
    ADD COLUMN `item_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `donate_item` ADD CONSTRAINT `donate_item_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
