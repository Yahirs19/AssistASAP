/*
  Warnings:

  - You are about to drop the column `cate` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cate",
ADD COLUMN     "categoriaId" TEXT,
ADD COLUMN     "inventarioId" TEXT;

-- CreateTable
CREATE TABLE "Inventario" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_categoriaId_idx" ON "Product"("categoriaId");

-- CreateIndex
CREATE INDEX "Product_inventarioId_idx" ON "Product"("inventarioId");
