-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'M',
    "birthDate" TIMESTAMP(3),
    "deathDate" TIMESTAMP(3),
    "fatherId" INTEGER,
    "motherId" INTEGER,
    "spouseId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_spouseId_fkey" FOREIGN KEY ("spouseId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
