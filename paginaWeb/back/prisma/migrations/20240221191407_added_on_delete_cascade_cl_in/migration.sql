-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_instructorID_fkey`;

-- DropForeignKey
ALTER TABLE `instructors` DROP FOREIGN KEY `Instructors_email_fkey`;

-- AddForeignKey
ALTER TABLE `Instructors` ADD CONSTRAINT `Instructors_email_fkey` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_instructorID_fkey` FOREIGN KEY (`instructorID`) REFERENCES `Instructors`(`UUID_Instructor`) ON DELETE CASCADE ON UPDATE CASCADE;
