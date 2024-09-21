-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_spouseId_fkey" FOREIGN KEY ("spouseId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
