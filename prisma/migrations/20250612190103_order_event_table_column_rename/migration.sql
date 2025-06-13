/*
  Warnings:

  - You are about to drop the column `orderEventStatus` on the `order_events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order_events` DROP COLUMN `orderEventStatus`,
    ADD COLUMN `status` ENUM('PENDING', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
