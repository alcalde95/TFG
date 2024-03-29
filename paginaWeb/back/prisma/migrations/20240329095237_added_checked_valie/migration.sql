-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `Sessions_UUID_Class_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `Sessions_instructorEmail_fkey`;

-- DropForeignKey
ALTER TABLE `sessions_client` DROP FOREIGN KEY `Sessions_Client_client_Email_fkey`;

-- AlterTable
ALTER TABLE `clients` ADD COLUMN `validated` VARCHAR(191) NOT NULL DEFAULT 'NO';

-- AddForeignKey
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_instructorEmail_fkey` FOREIGN KEY (`instructorEmail`) REFERENCES `Instructors`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_UUID_Class_fkey` FOREIGN KEY (`UUID_Class`) REFERENCES `Class`(`UUID_Class`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessions_Client` ADD CONSTRAINT `Sessions_Client_client_Email_fkey` FOREIGN KEY (`client_Email`) REFERENCES `Clients`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
