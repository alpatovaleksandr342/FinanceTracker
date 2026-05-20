/*
  Warnings:

  - Changed the type of `type` on the `CashTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "transactionsType" AS ENUM ('sale', 'expense', 'withdraw');

-- AlterTable
ALTER TABLE "CashTransaction" DROP COLUMN "type",
ADD COLUMN     "type" "transactionsType" NOT NULL;
