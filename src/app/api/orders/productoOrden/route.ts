import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

import { getClientId } from "@/utils/getClientId";

export async function GET(request: Request){
  try{
    
  }
  catch (error) {
      // En caso de error, se retorna una respuesta con un código de error del servidor
      console.log("[SERVER_POST]", error);
      return new NextResponse("Internal Error", {status:500});
  }
}

export async function POST(request: Request) {
    try{
      

    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }

  
  }

export async function PUT(request: Request) {

    try{
        const {
            idProducto,
            idOrden,
            cantidad
            } = await request.json();

        console.log(idProducto)
    
        if(!cantidad || !idProducto || !idOrden){
            return new NextResponse("Invalid Input", {status: 400});
        }
    
        const producto = await db.productosEnOrdenes.update({
            where: {
                IDAsignacion: {
                    ordenServicioID: idOrden,
                    productoID: idProducto
                }
            },
            data: {
              cantidad: cantidad
            },
          });
    
        return NextResponse.json(producto);
      

    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
    
}

export async function DELETE(request: NextRequest) {
  try{
      const idOrden = request.nextUrl.searchParams.get('idOrden');
      const idProducto = request.nextUrl.searchParams.get('idProducto');

      console.log(idOrden, idProducto)

      if(idOrden && idProducto){
        const orden = await db.productosEnOrdenes.delete({
            where: {
                IDAsignacion: {
                    productoID: idProducto,
                    ordenServicioID: idOrden
                }
            },
          });

        return NextResponse.json(orden);
      }

      return new NextResponse("Invalid Input", {status: 400});
  }
  catch (error) {
      // En caso de error, se retorna una respuesta con un código de error del servidor
      console.log("[SERVER_POST]", error);
      return new NextResponse("Internal Error", {status:500});
  }
}