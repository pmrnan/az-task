import { HTTP_ERRORS } from "@/constansts/api";
import { NextResponse } from "next/server";

export const errorResponse = (statusCode: number) => {
  const { message, status } = HTTP_ERRORS[statusCode] || {
    message: "予期しないエラーが発生しました。",
    status: 500,
  };

  return NextResponse.json({ message }, { status });
};
