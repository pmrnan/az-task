import { PrismaClient } from "@/generated/prisma/index.js";
import { NextResponse } from 'next/server'

const prisma = new PrismaClient();

export const connect = async () => {
    try {
        // Prismaでデータベースに接続
        prisma.$connect();
    } catch (error) {
        return Error("DB接続失敗しました")
    }
}

// タスク一覧取得
export const GET = async (req: Request) => {
    try {
        await connect();
        const tasks = await prisma.task.findMany();
	
        return NextResponse.json({tasks},{ status: 200 })

    } catch (error) {
        return NextResponse.json({ messeage: "Error" },{ status: 500 })

    } finally {
        await prisma.$disconnect();
    }
}