/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `RolePermission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permissionAction` on the `RolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `RolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `branchKey` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `arName` on the `money_unit` table. All the data in the column will be lost.
  - You are about to drop the column `enName` on the `money_unit` table. All the data in the column will be lost.
  - You are about to drop the column `symbolAr` on the `money_unit` table. All the data in the column will be lost.
  - You are about to drop the column `symbolEn` on the `money_unit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,role_id,organization_id,branch_key]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permission_action` to the `RolePermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `RolePermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `UserRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `UserRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ar_name` to the `money_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `en_name` to the `money_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol_ar` to the `money_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol_en` to the `money_unit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_organizationId_fkey`;

-- DropForeignKey
ALTER TABLE `RolePermission` DROP FOREIGN KEY `RolePermission_permissionAction_fkey`;

-- DropForeignKey
ALTER TABLE `RolePermission` DROP FOREIGN KEY `RolePermission_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_branchId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_organizationId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_userId_fkey`;

-- DropIndex
DROP INDEX `UserRole_userId_roleId_organizationId_branchKey_key` ON `UserRole`;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `organizationId`,
    ADD COLUMN `organization_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `RolePermission` DROP PRIMARY KEY,
    DROP COLUMN `permissionAction`,
    DROP COLUMN `roleId`,
    ADD COLUMN `permission_action` VARCHAR(191) NOT NULL,
    ADD COLUMN `role_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`role_id`, `permission_action`);

-- AlterTable
ALTER TABLE `UserRole` DROP COLUMN `branchId`,
    DROP COLUMN `branchKey`,
    DROP COLUMN `organizationId`,
    DROP COLUMN `roleId`,
    DROP COLUMN `userId`,
    ADD COLUMN `branch_id` INTEGER NULL,
    ADD COLUMN `branch_key` INTEGER NOT NULL DEFAULT -1,
    ADD COLUMN `organization_id` INTEGER NOT NULL,
    ADD COLUMN `role_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `money_unit` DROP COLUMN `arName`,
    DROP COLUMN `enName`,
    DROP COLUMN `symbolAr`,
    DROP COLUMN `symbolEn`,
    ADD COLUMN `ar_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `en_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `symbol_ar` VARCHAR(191) NOT NULL,
    ADD COLUMN `symbol_en` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserRole_user_id_role_id_organization_id_branch_key_key` ON `UserRole`(`user_id`, `role_id`, `organization_id`, `branch_key`);

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_permission_action_fkey` FOREIGN KEY (`permission_action`) REFERENCES `Permission`(`action`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
