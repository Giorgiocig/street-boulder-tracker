/*
  Warnings:

  - You are about to drop the `photos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_boulderId_fkey";

-- DropTable
DROP TABLE "photos";

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boulderId" INTEGER NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_boulderId_fkey" FOREIGN KEY ("boulderId") REFERENCES "boulders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
