import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
import {redirect} from 'next/navigation';
import { db } from "@/lib/db";


const prisma = new PrismaClient();

export async function GET(
  req: Request
) {
  try{ 
       
    if (req.method === 'GET') {

      const products = await db.product.findMany()
      return NextResponse.json(products);
  
    }
    
    return new NextResponse("Invalid Method", {status: 405});
    

  }catch (error) {
    // En caso de error, se retorna una respuesta con un código de error del servidor
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", {status:500});
  }
  
}

export async function POST(request: Request) {
    try{

        const {
            id,
            name,
            imageUrl,
            price,
            slug,
            description,
            usuarioAdminID,
            proveedorID,
            cantidad,
            categoriaId,
            } = await request.json();
    
        const parsedPrice = parseFloat(price);
        const intcantid = parseInt(cantidad);
    
        const post = await db.product.create({
            data: {
              name,
              imageUrl,
              price: parsedPrice,
              cantidad: intcantid,
              slug,
              description,
              categoriaId,
              usuarioAdminID,
              proveedorID,
            },
          });
    
        return NextResponse.json(post);
    }catch (error) {
        // En caso de error, se retorna una respuesta con un código de error del servidor
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function PUT(request: Request) {
    try{
        const {
            id,
            name,
            imageUrl,
            price,
            slug,
            description,
            usuarioAdminID,
            proveedorID,
            cantidad,
            categoriaId,
            } = await request.json();
    
        const parsedPrice = parseFloat(price);
        const intcantid = parseInt(cantidad);
    
        const post = await db.product.update({
            where: { id: id },
            data: {
              name,
              imageUrl,
              price: parsedPrice,
              cantidad: intcantid,
              slug,
              description,
              categoriaId,
              usuarioAdminID,
              proveedorID,
            },
          });
    
        return NextResponse.json(post);
    }catch (error) {
        // En caso de error, se retorna una respuesta con un código de error del servidor
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }

}

export async function DELETE(request: NextRequest) {
    try{
        const id = request.nextUrl.searchParams.get('id');

        if(id){
          const post = await db.product.delete({
              where: { id: id },
            });
  
          return NextResponse.json(post);
        }

        return new NextResponse("Invalid Input", {status: 400});
    }
    catch (error) {
        // En caso de error, se retorna una respuesta con un código de error del servidor
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}