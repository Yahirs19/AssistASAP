import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
import {redirect} from 'next/navigation';

const prisma = new PrismaClient();

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

//import { currentProfile } from "@/lib/current-profile";
//import { db } from "@/lib/db";
//import { checkTypeOfUser } from "@/utils/checkTypeOfUser";
//import { NextResponse } from "next/server";
//
//export async function productsAPI(req: Request){
//    // try-catch, para el manejo de cualquier error del servidor
//    try{
//        // Obtenemos el perfil del usuario que mande a llamar el endpoint
//        const profile = await currentProfile();
//
//        // Si no hay un perfil de un usuario autenticado, se retorna un error de "Unathorized"
//        if(!profile){
//            return new NextResponse("Unathorized", {status:401});
//        }
//
//
//        const typeOfUser = await checkTypeOfUser(profile);
//
//        if(!typeOfUser) {
//            return new NextResponse("User does not have a type", {status: 400});
//        }
//
//        // Checa que el usuario que interactua con el endpoint es un mecanico
//        if(typeOfUser === "MECANICO") {
//
//            // Checa que el request que se recibio, fue de POST
//            if(req.method === "POST")
//            {
//                const {name, imageUrl, price, slug, description, establecimientoID} = await req.json();
//
//                const product = await db.product.create({
//                    data:{
//                        establecimientoID: establecimientoID,
//                        name,
//                        imageUrl,
//                        price,
//                        slug,
//                        description
//                    }
//                });
//                // Se retorna el objeto creado, para su manejo en el frontend
//                return NextResponse.json(product);
//
//            }
//
//            // Checa que el request que se recibio, fue de PUT
//            if(req.method === "PUT")
//            {
//                const { id } = await req.json();
//
//                const product = await db.product.update({
//                    where: {
//                        id: id
//                    },
//                    data: {
//
//                    }
//                });
//
//                // Se retorna el objeto creado, para su manejo en el frontend
//                return NextResponse.json(product);
//
//            }
//
//            // Checa que el request que se recibio, fue de DELETE
//            if(req.method === "DELETE") {
//                const { id } = await req.json();
//
//                const product = await db.product.delete({
//                    where:{
//                        id: id
//                    }
//                });
//
//                // Se retorna el objeto creado, para su manejo en el frontend
//                return NextResponse.json(product);
//            }
//
//            // Si no  se envió un tipo de Request válido, retorna un código de error
//            return new NextResponse("Invalid Method", {status: 405});
//        }
//
//        return new NextResponse("Invalid Input", {status: 400});
//
//    }catch (error) {
//        // En caso de error, se retorna una respuesta con un código de error del servidor
//        console.log("[SERVER_POST]", error);
//        return new NextResponse("Internal Error", {status:500});
//    }
//}
