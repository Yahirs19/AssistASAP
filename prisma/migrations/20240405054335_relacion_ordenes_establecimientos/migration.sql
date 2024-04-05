/*
  Warnings:

  - Made the column `mecanicoID` on table `Establecimiento` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tipo` to the `OrdenServicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoServicio" AS ENUM ('DOMICILIO', 'ESTABLECIMIENTO', 'AMBOS');

-- CreateEnum
CREATE TYPE "TipoOrdenServicio" AS ENUM ('DOMICILIO', 'ESTABLECIMIENTO');

-- AlterTable
ALTER TABLE "Establecimiento" ALTER COLUMN "mecanicoID" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrdenServicio" ADD COLUMN     "establecimientoID" TEXT,
ADD COLUMN     "tipo" "TipoOrdenServicio" NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "tipo" "TipoServicio" NOT NULL;

-- CreateIndex
CREATE INDEX "OrdenServicio_establecimientoID_idx" ON "OrdenServicio"("establecimientoID");
