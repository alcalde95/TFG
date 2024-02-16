/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instructor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session_client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_instructorID_fkey`;

-- DropForeignKey
ALTER TABLE `client` DROP FOREIGN KEY `Client_email_fkey`;

-- DropForeignKey
ALTER TABLE `instructor` DROP FOREIGN KEY `Instructor_email_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_classId_fkey`;

-- DropForeignKey
ALTER TABLE `session_client` DROP FOREIGN KEY `Session_Client_UUID_Client_fkey`;

-- DropForeignKey
ALTER TABLE `session_client` DROP FOREIGN KEY `Session_Client_UUID_Session_fkey`;

-- DropTable
DROP TABLE `client`;

-- DropTable
DROP TABLE `instructor`;

-- DropTable
DROP TABLE `session`;

-- DropTable
DROP TABLE `session_client`;

-- DropTable
DROP TABLE `user`;

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
    `UUID_Client` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Clients_email_key`(`email`),
    UNIQUE INDEX `Clients_UUID_Client_key`(`UUID_Client`),
    PRIMARY KEY (`email`, `UUID_Client`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructors` (
    `email` VARCHAR(191) NOT NULL,
    `UUID_Instructor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Instructors_email_key`(`email`),
    UNIQUE INDEX `Instructors_UUID_Instructor_key`(`UUID_Instructor`),
    PRIMARY KEY (`email`, `UUID_Instructor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sessions` (
    `UUID_Session` VARCHAR(191) NOT NULL,
    `DATA_TIME` DATETIME(3) NOT NULL,
    `classId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sessions_classId_key`(`classId`),
    PRIMARY KEY (`UUID_Session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sessions_Client` (
    `UUID_Client` VARCHAR(191) NOT NULL,
    `UUID_Session` VARCHAR(191) NOT NULL,
    `Attend` BOOLEAN NOT NULL,
    `Justified` BOOLEAN NOT NULL,

    PRIMARY KEY (`UUID_Client`, `UUID_Session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clients` ADD CONSTRAINT `Clients_email_fkey` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Instructors` ADD CONSTRAINT `Instructors_email_fkey` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_instructorID_fkey` FOREIGN KEY (`instructorID`) REFERENCES `Instructors`(`UUID_Instructor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`UUID_Class`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessions_Client` ADD CONSTRAINT `Sessions_Client_UUID_Client_fkey` FOREIGN KEY (`UUID_Client`) REFERENCES `Clients`(`UUID_Client`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sessions_Client` ADD CONSTRAINT `Sessions_Client_UUID_Session_fkey` FOREIGN KEY (`UUID_Session`) REFERENCES `Sessions`(`UUID_Session`) ON DELETE RESTRICT ON UPDATE CASCADE;
