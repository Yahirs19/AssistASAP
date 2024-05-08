import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function buscarProductoSlug(slug: string) {
  const productoEncontrado = await prisma.product.findFirst({
    where: {
      slug: slug,
    },
  });

  console.log("producto:", productoEncontrado);

  return productoEncontrado;
}

export async function mostrarProducto() {
  return await prisma.product.findMany();
}
