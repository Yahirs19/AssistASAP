-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "price" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);
