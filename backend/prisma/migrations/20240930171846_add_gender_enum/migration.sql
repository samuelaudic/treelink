/*
  Warnings:

  - Changed the type of `gender` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;
