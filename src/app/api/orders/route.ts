import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function ordersAPI(req: Request){
    // try-catch, para el manejo de cualquier error del servidor    
    try{
        // Obtenemos el perfil del usuario que mande a llamar el endpoint
        const profile = await currentProfile();

        // Si no hay un perfil de un usuario autenticado, se retorna un error de "Unathorized"
        if(!profile){
            return new NextResponse("Unathorized", {status: 401});
        }

        if(req.method === "POST")
        {
            /* 
            Estas variables que se reciben, no son las oficiales, solo es para dar una 
            idea como pueden funcionar los endpoints
            */
            const { data, servicio, producto, cantidad } = await req.json();

            // En caso de que se cree una orden de servicio, a partir de que se elija algún servicio primero
            if(servicio) {
                const newOrderWithService = await db.ordenServicio.create({
                    data:{
                        servicios: {
                            create:{
                                servicioID: servicio.id
                            }
                        }
                    }
                });

                return NextResponse.json(newOrderWithService);
            }

            // En caso de que se cree una orden de servicio, a partir de que se elija algún producto y se quiera pedir de inmediato 
            if(producto){
                const newOrderWithProduct = await db.ordenServicio.create({
                    data: {
                        productos: {
                            create: {
                                productoID: producto.id,
                                cantidad: cantidad
                            }
                        }
                    }
                });

                return NextResponse.json(newOrderWithProduct);
            }

            // Crear una orden de servicio vacía, a la espera de que el usuario elija los servicios y productos que quiera
            const newOrder = await db.ordenServicio.create({
                data: {

                }
            });

            return NextResponse.json(newOrder);
        }

        // Checa que el request que se recibio, fue de PUT
        if(req.method === "PUT")
        {
            /* 
            Estas variables que se reciben, no son las oficiales, solo es para dar una 
            idea como pueden funcionar los endpoints
            */
            const { data, producto, cantidad, ordenID } = await req.json();

            // Solo se pueden editar la cantidad de un producto en una orden de servicio
            if(producto){
                const newOrderWithProduct = await db.productosEnOrdenes.update({
                    where: {
                        IDAsignacion: {
                            ordenServicioID: ordenID,
                            productoID: producto.id
                        }
                    },
                    data: {
                        cantidad: cantidad
                    }
                });

                return NextResponse.json(newOrderWithProduct);
            }

            // Se retorna el objeto creado, para su manejo en el frontend
            return new NextResponse("Invalid Input", {status: 400});
        }

        // Checa que el request que se recibio, fue de DELETE
        if(req.method === "DELETE")
        {
            /* 
            Estas variables que se reciben, no son las oficiales, solo es para dar una 
            idea como pueden funcionar los endpoints
            */
            const { id, producto, servicio } = await req.json();

            // En caso de que se quiera quitar un producto en una orden de servicio
            if(producto){
                const deleteOrden = await db.productosEnOrdenes.delete({
                    where: {
                        IDAsignacion: {
                            productoID: producto.id,
                            ordenServicioID: id
                        }
                    }
                });

                // Se retorna el objeto creado, para su manejo en el frontend
                return NextResponse.json(deleteOrden);
            }

            // En caso de que se quiera quitar un servicio en una orden de servicio
            if(servicio){
                const deleteOrden = await db.serviciosEnOrdenes.delete({
                    where: {
                        IDAsignacion: {
                            servicioID: servicio.id,
                            ordenServicioID: id
                        }
                    }
                });

                // Se retorna el objeto creado, para su manejo en el frontend
                return NextResponse.json(deleteOrden);
            }

            // Para eliminar (cancelar) una orden de servicio
            const deleteOrden = await db.ordenServicio.delete({
                where: {
                    id: id
                }
            });

            // Se retorna el objeto creado, para su manejo en el frontend
            return NextResponse.json(deleteOrden);
        }

        return new NextResponse("Invalid Method", {status: 405});
    }catch(error){
        // En caso de error, se retorna una respuesta con un código de error del servidor
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}