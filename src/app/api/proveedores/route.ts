import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request
) {
  try{ 
       
    if (req.method === 'GET') {
      const proveedor = await db.proveedor.findMany();
      return NextResponse.json(proveedor);
  
    }
    
    return new NextResponse("Invalid Method", {status: 405});
    

  }catch (error) {
    // En caso de error, se retorna una respuesta con un código de error del servidor
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", {status:500});
  }
  
}

export async function POST(
  req:Request
){
  const { Nombre, Foto, Empresa, Ubicacion, RFC } = await req.json();

  try{
    const post = await db.proveedor.create({
      data: {
            Nombre,
            Foto,
            Empresa,
            Ubicacion,
            RFC,
      },
    });
  
    return NextResponse.json(post);
  }
  catch (error) {
    // En caso de error, se retorna una respuesta con un código de error del servidor
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", {status:500});
  }

}

export async function PUT(
  req: Request
) {
  const { id, Nombre, Foto, Empresa, Ubicacion, RFC } = await req.json();

  try{
    const post = await db.proveedor.update({
      where: { id: id },
      data: {
            Nombre,
            Foto,
            Empresa,
            Ubicacion,
            RFC,
      },
    });
  
    return NextResponse.json(post);
  }
  catch (error) {
    // En caso de error, se retorna una respuesta con un código de error del servidor
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", {status:500});
  }
}


export async function DELETE(
  req: Request
) {
  const { id } = await req.json();

  try{
    const post = await db.proveedor.delete({
      where: { id: id }
    });
  
    return NextResponse.json(post);
  }
  catch (error) {
    // En caso de error, se retorna una respuesta con un código de error del servidor
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", {status:500});
  }
}