/*
  Warnings:

  - The primary key for the `ProductosEnOrdenes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idAsignacion` on the `ProductosEnOrdenes` table. All the data in the column will be lost.
  - The primary key for the `ServiciosEnOrdenes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idAsignacion` on the `ServiciosEnOrdenes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductosEnOrdenes" DROP CONSTRAINT "ProductosEnOrdenes_pkey",
DROP COLUMN "idAsignacion",
ADD CONSTRAINT "ProductosEnOrdenes_pkey" PRIMARY KEY ("ordenServicioID", "productoID");

-- AlterTable
ALTER TABLE "ServiciosEnOrdenes" DROP CONSTRAINT "ServiciosEnOrdenes_pkey",
DROP COLUMN "idAsignacion",
ADD CONSTRAINT "ServiciosEnOrdenes_pkey" PRIMARY KEY ("ordenServicioID", "servicioID");
