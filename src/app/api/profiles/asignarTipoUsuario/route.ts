import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request) {
    const userId = await currentProfile();

    if(!userId) { 
        return new NextResponse("Unathorized", {status: 401});
    }

    try{
        const res = await request.json();
        const { tipoUsuario } = res;

        console.log(res);

        if(tipoUsuario == "MECANICO") {
            console.log("MECANICO")
            const tipoUsuario = await db.mechanic.create({
                data:{
                    profileId: userId.id
                }
            });

            return NextResponse.json({ tipoUsuario });
        }
        else{
            const tipoUsuario = await db.client.create({
                data:{
                    profileId: userId.id
                }
            });

            return NextResponse.json({ tipoUsuario });
        }
      


    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }

  
  }