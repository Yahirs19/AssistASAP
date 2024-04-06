import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { checkTypeOfUser } from "@/utils/checkTypeOfUser";

export async function servicesAPI(req: Request){
    // try-catch, para el manejo de cualquier error del servidor
    try{
        // Obtenemos el perfil del usuario que mande a llamar el endpoint
        const profile = await currentProfile();

        // Si no hay un perfil de un usuario autenticado, se retorna un error de "Unathorized"
        if(!profile){
            return new NextResponse("Unathorized", {status:401});
        }

        const typeOfUser = await checkTypeOfUser(profile);

        if(!typeOfUser) {
            return new NextResponse("User does not have a type", {status: 400});
        }

        // Solo los mecanicos pueden pueden publicar y manipular servicios
        if(typeOfUser === "MECANICO") {

            // Checa que el request que se recibio, fue de POST
            if(req.method === "POST")
            {
                const {name, imageUrl, price, slug, description, tipo, establecimientoID} = await req.json();
    
                const service = await db.service.create({
                    data:{
                        establecimientoID: establecimientoID,
                        name,
                        imageUrl,
                        price, 
                        slug,
                        description,
                        tipo
                    }
                });
    
                // Se retorna el objeto creado, para su manejo en el frontend
                return NextResponse.json(service);
    
            }
    
            // Checa que el request que se recibio, fue de PUT
            if(req.method === "PUT")
            {
                const { id } = await req.json();
                
                const service = await db.service.update({
                    where: {
                        id: id
                    },
                    data: {
                        
                    }
                });
    
                // Se retorna el objeto creado, para su manejo en el frontend
                return NextResponse.json(service);
    
            }
            
            // Checa que el request que se recibio, fue de DELETE
            if(req.method === "DELETE") {
                const { id } = await req.json();
    
                const service = await db.service.delete({
                    where:{
                        id: id
                    }
                });
    
                // Se retorna el objeto creado, para su manejo en el frontend
                return NextResponse.json(service);
            }
    
            // Si no  se envió un tipo de Request válido, retorna un código de error
            return new NextResponse("Invalid Method", {status: 405});
        }

        return new NextResponse("Invalid Input", {status: 400});

    }catch (error) {
        // En caso de error, se retorna una respuesta con un código de error del servidor
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}