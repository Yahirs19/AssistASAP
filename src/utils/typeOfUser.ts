import { currentUser } from "@clerk/nextjs";

import {db} from "@/lib/db";

export const checkTypeOfUser = async () => {
    const user = await currentUser();

    if(!user) {
        return;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    const mechanicProfile = await db.mechanic.findUnique({
        where: {
            profileId: profile?.id
        }
    });

    const clientProfile = await db.client.findUnique({
        where: {
            profileId: profile?.id
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