/*
  Warnings:

  - Changed the type of `Duration` on the `class` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `class` DROP COLUMN `Duration`,
    ADD COLUMN `Duration` INTEGER NOT NULL;
