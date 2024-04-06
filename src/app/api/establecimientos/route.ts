import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { checkTypeOfUser } from "@/utils/checkTypeOfUser";
import { NextResponse } from "next/server";

// Endpoint para agregar o eliminar miembros de un establecimiento
export async function typeOfUserAPI(req: Request){
    try{
        // Checamos si hay un perfil de usuario
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unathorized", {status:401});
        }
        
        // Checamos el tipo de usuario que es el usuario
        const typeOfUser = await checkTypeOfUser(profile);

        if(!typeOfUser) {
            return new NextResponse("User does not have a type", {status: 400});
        }

        // Checamos que el que quiere insertar el establecimiento, sea un mecanico
        if(typeOfUser === "MECANICO")
        {

            if(req.method === "POST")
            {
                // Obtenemos los datos a insertar en la base de datos
                const {nombre, latitud, longitud, mecanicoID} = await req.json();         

                
                const establishment = await db.establecimiento.create({
                    data: {
                        nombre: nombre,
                        latitude: latitud,
                        longitude: longitud,
                        // Al crear el establecimiento, le asignamos el valor de la llave foranea del mecanico dueño del establecimiento
                        mecanico: {
                            connect: {
                                profileId: profile.id
                            }
                        },
                        mecanicos: {
                            create: {
                                mecanicoID: mecanicoID
                            }
                        }
                    }
                });

                return NextResponse.json(establishment);

            }

            if(req.method === "PUT") {
                // Obtenemos los datos a insertar en la base de datos
                const {nombre, latitud, longitud, id} = await req.json();         

                
                const establishment = await db.establecimiento.update({
                    where: {
                        id: id
                    },
                    data: {
                        
                    }
                });

                return NextResponse.json(establishment);
                
            }

            if(req.method === "DELETE")
            {
                // Obtenemos los datos a insertar en la base de datos
                const {nombre, latitud, longitud, id} = await req.json();         

                
                const establishment = await db.establecimiento.delete({
                    where: {
                        id: id
                    }
                });

                return NextResponse.json(establishment);
                

            }

            return new NextResponse("Invalid Method", {status: 405});
        }

        return new NextResponse("Invalid Input", {status: 400});

    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}