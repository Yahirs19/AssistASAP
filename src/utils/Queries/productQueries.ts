import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function buscarProductoSlug(slug: string) {
  const productoEncontrado = await prisma.product.findFirst({
    where: {
      slug: slug,
    },
    include:{
      categoria: {
        select: {
          nombre: true
        }
      },
      provedor: {
        select: {
          Empresa: true
        }
      }
    }
  });

  console.log("producto:", productoEncontrado);

  return productoEncontrado;
}

export async function mostrarProducto() {
  return await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      slug: true,
      imageUrl: true,
      provedor: { 
        select: {
          Empresa: true
        }
      }
    }
  });
}


// Consultar proveedores
export async function mostrarCategorias() {
  return await prisma.categoria.findMany();
}

export async function filtrarProductos(nombre:string){
  return await prisma.product.findMany({
    select:{
      id: true,
      name: true,
      price: true,
      slug: true,
      imageUrl: true,
      provedor: { 
        select: {
          Empresa: true
        }
      }
    },
    where:{
      // OR: [
      //   {
      //     provedor:{
      //       Nombre:{
      //         startsWith: proveedor
      //       }
      //     }
      //   },
      //   {
      //     provedor:{
      //       Nombre: proveedor
      //     }
      //   }
      // ]
      name: nombre
    }
  })
}