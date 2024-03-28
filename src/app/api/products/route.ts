// Aquí se implementará el endpoint para añadir productos

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const {name, imageUrl, price} = await req.json();
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unathorized", {status:401});
        }

        const product = await db.product.create({
            data:{
                profileId: profile.id,
                name,
                imageUrl,
                price
            }
        });

        return NextResponse.json(product);
    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}