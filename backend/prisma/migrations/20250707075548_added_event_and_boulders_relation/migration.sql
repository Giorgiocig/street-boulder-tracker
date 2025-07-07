/*
  Warnings:

  - Added the required column `eventId` to the `boulders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boulders" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "events_name_key" ON "events"("name");

-- AddForeignKey
ALTER TABLE "boulders" ADD CONSTRAINT "boulders_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
