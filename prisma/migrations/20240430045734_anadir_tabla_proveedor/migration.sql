/*
  Warnings:

  - You are about to drop the column `establecimientoID` on the `Product` table. All the data in the column will be lost.
  - Added the required column `cantidad` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_establecimientoID_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "establecimientoID",
ADD COLUMN     "cantidad" INTEGER NOT NULL,
ADD COLUMN     "usuarioAdminID" TEXT;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" TEXT NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Foto" TEXT NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_profileId_key" ON "Admin"("profileId");

-- CreateIndex
CREATE INDEX "Product_usuarioAdminID_idx" ON "Product"("usuarioAdminID");
