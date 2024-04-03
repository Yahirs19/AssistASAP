import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function productsAPI(req: Request){
    try{
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unathorized", {status:401});
        }

        if(req.method === "POST")
        {
            const {name, imageUrl, price, slug, description} = await req.json();

            const product = await db.product.create({
                data:{
                    mechanicId: profile.id,
                    name,
                    imageUrl,
                    price, 
                    slug,
                    description
                }
            });

            return NextResponse.json(product);

        }

        if(req.method === "PUT")
        {
            const { id } = await req.json();
            
            const product = await db.product.update({
                where: {
                    id: id
                },
                data: {
                    
                }
            });

            return NextResponse.json(product);

        }

        if(req.method === "DELETE") {
            const { id } = await req.json();

            const product = await db.product.delete({
                where:{
                    id: id
                }
            });

            return NextResponse.json(product);
        }

        return new NextResponse("Invalid Method", {status: 405})

    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}