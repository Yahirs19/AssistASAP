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

        if(clientId) {
            return clientId?.client?.id
        }

        const mecanicoId = await db.profile.findFirst({
            
            include: {
                mechanic: true
        },
        where: {
            userId: id
        }
        })


        if(mecanicoId) {
            return mecanicoId?.mechanic?.id
        }

        

    }

    return null;
}