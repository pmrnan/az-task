import { HttpError } from "@/types/Api";

export const URL = {
  task: "/api/task",
};

export const HTTP_ERRORS: Record<number, HttpError> = {
  400: {
    message: "Bad Request - リクエストの内容が正しくありません。",
    status: 400,
  },
  401: {
    message: "Unauthorized - 認証が必要です。",
    status: 401,
  },
  403: {
    message: "Forbidden - アクセスが禁止されています。",
    status: 403,
  },
  404: {
    message: "Not Found - リソースが見つかりません。",
    status: 404,
  },
  500: {
    message: "Internal Server Error - サーバー内部でエラーが発生しました。",
    status: 500,
  },
};
