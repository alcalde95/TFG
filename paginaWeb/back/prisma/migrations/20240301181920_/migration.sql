-- DropForeignKey
ALTER TABLE `clients` DROP FOREIGN KEY `Clients_email_fkey`;

-- AddForeignKey
ALTER TABLE `Clients` ADD CONSTRAINT `Clients_email_fkey` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
