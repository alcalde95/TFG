-- CreateTable
CREATE TABLE `Users` (
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clients` (
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructors` (
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `UUID_Class` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Photo` LONGBLOB NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Max_Capacity` INTEGER NOT NULL,
    `Duration` DATETIME(3) NOT NULL,
    `instructorEmail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Class_instructorEmail_key`(`instructorEmail`),
    PRIMARY KEY (`UUID_Class`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sessions` (
    `data_time` DATETIME(3) NOT NULL,
    `UUID_Class` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sessions_data_time_key`(`data_time`),
    UNIQUE INDEX `Sessions_UUID_Class_key`(`UUID_Class`),
    PRIMARY KEY (`data_time`, `UUID_Class`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sessions_Client` (
    `client_Email` VARCHAR(191) NOT NULL,
    `data_time` DATETIME(3) NOT NULL,
    `UUID_Class` VARCHAR(191) NOT NULL,
    `Attend` BOOLEAN NOT NULL,
    `Justified` BOOLEAN NOT NULL,

    UNIQUE INDEX `Sessions_Client_data_time_key`(`data_time`),
    UNIQUE INDEX `Sessions_Client_UUID_Class_key`(`UUID_Class`),
    PRIMARY KEY (`client_Email`, `data_time`, `UUID_Class`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clients` ADD CONSTRAINT `Clients_email_fkey` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Instructors` ADD CONSTRAINT `Instructors_email_fkey` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_instructorEmail_fkey` FOREIGN KEY (`instructorEmail`) REFERENCES `Instructors`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_UUID_Class_fkey` FOREIGN KEY (`UUID_Class`) REFERENCES `Class`(`UUID_Class`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessions_Client` ADD CONSTRAINT `Sessions_Client_client_Email_fkey` FOREIGN KEY (`client_Email`) REFERENCES `Clients`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessions_Client` ADD CONSTRAINT `Sessions_Client_data_time_UUID_Class_fkey` FOREIGN KEY (`data_time`, `UUID_Class`) REFERENCES `Sessions`(`data_time`, `UUID_Class`) ON DELETE RESTRICT ON UPDATE CASCADE;
