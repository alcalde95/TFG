-- CreateTable
CREATE TABLE `User` (
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `email` VARCHAR(191) NOT NULL,
    `UUID_Client` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Client_email_key`(`email`),
    UNIQUE INDEX `Client_UUID_Client_key`(`UUID_Client`),
    PRIMARY KEY (`email`, `UUID_Client`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructor` (
    `email` VARCHAR(191) NOT NULL,
    `UUID_Instructor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Instructor_email_key`(`email`),
    UNIQUE INDEX `Instructor_UUID_Instructor_key`(`UUID_Instructor`),
    PRIMARY KEY (`email`, `UUID_Instructor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `UUID_Class` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Photo` LONGBLOB NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Max_Capacity` INTEGER NOT NULL,
    `Duration` DATETIME(3) NOT NULL,
    `instructorID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Class_instructorID_key`(`instructorID`),
    PRIMARY KEY (`UUID_Class`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `UUID_Session` VARCHAR(191) NOT NULL,
    `DATA_TIME` DATETIME(3) NOT NULL,
    `classId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Session_classId_key`(`classId`),
    PRIMARY KEY (`UUID_Session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session_Client` (
    `UUID_Client` VARCHAR(191) NOT NULL,
    `UUID_Session` VARCHAR(191) NOT NULL,
    `Attend` BOOLEAN NOT NULL,
    `Justified` BOOLEAN NOT NULL,

    PRIMARY KEY (`UUID_Client`, `UUID_Session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Instructor` ADD CONSTRAINT `Instructor_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_instructorID_fkey` FOREIGN KEY (`instructorID`) REFERENCES `Instructor`(`UUID_Instructor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`UUID_Class`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session_Client` ADD CONSTRAINT `Session_Client_UUID_Client_fkey` FOREIGN KEY (`UUID_Client`) REFERENCES `Client`(`UUID_Client`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session_Client` ADD CONSTRAINT `Session_Client_UUID_Session_fkey` FOREIGN KEY (`UUID_Session`) REFERENCES `Session`(`UUID_Session`) ON DELETE RESTRICT ON UPDATE CASCADE;
