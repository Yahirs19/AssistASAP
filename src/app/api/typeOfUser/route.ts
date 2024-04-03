import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function typeOfUserAPI(req: Request){
    try{
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unathorized", {status:401});
        }

        if(req.method === "POST")
        {
            // Haz uso del typeOfUser que esta en types.d.ts
            const {typeOfUser} = await req.json();

            if(typeOfUser === "CLIENTE") {
                const clientProfile = await db.client.create({
                    data: {
                        profileId: profile.id
                    }
                });
    
                return NextResponse.json(clientProfile);
            }

            if(typeOfUser === "MECANICO"){
                const mechanicProfile = await db.mechanic.create({
                    data: {
                        profileId: profile.id
                    }
                });

                return NextResponse.json(mechanicProfile);
            }

            return new NextResponse("Invalid Input", {status: 400})

        }

        return new NextResponse("Invalid Method", {status: 405})

    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}