/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `users_telephone_key` ON `users`(`telephone`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
