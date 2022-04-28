/*
  Warnings:

  - You are about to drop the `Premission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Premission`;

-- CreateTable
CREATE TABLE `premissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(128) NOT NULL,
    `name` VARCHAR(24) NOT NULL,
    `owner_app` ENUM('COMMON') NOT NULL DEFAULT 'COMMON',
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `premissions_key_key`(`key`),
    INDEX `premissions_key_owner_app_idx`(`key`, `owner_app`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(24) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(64) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `account` VARCHAR(64) NULL,
    `name` VARCHAR(255) NULL,
    `nickname` VARCHAR(24) NULL,
    `gender` ENUM('WOMEN', 'MEN', 'UNKOWN') NULL DEFAULT 'UNKOWN',
    `birthday` DATETIME(3) NULL,
    `email` VARCHAR(255) NULL,
    `enabled` BOOLEAN NULL DEFAULT true,
    `last_login_time` DATETIME(3) NULL,
    `country_area_code` VARCHAR(191) NULL DEFAULT '0086',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `users_telephone_account_idx`(`telephone`, `account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PremissionToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PremissionToRole_AB_unique`(`A`, `B`),
    INDEX `_PremissionToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PremissionToRole` ADD CONSTRAINT `_PremissionToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `premissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PremissionToRole` ADD CONSTRAINT `_PremissionToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
