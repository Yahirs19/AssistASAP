/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `DoublePrecision`.
  - Added the required column `UpdatedDate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "RegDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "UpdatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cantidad" INTEGER NOT NULL,
ADD COLUMN     "proveedorID" TEXT,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" TEXT NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Foto" TEXT NOT NULL,
    "Empresa" TEXT NOT NULL,
    "Ubicacion" TEXT NOT NULL,
    "RFC" TEXT NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_proveedorID_idx" ON "Product"("proveedorID");
