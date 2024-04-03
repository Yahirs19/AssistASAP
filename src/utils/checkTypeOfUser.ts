import { type Profile } from "@prisma/client";

import { db } from "@/lib/db";

export const checkTypeOfUser = async (profile: Profile | null) => {
    // Comprueba que se haya enviado un perfil para revisar
    if(profile){    

        // Checa si el perfil ya esta asociado a alguna tabla de los tipos de usuario
        const isMechanic = await db.mechanic.findUnique({
            where: {
                profileId: profile.id
            }
        });

        const isClient = await db.client.findUnique({
            where: {
                profileId: profile.id
            }
        });

        // Si encontro coincidencias, las comprueba y si hay coincidencias, regresa al tipo que pertenece
        if(isMechanic && !isClient) {
            return "MECANICO";
        }

        if(!isMechanic && isClient){
            return "CLIENTE";
        }
        

        // Si el perfil del usuario no esta relacionado a ningun tipo, retorna nulo
        return null;
    }

    return null;
}