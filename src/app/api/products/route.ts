import { NextResponse } from "next/server";
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

      const products = await db.product.findMany({
        select:{
          id:true,
          name:true,
          price:true,
          slug:true,
          imageUrl:true,
          provedor: {
            select: {
              Empresa: true
            }
          },
          categoria: {
            select: {
              nombre: true
            }
          }     
        }
      })
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
  const res = await request.json();
  const {
    name,
    description,
    price: priceString,
    imageUrl,
    cantidad: cantidadString,
    categoriaId,
    proveedorID,
  } = res;
  const slug = slugify(name, { lower: true });
  console.log("res", res);
  const price = parseFloat(priceString);
  const cantidad = parseInt(cantidadString);

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
      slug,
      cantidad,
      categoriaId,
      proveedorID,
      usuarioAdminID: "c32d8b45-92fe-44f6-8b61-42c2107dfe87",
      RegDate: new Date(),
      UpdatedDate: new Date(),
    },
  });

  redirect('/inventario')
  return NextResponse.json({ product });
}

