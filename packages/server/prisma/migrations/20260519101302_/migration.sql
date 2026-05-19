/*
  Warnings:

  - Changed the type of `unit` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unitLabel" TEXT NOT NULL DEFAULT 'шт',
DROP COLUMN "unit",
ADD COLUMN     "unit" INTEGER NOT NULL;
