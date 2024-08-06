-- CreateTable
CREATE TABLE `beneficiary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `join_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `initial_visit_date` DATETIME(3) NULL,
    `days_between_visits` INTEGER NULL,
    `notes` TEXT NULL,
    `branch_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `identity_card` VARCHAR(191) NULL,
    `type` ENUM('BENEFICIARY', 'SPOUSE', 'CHILD') NULL,
    `birthday` DATETIME(3) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `income` DECIMAL(10, 2) NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `sponsorship_case_id` TINYINT NULL,
    `beneficiary_id` INTEGER NOT NULL,

    UNIQUE INDEX `person_identity_card_key`(`identity_card`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `benefit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `beneficiaries_count` INTEGER NOT NULL DEFAULT 0,
    `item_id` INTEGER NULL,
    `financial_sponsorship_name` VARCHAR(191) NULL,
    `financial_sponsorship_value` DECIMAL(10, 2) NULL,
    `financial_sponsorship_unit_id` INTEGER NULL,
    `financial_sponsorship_unit_size` ENUM('SM', 'LG') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beneficiary_benefit` (
    `beneficiary_id` INTEGER NOT NULL,
    `benefit_id` INTEGER NOT NULL,
    `item_unit_size` ENUM('SM', 'LG') NULL,
    `item_value` INTEGER NULL,

    PRIMARY KEY (`beneficiary_id`, `benefit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visit_benefit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visit_id` INTEGER NOT NULL,
    `benefit_id` INTEGER NOT NULL,
    `unit_label_and_unit` VARCHAR(191) NOT NULL,
    `unit_value` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `beneficiary_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `note` TEXT NULL,
    `branch_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `parent_category_id` INTEGER NULL,
    `branch_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `qty` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `branch_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `money_unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `en_code` VARCHAR(191) NOT NULL,
    `en_name` VARCHAR(191) NOT NULL,
    `ar_code` VARCHAR(191) NOT NULL,
    `ar_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_label` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `bg_unit_label` VARCHAR(191) NOT NULL,
    `bg_unit_abbr` VARCHAR(191) NOT NULL,
    `sm_unit_label` VARCHAR(191) NOT NULL,
    `sm_unit_abbr` VARCHAR(191) NOT NULL,
    `sm_to_bg_factor` INTEGER NOT NULL,

    UNIQUE INDEX `unit_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sponsorship_case` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `branch_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL,
    `logo_url` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `branch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `organization_id` INTEGER NOT NULL,
    `scheduled_visits` BOOLEAN NOT NULL DEFAULT false,
    `lang` ENUM('ar', 'en') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_suspended` BOOLEAN NOT NULL DEFAULT false,
    `lang` ENUM('ar', 'en') NOT NULL,
    `role_id` INTEGER NULL,
    `branches` JSON NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `donor` VARCHAR(191) NOT NULL,
    `donor_phone` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `branch_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donate_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit_id` INTEGER NOT NULL,
    `benefit_id` INTEGER NOT NULL,
    `donate_id` INTEGER NOT NULL,
    `unit_value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `type` ENUM('DONATE', 'EXPENSE') NOT NULL,
    `desc` VARCHAR(191) NULL,
    `branch_id` INTEGER NOT NULL,
    `donate_id` INTEGER NULL,
    `visit_benefit_id` INTEGER NULL,

    UNIQUE INDEX `transaction_donate_id_key`(`donate_id`),
    UNIQUE INDEX `transaction_visit_benefit_id_key`(`visit_benefit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `permissions` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `branch_id` INTEGER NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `beneficiary` ADD CONSTRAINT `beneficiary_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `person` ADD CONSTRAINT `person_sponsorship_case_id_fkey` FOREIGN KEY (`sponsorship_case_id`) REFERENCES `sponsorship_case`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `person` ADD CONSTRAINT `person_beneficiary_id_fkey` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `benefit` ADD CONSTRAINT `benefit_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiary_benefit` ADD CONSTRAINT `beneficiary_benefit_beneficiary_id_fkey` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiary_benefit` ADD CONSTRAINT `beneficiary_benefit_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visit_benefit` ADD CONSTRAINT `visit_benefit_visit_id_fkey` FOREIGN KEY (`visit_id`) REFERENCES `visit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visit_benefit` ADD CONSTRAINT `visit_benefit_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visit` ADD CONSTRAINT `visit_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_item` ADD CONSTRAINT `category_item_parent_category_id_fkey` FOREIGN KEY (`parent_category_id`) REFERENCES `category_item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_item` ADD CONSTRAINT `category_item_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sponsorship_case` ADD CONSTRAINT `sponsorship_case_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `branch` ADD CONSTRAINT `branch_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donate` ADD CONSTRAINT `donate_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donate_item` ADD CONSTRAINT `donate_item_benefit_id_fkey` FOREIGN KEY (`benefit_id`) REFERENCES `benefit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donate_item` ADD CONSTRAINT `donate_item_donate_id_fkey` FOREIGN KEY (`donate_id`) REFERENCES `donate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donate_item` ADD CONSTRAINT `donate_item_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_donate_id_fkey` FOREIGN KEY (`donate_id`) REFERENCES `donate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_visit_benefit_id_fkey` FOREIGN KEY (`visit_benefit_id`) REFERENCES `visit_benefit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
