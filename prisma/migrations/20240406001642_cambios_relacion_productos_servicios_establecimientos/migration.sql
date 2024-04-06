/*
  Warnings:

  - You are about to drop the column `mechanicId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `mechanicId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `imagenUrl` to the `Establecimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `establecimientoID` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_mechanicId_idx";

-- DropIndex
DROP INDEX "Service_mechanicId_idx";

-- AlterTable
ALTER TABLE "Establecimiento" ADD COLUMN     "imagenUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "mechanicId",
ADD COLUMN     "establecimientoID" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "mechanicId",
ADD COLUMN     "establecimientoID" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Product_establecimientoID_idx" ON "Product"("establecimientoID");

-- CreateIndex
CREATE INDEX "Service_establecimientoID_idx" ON "Service"("establecimientoID");
