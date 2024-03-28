/*
  Warnings:

  - Added the required column `profileId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Product_profileId_idx" ON "Product"("profileId");
