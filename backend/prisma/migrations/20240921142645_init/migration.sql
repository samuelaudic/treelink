-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "deathDate" TIMESTAMP(3),
    "fatherId" INTEGER,
    "motherId" INTEGER,
    "spouseId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
