/*
  Warnings:

  - Made the column `usuarioAdminID` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "proveedorID" TEXT,
ALTER COLUMN "usuarioAdminID" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Product_proveedorID_idx" ON "Product"("proveedorID");
