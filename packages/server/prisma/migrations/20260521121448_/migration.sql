/*
  Warnings:

  - Changed the type of `reason` on the `WriteOff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WriteOff" DROP COLUMN "reason",
ADD COLUMN     "reason" "WriteOffReason" NOT NULL;
