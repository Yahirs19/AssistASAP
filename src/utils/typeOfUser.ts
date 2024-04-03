import { currentUser } from "@clerk/nextjs";

import {db} from "@/lib/db";

export const checkTypeOfUser = async () => {
    const user = await currentUser();

    // Si no hay un usuario autenticado, no realiza la función
    if(!user) {
        return;
    }

    // Checamos si el usuario tiene un perfil registrado
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });


    if(profile){
        const mechanicProfile = await db.mechanic.findUnique({
            where: {
                profileId: profile.id
            }
        });

        const clientProfile = await db.client.findUnique({
            where: {
                profileId: profile.id
            }
        })

        if(mechanicProfile && !clientProfile) {       
            return true;
        }

        if(!mechanicProfile && clientProfile) {
            return true;
        }

        return false;
    }

    return false;
}