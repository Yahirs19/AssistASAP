/*
  Warnings:

  - You are about to drop the column `establecimientoID` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_establecimientoID_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "establecimientoID",
ADD COLUMN     "usuarioAdminID" TEXT;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_profileId_key" ON "Admin"("profileId");

-- CreateIndex
CREATE INDEX "Product_usuarioAdminID_idx" ON "Product"("usuarioAdminID");
