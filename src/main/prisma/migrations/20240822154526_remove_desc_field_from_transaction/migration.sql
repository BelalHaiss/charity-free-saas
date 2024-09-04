/*
  Warnings:

  - You are about to drop the column `desc` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `desc`,
    MODIFY `label` VARCHAR(191) NULL;
