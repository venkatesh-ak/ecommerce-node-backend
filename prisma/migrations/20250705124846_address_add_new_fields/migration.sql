/*
  Warnings:

  - You are about to drop the column `lineOne` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `lineTwo` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `address` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressType` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `lineOne`,
    DROP COLUMN `lineTwo`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `addressType` VARCHAR(191) NOT NULL,
    ADD COLUMN `alternatePhone` VARCHAR(191) NULL,
    ADD COLUMN `landmark` VARCHAR(191) NULL,
    ADD COLUMN `locality` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    MODIFY `country` VARCHAR(191) NOT NULL DEFAULT 'India';
