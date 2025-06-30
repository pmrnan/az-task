import { PrismaClient } from "@/generated/prisma/index.js";
import { NextResponse } from "next/server";
import { connect } from "@/lib/api/connect";
import { errorResponse } from "@/lib/api/error";

const prisma = new PrismaClient();

// タスク更新
export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await connect(prisma);
    const { status } = await req.json();
    const id = Number((await params).id);

    if (!status) {
      return errorResponse(400);
    }

    const updateTask = await prisma.task.update({
      where: { id },
      data: {
        status: status,
      },
    });
    return NextResponse.json(updateTask);
  } catch (error) {
    console.error(error);
    return errorResponse(500);
  } finally {
    await prisma.$disconnect();
  }
};

// タスク削除
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await connect(prisma);
    const id = Number((await params).id);

    const deleteTask = await prisma.task.delete({
      where: { id },
    });
    return NextResponse.json(deleteTask);
  } catch (error) {
    console.error(error);
    return errorResponse(500);
  } finally {
    await prisma.$disconnect();
  }
};
