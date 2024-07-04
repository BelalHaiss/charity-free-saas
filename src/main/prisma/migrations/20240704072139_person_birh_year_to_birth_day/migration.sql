/*
  Warnings:

  - You are about to drop the column `birth_yyyy` on the `person` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `person` DROP COLUMN `birth_yyyy`,
    ADD COLUMN `birthday` DATETIME(3) NOT NULL;
