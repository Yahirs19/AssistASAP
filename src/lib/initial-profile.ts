import { currentUser } from "@clerk/nextjs";

import {supabase} from "./supabaseClient";

import {db} from "@/lib/db"

export const initialProfile = async () => {
    // Obtenemos el usuario que tenga una sesión iniciada con el servicio Clerk
    const user = await currentUser()

    // Checamos si es que hay un usuario con la sesión iniciada, si no, vamos a la pantalla de Login
    if(!user){
        // No retorna nada si no hay un usuario
        return;
    }

    // console.log(user)

    // Si hay algún usuario con la sesión iniciada, vamos a recuperar su perfil de la base de datos
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    })

    // Si no es un usuario nuevo, y tiene un perfil, lo regresamos
    if(profile){
        return profile
    }

    // Si es un usuario sin perfil en la app, se lo vamos a crear
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName}`,
            apellidoP: `${user.lastName?.split(' ')[0]}`,
            apellidoM: `${user.lastName?.split(' ')[1]}`,
            telephone: user.phoneNumbers[0].phoneNumber,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })


    // Retornamos los datos del nuevo perfil del usuario
    return newProfile
}