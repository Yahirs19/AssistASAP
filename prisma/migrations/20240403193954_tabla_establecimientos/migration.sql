/*
  Warnings:

  - Added the required column `clienteID` to the `OrdenServicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdenServicio" ADD COLUMN     "clienteID" TEXT NOT NULL,
ADD COLUMN     "mecanicoID" TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "mechanicId" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Establecimiento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "mecanicoID" TEXT,

    CONSTRAINT "Establecimiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Establecimiento_mecanicoID_idx" ON "Establecimiento"("mecanicoID");

-- CreateIndex
CREATE INDEX "OrdenServicio_clienteID_idx" ON "OrdenServicio"("clienteID");

-- CreateIndex
CREATE INDEX "OrdenServicio_mecanicoID_idx" ON "OrdenServicio"("mecanicoID");
