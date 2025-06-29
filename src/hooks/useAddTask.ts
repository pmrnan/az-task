import { useContext } from "react";
import { DataStoreContext } from "@/context/DataStoreContext";
import { URL } from "@/constansts/api";
import {
  CONTEXT_FETCH_START,
  CONTEXT_FETCH_END,
  CONTEXT_NOT_STARTED_TASKS,
} from "@/constansts/context";
import { Task } from "@/types/Task";
import { AddTaskInputSchema } from "@/lib/schema/Task";

export const useAddTask = () => {
  // グローバルstate
  const { state, dispatch } = useContext(DataStoreContext);

  // タスク追加
  const postTask = async (formData: AddTaskInputSchema) => {
    try {
      dispatch({ type: CONTEXT_FETCH_START });

      // タスク追加API呼び出し
      const res = await fetch(URL.task, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1, // todo: ログイン機能実装後更新
          title: formData.title,
          priority: formData.priority,
          limitDate: formData.limitDate,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const addTask = (list: Task[]) => [...list, data];

      // タスク一覧を更新
      dispatch({
        type: CONTEXT_NOT_STARTED_TASKS,
        data: addTask(state.notStartedTasks),
      });

    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      dispatch({ type: CONTEXT_FETCH_END });
    }
  };

  return {
    postTask,
  };
};
