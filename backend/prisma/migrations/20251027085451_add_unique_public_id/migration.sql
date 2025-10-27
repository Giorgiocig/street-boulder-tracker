/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "image_public_id_key" ON "image"("public_id");
