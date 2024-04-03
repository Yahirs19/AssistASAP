/*
  Warnings:

  - You are about to drop the column `profileId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoOrdenServicio" AS ENUM ('PENDIENTE', 'EN_PROGRESO', 'COMPLETADO');

-- DropIndex
DROP INDEX "Product_profileId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "profileId",
ADD COLUMN     "mechanicId" TEXT NOT NULL DEFAULT 'TEST';

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "type";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mechanic" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Mechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" DECIMAL(8,2) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mechanicId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdenServicio" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoOrdenServicio" NOT NULL DEFAULT 'PENDIENTE',
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "OrdenServicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiciosEnOrdenes" (
    "idAsignacion" TEXT NOT NULL,
    "ordenServicioID" TEXT NOT NULL,
    "servicioID" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiciosEnOrdenes_pkey" PRIMARY KEY ("idAsignacion")
);

-- CreateTable
CREATE TABLE "ProductosEnOrdenes" (
    "idAsignacion" TEXT NOT NULL,
    "ordenServicioID" TEXT NOT NULL,
    "productoID" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "ProductosEnOrdenes_pkey" PRIMARY KEY ("idAsignacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_profileId_key" ON "Client"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_profileId_key" ON "Mechanic"("profileId");

-- CreateIndex
CREATE INDEX "Service_mechanicId_idx" ON "Service"("mechanicId");

-- CreateIndex
CREATE INDEX "ServiciosEnOrdenes_ordenServicioID_idx" ON "ServiciosEnOrdenes"("ordenServicioID");

-- CreateIndex
CREATE INDEX "ServiciosEnOrdenes_servicioID_idx" ON "ServiciosEnOrdenes"("servicioID");

-- CreateIndex
CREATE INDEX "ProductosEnOrdenes_ordenServicioID_idx" ON "ProductosEnOrdenes"("ordenServicioID");

-- CreateIndex
CREATE INDEX "ProductosEnOrdenes_productoID_idx" ON "ProductosEnOrdenes"("productoID");

-- CreateIndex
CREATE INDEX "Product_mechanicId_idx" ON "Product"("mechanicId");
