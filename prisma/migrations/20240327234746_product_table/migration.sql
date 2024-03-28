-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
