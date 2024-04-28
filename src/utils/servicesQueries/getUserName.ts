import { db } from "@/lib/db";


async function getUserName(id: string) {

    const userName = await db.profile.findUnique({
        where: {
            userId: id
        },
        select: {
            name: true
        }
    });

    return userName;
}

export default getUserName;