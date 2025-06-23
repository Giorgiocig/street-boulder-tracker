-- DropForeignKey
ALTER TABLE "boulders" DROP CONSTRAINT "boulders_userId_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_boulderId_fkey";

-- AddForeignKey
ALTER TABLE "boulders" ADD CONSTRAINT "boulders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_boulderId_fkey" FOREIGN KEY ("boulderId") REFERENCES "boulders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
