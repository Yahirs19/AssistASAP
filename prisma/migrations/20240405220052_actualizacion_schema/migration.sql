/*
  Warnings:

  - You are about to drop the column `establecimientoID` on the `OrdenServicio` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OrdenServicio_establecimientoID_idx";

-- AlterTable
ALTER TABLE "OrdenServicio" DROP COLUMN "establecimientoID";

-- CreateTable
CREATE TABLE "MecanicoEnEstablecimento" (
    "mecanicoID" TEXT NOT NULL,
    "establecimientoID" TEXT NOT NULL,

    CONSTRAINT "MecanicoEnEstablecimento_pkey" PRIMARY KEY ("mecanicoID","establecimientoID")
);

-- CreateIndex
CREATE UNIQUE INDEX "MecanicoEnEstablecimento_mecanicoID_key" ON "MecanicoEnEstablecimento"("mecanicoID");

-- CreateIndex
CREATE INDEX "MecanicoEnEstablecimento_establecimientoID_idx" ON "MecanicoEnEstablecimento"("establecimientoID");
