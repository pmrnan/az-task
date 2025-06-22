import { useContext } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DataStoreContext } from "@/context/DataStoreContext";
import { URL } from "@/constansts/api"
import {
  CONTEXT_FETCH_START,
  CONTEXT_FETCH_END,
  CONTEXT_NOT_STARTED_TASKS,
} from "@/constansts/context";
import { PRIORITY_HIGH, PRIORITY_MIDDLE, PRIORITY_LOW } from "@/constansts/task"
import { Task } from "@/types/Task";

// タスク名関連定数
const TITLE_MIN_LENGTH = 1;
const TITLE_MAX_LENGTH = 50;

// 優先度関連定数
const PriorityEnum = [
  PRIORITY_HIGH,
  PRIORITY_MIDDLE,
  PRIORITY_LOW
] as const;

// バリデーション設定
const formSchema = z.object({
  title: z
    .string()
    .min(
      TITLE_MIN_LENGTH,
      { message: "必須です" }
    )
    .max(
      TITLE_MAX_LENGTH,
      { message: `${TITLE_MAX_LENGTH}文字以内で入力してください` }
    ),
  priority: z
    .enum(
      PriorityEnum,
      { invalid_type_error: "値が不正です" }
    )
    .nullable()
    .optional(),
  limitDate: z
    .date(
      { invalid_type_error: "有効な日付を選択してください" }
    )
    .nullable()
    .optional(),
});
type FormSchema = z.infer<typeof formSchema>

export const useAddTaskForm = () => {
  // グローバルstate
  const { state, dispatch } = useContext(DataStoreContext);

  // RHFの設定
  const form = useForm<FormSchema>({
    defaultValues: {
      title: "",
      priority: null,
      limitDate: null
    },
    mode: 'onSubmit',
    resolver: zodResolver(formSchema)
  })

  // Submit時
  const onSubmit = (formData: FormSchema) => {
    postTask(formData)
  }

  // タスク追加
  const postTask = async (formData: FormSchema) => {
    try {
      dispatch({ type: CONTEXT_FETCH_START });

      // タスク追加API呼び出し
      const res = await fetch(
        URL.task,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: 1, // todo: ログイン機能実装後更新
            title: formData.title,
            priority: formData.priority,
            limitDate: formData.limitDate
          })
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const addTask = (list: Task[]) => [...list, data]

      // タスク一覧を更新
      dispatch({ type: CONTEXT_NOT_STARTED_TASKS, data: addTask(state.notStartedTasks) });

      // Formをクリア
      form.reset();

    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      dispatch({ type: CONTEXT_FETCH_END });
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
