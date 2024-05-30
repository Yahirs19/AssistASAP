import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";


export async function GET(
  request: NextRequest
) {
  try{ 
    
    const idOrden = request.nextUrl.searchParams.get('idOrden');

    if(idOrden){
        const idsDeProductos = await db.productosEnOrdenes.findMany({
            select: {
                productoID: true
            },
            where: {
                ordenServicioID: idOrden
            }
        });

        let productos: string[] = [];

        idsDeProductos.map((elemento) => productos.push(elemento.productoID));

        const products = await db.product.findMany({
            include: {
                categoria: true,
                provedor: true
            },
            where: {
                id: {
                    notIn: productos
                }
    
            }
        })
        return NextResponse.json(products);
    }
  
    return new NextResponse("Invalid Input", {status: 400});
        

  }catch (error) {
    // En caso de error, se retorna una respuesta con un código de error del servidor
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", {status:500});
  }
  
}

export async function POST(request: Request) {
  try{

      const {
          idProducto,
          idOrden,
          cantidad
          } = await request.json();
  
  
      const post = await db.productosEnOrdenes.create({
          data: {
            productoID: idProducto,
            ordenServicioID: idOrden,
            cantidad: cantidad
          },
        });
  
      return NextResponse.json(post);
  }catch (error) {
      // En caso de error, se retorna una respuesta con un código de error del servidor
      console.log("[SERVER_POST]", error);
      return new NextResponse("Internal Error", {status:500});
  }
}