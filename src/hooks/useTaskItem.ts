import { useContext } from 'react';
import { IconOption } from "@/types/Task";
import { Priority } from "@/generated/prisma/index.js";
import { DataStoreContext } from "@/context/DataStoreContext";
import { URL } from "@/constansts/api";
import {
    CONTEXT_FETCH_START,
    CONTEXT_FETCH_END,
    CONTEXT_NOT_STARTED_TASKS,
    CONTEXT_DOING_TASKS,
    CONTEXT_DONE_TASKS,
} from "@/constansts/context";
import {
    PRIORITY_HIGH,
    PRIORITY_MIDDLE,
    PRIORITY_LOW,
    PRIORITY_ICONS,
    STATUS_NOT_STARTED,
    STATUS_DOING,
    STATUS_DONE,
} from '@/constansts/task';
import { Task } from "@/types/Task";

export const useTaskItem = () => {
    // グローバルstate
    const { state, dispatch } = useContext(DataStoreContext);

    // 優先度アイコン定義取得
    const getPriorityIconConst = (priority: Priority): IconOption => {
        switch (priority) {
            case PRIORITY_HIGH:
                return PRIORITY_ICONS.high
            case PRIORITY_MIDDLE:
                return PRIORITY_ICONS.middle
            case PRIORITY_LOW:
                return PRIORITY_ICONS.low
            default:
                return PRIORITY_ICONS.none
        }
    }

    // 削除確認ダイアログにて削除するボタン押下時
    const onDelete = (taskId: number, status: string) => {
        deleteTask(taskId, status)
    }

    // タスク削除
    const deleteTask = async(taskId: number, status: string) => {
        try {
            dispatch({ type: CONTEXT_FETCH_START });

            // タスク削除API呼び出し
            const res = await fetch(
                URL.task + '/' + taskId,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            const removeTask = (list: Task[]) => list.filter(t => t.id !== data.id)

            // タスク一覧を更新
            switch (status) {
                case STATUS_NOT_STARTED:
                    dispatch({ type: CONTEXT_NOT_STARTED_TASKS, data: removeTask(state.notStartedTasks) });
                    break;
                case STATUS_DOING:
                    dispatch({ type: CONTEXT_DOING_TASKS, data: removeTask(state.doingTasks) });
                    break;
                case STATUS_DONE:
                    dispatch({ type: CONTEXT_DONE_TASKS, data: removeTask(state.doneTasks) });
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        } finally {
            dispatch({ type: CONTEXT_FETCH_END });
        }
    }

    return {
        getPriorityIconConst,
        onDelete,
    };
};