-- DropIndex
DROP INDEX `Sessions_data_time_key` ON `sessions`;

-- DropIndex
DROP INDEX `Sessions_Client_UUID_Class_key` ON `sessions_client`;

-- DropIndex
DROP INDEX `Sessions_Client_data_time_key` ON `sessions_client`;

-- AlterTable
ALTER TABLE `sessions_client` MODIFY `attend` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `justified` BOOLEAN NOT NULL DEFAULT false;
