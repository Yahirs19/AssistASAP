import {db} from "@/lib/db";

export async function obtenerDetallesOrden(id:string) { 

    if(id){

        const orden = await db.ordenServicio.findUnique({
            include: {
                mecanico: {
                    include: {
                        profile: true
                    }
                },
                productos: {
                    include:{
                        producto: true
                    }
                },
                cliente:{
                    include:{
                        profile: true
                    }
                }
            },
            where: {
                id: id
            }
        });
    
        return orden;
    }

    return null;
}

export type Orden = Awaited<ReturnType<typeof obtenerDetallesOrden>>