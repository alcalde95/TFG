-- DropForeignKey
ALTER TABLE `sessions_client` DROP FOREIGN KEY `Sessions_Client_data_time_UUID_Class_fkey`;

-- AddForeignKey
ALTER TABLE `Sessions_Client` ADD CONSTRAINT `Sessions_Client_data_time_UUID_Class_fkey` FOREIGN KEY (`data_time`, `UUID_Class`) REFERENCES `Sessions`(`data_time`, `UUID_Class`) ON DELETE RESTRICT ON UPDATE CASCADE;
