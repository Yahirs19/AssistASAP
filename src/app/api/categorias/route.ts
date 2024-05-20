import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request
) {
  try{ 
       
    if (req.method === 'GET') {
      const categorias = await db.categoria.findMany();
      return NextResponse.json(categorias);
  
    }
    
    return new NextResponse("Invalid Method", {status: 405});
    

  }catch (error) {
    // En caso de error, se retorna una respuesta con un código de error del servidor
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", {status:500});
  }
  
}

