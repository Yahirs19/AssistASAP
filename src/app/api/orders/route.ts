import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

import { getClientId } from "@/utils/getClientId";

export async function GET(request: Request){
  try{
    const user = await currentProfile();

    if(user){
      const clientID = await getClientId(user.userId);
      console.log(clientID)
      if(clientID){
        const post = await db.ordenServicio.findMany({
            select:{
              id: true,
              fecha: true,
              estado: true,
              total: true,
              tipo: true,
              cliente: {
                select:{
                  profile: {
                    select:{
                      name:true,
                      apellidoP: true,
                      apellidoM: true,
                      email: true,
                      telephone: true
                    }
                  }
                },
              },
              mecanico: {
                select:{
                  profile: {
                    select: {
                      name:true,
                      apellidoP: true,
                      apellidoM: true,
                      email: true,
                      telephone: true
                    }
                  }
                }
              },
              productos: {
                select: {
                  cantidad: true,
                  producto: {
                    select: {
                      name: true,
                      imageUrl: true,
                      price: true,
                      description: true,
                      slug: true,
                      provedor:{
                        select: {
                          Empresa: true,
                          Foto: true
                        }
                      },
                      categoria: {
                        select: {
                          nombre: true
                        }
                      }
                    }
                  }
                }
              }
            },
            where: { 
              clienteID: clientID
            }
          });
          return NextResponse.json(post);
      }

    }

    return new NextResponse("Unathorized", {status: 401});
  }
  catch (error) {
      // En caso de error, se retorna una respuesta con un código de error del servidor
      console.log("[SERVER_POST]", error);
      return new NextResponse("Internal Error", {status:500});
  }
}

export async function POST(request: Request) {
    const userId = await currentProfile();

    if(!userId) { 
        return new NextResponse("Unathorized", {status: 401});
    }

    try{
        const res = await request.json();
        const {
          total,
          tipo,
          productos,
          clienteId,
          mecanicoId
        } = res;

        if(!clienteId && !mecanicoId){
          const orden = await db.ordenServicio.create({
            data: {
              clienteID: userId.id,
              tipo,
              total,
              productos:{
                  createMany: {
                      data: productos
                  }
              }
            }
          });

          return NextResponse.json({ orden });
        }

        const orden = await db.ordenServicio.create({
          data: {
            clienteID: clienteId,
            tipo,
            total,
            mecanicoID: mecanicoId,
            productos:{
                createMany: {
                    data: productos
                }
            }
          }
        });

        return NextResponse.json({ orden });
      


    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }

  
  }