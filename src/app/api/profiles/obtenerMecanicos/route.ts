import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    try{
      // const user = await currentProfile();
  
      
        const clientes = await db.mechanic.findMany({
            include: {
                profile: true
            }
        });
  
        return NextResponse.json(clientes);
      
  
    }
    catch (error) {
        // En caso de error, se retorna una respuesta con un código de error del servidor
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
  }