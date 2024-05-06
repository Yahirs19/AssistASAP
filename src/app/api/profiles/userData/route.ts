import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

export async function GET(){
    // try-catch, para el manejo de cualquier error del servidor    
    try{
        const user = await currentUser();

        if(user){

            // Obtenemos el perfil del usuario que mande a llamar el endpoint
            const profile = await db.profile.findMany({
                where: {
                    userId: user.id
                }
            });
    
            return NextResponse.json(profile);
        }else{
            return new NextResponse("Unathorized", {status:401});
        }

    }catch(error){
        // En caso de error, se retorna una respuesta con un código de error del servidor
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}