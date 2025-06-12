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

// タスク更新
export const PATCH = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        await connect();
        const body = await req.json();
        const id = Number(params.id)

        const updateTask = await prisma.task.update({
            where: {id},
            data: { 
                status: body.status
            },
        })
        return NextResponse.json(updateTask)
    } catch (error) {
        return NextResponse.json({ messeage: "Error" }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}