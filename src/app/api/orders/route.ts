import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { checkTypeOfUser } from "@/utils/checkTypeOfUser";

export async function ordersAPI(req: Request){
    // try-catch, para el manejo de cualquier error del servidor    
    try{
        // Obtenemos el perfil del usuario que mande a llamar el endpoint
        const profile = await currentProfile();

        // Si no hay un perfil de un usuario autenticado, se retorna un error de "Unathorized"
        if(!profile){
            return new NextResponse("Unathorized", {status: 401});
        }

        const typeOfUser = await checkTypeOfUser(profile);

        if(!typeOfUser) {
            return new NextResponse("User does not have a type", {status: 400});
        }

        // Solo los clientes pueden pueden hacer pedidos
        if(typeOfUser === "CLIENTE") {

            if(req.method === "POST")
            {
                /* 
                Estas variables que se reciben, no son las oficiales, solo es para dar una 
                idea como pueden funcionar los endpoints
                */
                const { ordenData, producto, servicio, cantidad, servicios, productos, tipo} = await req.json();
    
                // En caso de que se cree una orden de servicio, a partir de que se elija uno o más servicios primero
                if(servicios && !productos) {
                    const newOrderWithService = await db.ordenServicio.create({
                        data:{
                            servicios: {
                                createMany:{
                                    data: servicios, // En este caso, servicios deberia ser un arreglo de objetos de productos                                   
                                }
                            },
                            cliente: {
                                connect: {
                                    profileId: profile.id
                                }
                            },
                            tipo: tipo           
                        }
                    });
    
                    return NextResponse.json(newOrderWithService);
                }
    
                // En caso de que se cree una orden de servicio, a partir de que se elija uno o más productos primero
                if(productos && !servicios){
                    const newOrderWithProduct = await db.ordenServicio.create({
                        data: {
                            productos: {
                                createMany: {
                                    data: productos // En este caso, productos deberia ser un arreglo de objetos de productos
                            }
                            },
                            cliente: {
                                connect: {
                                    profileId: profile.id
                                }
                            },
                            tipo:tipo
                        }
                    });
    
                    return NextResponse.json(newOrderWithProduct);
                }

                // En caso de que se cree una orden de servicio, a partir de la seleccion de servicios y productos
                if(productos && servicios){
                    const newOrderWithProduct = await db.ordenServicio.create({
                        data: {
                            productos: {
                                createMany: {
                                    data: productos // En este caso, productos deberia ser un arreglo de objetos de productos
                            }
                            },
                            servicios: {
                                createMany: {
                                    data: servicios
                                }
                            },
                            cliente: {
                                connect: {
                                    profileId: profile.id
                                }
                            },
                            tipo: tipo
                        }
                    });
    
                    return NextResponse.json(newOrderWithProduct);
                }

                // Agregar un producto a una orden de existente
                if(!ordenData && producto){
                    const newProductInOrder = await db.productosEnOrdenes.create({
                        data: {
                            productoID: producto.id,
                            ordenServicioID: ordenData.id,
                            cantidad: cantidad
                        }
                    });

                    return NextResponse.json(newProductInOrder);
                }

                // Agregar un servicio a una orden de servicio existente
                if(!ordenData && servicio){
                    const newServiceInOrder = await db.serviciosEnOrdenes.create({
                        data: {
                            servicioID: servicio.id,
                            ordenServicioID: ordenData.id,
                        }
                    });

                    return NextResponse.json(newServiceInOrder);
                }
    
                // // Crear una orden de servicio vacía, a la espera de que el usuario elija los servicios y productos que quiera
                // const newOrder = await db.ordenServicio.create({
                //     data: {
                //         cliente: {
                //             connect: {
                //                 profileId: profile.id
                //             }
                //         }
                //     }
                // });
    
                // return NextResponse.json(newOrder);
            }
    
            // Checa que el request que se recibio, fue de PUT
            if(req.method === "PUT")
            {
                /* 
                Estas variables que se reciben, no son las oficiales, solo es para dar una 
                idea como pueden funcionar los endpoints
                */
                const { data, producto, cantidad, ordenID } = await req.json();
    
                // Se pueden editar la cantidad de un producto en una orden de servicio
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
        }

        return new NextResponse("Invalid Input", {status: 400});

    }catch(error){
        // En caso de error, se retorna una respuesta con un código de error del servidor
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}