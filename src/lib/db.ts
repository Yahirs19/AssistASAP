import { PrismaClient } from "@prisma/client";

// Esto es un queryBuilder de Prisma

declare global {
    var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()


if(process.env.NODE_ENV !== "production") globalThis.prisma = db