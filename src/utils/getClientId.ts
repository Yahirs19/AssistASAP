import { db } from "@/lib/db";


export const getClientId = async (id: string) => {
    if(id){
        const clientId = await db.profile.findFirst({
            
            include: {
                client: true
        },
        where: {
            userId: id
        }
        })

        

        return clientId?.client?.id
    }

    return null;
}