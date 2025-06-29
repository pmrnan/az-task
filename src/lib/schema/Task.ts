import { z } from "zod";
import {
  PRIORITY_HIGH,
  PRIORITY_MIDDLE,
  PRIORITY_LOW,
} from "@/constansts/task";

// タスク名関連定数
const TITLE_MIN_LENGTH = 1;
const TITLE_MAX_LENGTH = 50;

// 優先度関連定数
const PriorityEnum = [PRIORITY_HIGH, PRIORITY_MIDDLE, PRIORITY_LOW] as const;

// バリデーション設定
export const addTaskInputSchema = z.object({
  title: z
    .string()
    .min(TITLE_MIN_LENGTH, { message: "タスク名は必須です" })
    .max(TITLE_MAX_LENGTH, {
      message: `タスク名は${TITLE_MAX_LENGTH}文字以内で入力してください`,
    }),
  priority: z
    .enum(PriorityEnum, { invalid_type_error: "優先度の値が不正です" })
    .nullable()
    .optional(),
  limitDate: z
    .date({ invalid_type_error: "有効な日付を選択してください" })
    .nullable()
    .optional(),
});
export type AddTaskInputSchema = z.infer<typeof addTaskInputSchema>;
