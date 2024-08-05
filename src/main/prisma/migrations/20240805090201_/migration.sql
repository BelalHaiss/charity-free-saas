/*
  Warnings:

  - You are about to drop the column `item_qty` on the `benefit` table. All the data in the column will be lost.
  - Added the required column `qty` to the `category_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `benefit` DROP COLUMN `item_qty`;

-- AlterTable
ALTER TABLE `category_item` ADD COLUMN `qty` INTEGER NOT NULL;
