import { DragEvent, useContext, useEffect, useRef } from "react";
import { DataStoreContext } from "@/context/DataStoreContext";
import { Task } from "@/types/Task";
import { URL } from "@/constansts/api";
import {
  CONTEXT_FETCH_START,
  CONTEXT_FETCH_END,
  CONTEXT_NOT_STARTED_TASKS,
  CONTEXT_DOING_TASKS,
  CONTEXT_DONE_TASKS,
} from "@/constansts/context";
import {
  STATUS_NOT_STARTED,
  STATUS_DOING,
  STATUS_DONE,
} from "@/constansts/task";

export const useTaskFieldList = () => {
  // グローバルstate
  const { state, dispatch } = useContext(DataStoreContext);
  // Drag中のタスク(レンダリングを抑えるためにuseRefで状態管理)
  const draggingTaskRef = useRef<{ task: Task; fromStatus: string } | null>(
    null,
  );

  // Drag開始時
  const onDragStart = (task: Task, fromStatus: string): void => {
    draggingTaskRef.current = { task, fromStatus };
  };

  // Drop時
  const onDrop = (toStatus: string): void => {
    const dragging = draggingTaskRef.current;
    // 対象がない場合return
    if (!dragging) return;

    const { task, fromStatus } = dragging;
    // 同じ場所ならreturn
    if (fromStatus === toStatus) return;

    // タスク更新
    patchTask(task, fromStatus, toStatus);

    draggingTaskRef.current = null;
  };

  const allowDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  // タスク更新
  const patchTask = async (
    task: Task,
    fromStatus: string,
    toStatus: string,
  ) => {
    try {
      dispatch({ type: CONTEXT_FETCH_START });

      // タスク更新API呼び出し
      const res = await fetch(URL.task + "/" + task.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: toStatus,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const removeFromTask = (list: Task[]) =>
        list.filter((t) => t.id !== data.id);
      const addToTask = (list: Task[]) => [...list, data];

      // Drag元のタスク一覧を更新
      switch (fromStatus) {
        case STATUS_NOT_STARTED:
          dispatch({
            type: CONTEXT_NOT_STARTED_TASKS,
            data: removeFromTask(state.notStartedTasks),
          });
          break;
        case STATUS_DOING:
          dispatch({
            type: CONTEXT_DOING_TASKS,
            data: removeFromTask(state.doingTasks),
          });
          break;
        case STATUS_DONE:
          dispatch({
            type: CONTEXT_DONE_TASKS,
            data: removeFromTask(state.doneTasks),
          });
          break;
        default:
          break;
      }

      // Drag先のタスク一覧を更新
      switch (toStatus) {
        case STATUS_NOT_STARTED:
          dispatch({
            type: CONTEXT_NOT_STARTED_TASKS,
            data: addToTask(state.notStartedTasks),
          });
          break;
        case STATUS_DOING:
          dispatch({
            type: CONTEXT_DOING_TASKS,
            data: addToTask(state.doingTasks),
          });
          break;
        case STATUS_DONE:
          dispatch({
            type: CONTEXT_DONE_TASKS,
            data: addToTask(state.doneTasks),
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      dispatch({ type: CONTEXT_FETCH_END });
    }
  };

  useEffect(() => {
    // タスク一覧取得
    const getTasks = async () => {
      try {
        dispatch({ type: CONTEXT_FETCH_START });

        // タスク一覧取得API呼び出し
        const res = await fetch(URL.task);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.tasks) {
          dispatch({
            type: CONTEXT_NOT_STARTED_TASKS,
            data: data.tasks.filter((task: Task) => {
              return task.status === STATUS_NOT_STARTED;
            }),
          });
          dispatch({
            type: CONTEXT_DOING_TASKS,
            data: data.tasks.filter((task: Task) => {
              return task.status === STATUS_DOING;
            }),
          });
          dispatch({
            type: CONTEXT_DONE_TASKS,
            data: data.tasks.filter((task: Task) => {
              return task.status === STATUS_DONE;
            }),
          });
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        dispatch({ type: CONTEXT_FETCH_END });
      }
    };
    getTasks();
  }, [dispatch]);

  return {
    notStartedTasks: state.notStartedTasks,
    doingTasks: state.doingTasks,
    doneTasks: state.doneTasks,
    isLoading: state.isLoading,
    onDragStart,
    onDrop,
    allowDrop,
  };
};
