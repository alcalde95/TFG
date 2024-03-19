/*
  Warnings:

  - Added the required column `instructorEmail` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sessions` ADD COLUMN `instructorEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_instructorEmail_fkey` FOREIGN KEY (`instructorEmail`) REFERENCES `Instructors`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
