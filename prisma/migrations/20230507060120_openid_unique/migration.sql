/*
  Warnings:

  - A unique constraint covering the columns `[openid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `users_openid_key` ON `users`(`openid`);
