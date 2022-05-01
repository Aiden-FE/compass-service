/*
  Warnings:

  - You are about to drop the column `account` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `country_area_code` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `users_telephone_account_idx` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `account`,
    DROP COLUMN `country_area_code`,
    MODIFY `telephone` VARCHAR(64) NULL;

-- CreateIndex
CREATE INDEX `users_telephone_email_idx` ON `users`(`telephone`, `email`);
