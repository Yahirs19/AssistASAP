import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { checkTypeOfUser } from "@/utils/checkTypeOfUser";

export async function typeOfUserAPI(req: Request){
    try{
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unathorized", {status:401});
        }

        const typeOfUser = await checkTypeOfUser(profile);

        // Evita que los usuarios que ya tengan un tipo asignado, entren a este endpoint
        if(typeOfUser) {
            return new NextResponse("User already have a type", {status: 400});
        }

        if(req.method === "POST")
        {
            // Haz uso del typeOfUser que esta en types.d.ts
            const {typeOfUser} = await req.json();

            // Se crea perfil de un cliente
            if(typeOfUser === "CLIENTE") {
                const clientProfile = await db.client.create({
                    data: {
                        profileId: profile.id
                    }
                });
    
                return NextResponse.json(clientProfile);
            }

            // Se crea perfil de un mecanico
            if(typeOfUser === "MECANICO"){
                const mechanicProfile = await db.mechanic.create({
                    data: {
                        profileId: profile.id
                    }
                });

                return NextResponse.json(mechanicProfile);
            }

            return new NextResponse("Invalid Input", {status: 400});

        }

        return new NextResponse("Invalid Method", {status: 405});

    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}