/*
  Warnings:

  - Added the required column `label` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `label` VARCHAR(191) NOT NULL,
    MODIFY `desc` VARCHAR(191) NULL;
