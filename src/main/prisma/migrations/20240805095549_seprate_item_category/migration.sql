/*
  Warnings:

  - You are about to drop the column `category_item_id` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `category_item` table. All the data in the column will be lost.
  - You are about to drop the column `unit_id` on the `category_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `category_item` DROP FOREIGN KEY `category_item_unit_id_fkey`;

-- AlterTable
ALTER TABLE `benefit` DROP COLUMN `category_item_id`,
    ADD COLUMN `item_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `category_item` DROP COLUMN `qty`,
    DROP COLUMN `unit_id`;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `qty` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `unit_id` INTEGER NULL,
    `branch_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `benefit` ADD CONSTRAINT `benefit_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
