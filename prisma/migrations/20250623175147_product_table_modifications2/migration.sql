/*
  Warnings:

  - You are about to alter the column `rating` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(1,1)` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `rating` DECIMAL(2, 1) NOT NULL;
