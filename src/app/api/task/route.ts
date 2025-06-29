import { PrismaClient } from "@/generated/prisma/index.js";
import { NextResponse } from "next/server";
import { connect } from "@/lib/api/connect";
import { errorResponse } from "@/lib/api/error";

const prisma = new PrismaClient();

// タスク一覧取得
export const GET = async () => {
  try {
    await connect(prisma);
    const tasks = await prisma.task.findMany();

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error(error);
    return errorResponse(500);
  } finally {
    await prisma.$disconnect();
  }
};

// タスク追加
export const POST = async (req: Request) => {
  try {
    await connect(prisma);
    const { userId, title, priority, limitDate } = await req.json();

    // タスク名とユーザーIDは必須
    if (!title || !userId) {
      return errorResponse(400);
    }

    const createTask = await prisma.task.create({
      data: { userId, title, priority, limitDate },
    });
    return NextResponse.json(createTask);
  } catch (error) {
    console.error(error);
    return errorResponse(500);
  } finally {
    await prisma.$disconnect();
  }
};
