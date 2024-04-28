import { currentUser } from "@clerk/nextjs";
import { type TypeUser } from "@/types/types";

import {db} from "@/lib/db";

export const checkTypeOfUser = async (id: string): Promise<TypeUser | null> => {
    

    // Checamos si el usuario tiene un perfil registrado
    const profile = await db.profile.findUnique({
        where: {
            userId: id
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
        });

        const adminProfile = await db.admin.findUnique({
            where: {
                profileId: profile.id
            }
        });

        if(adminProfile){
            return "ADMIN";
        }

        if(mechanicProfile) {       
            return "MECANICO";
        }

        if(clientProfile) {
            return "CLIENTE";
        }

        return null;
    }

    return null;
}