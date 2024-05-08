/*
  Warnings:

  - Added the required column `cate` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cate" TEXT NOT NULL;
