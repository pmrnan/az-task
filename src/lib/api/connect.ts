import { PrismaClient } from "@/generated/prisma/index.js";

export const connect = async (prisma: PrismaClient) => {
    try {
        // Prismaでデータベースに接続
        prisma.$connect();
    } catch (error) {
        return Error('DB接続に失敗しました。')
    }
}