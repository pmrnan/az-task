import { DragEvent, useEffect, useRef, useState } from 'react';
import { URL } from "@/constansts/api"
import { Task } from "@/types/Task";
import { STATUS_NOT_STARTED, STATUS_DOING, STATUS_DONE } from '@/constansts/task'

export const useTaskFieldList = () => {
    // 未着手タスク
    const [notStartedTasks, setNotStartedTasks] = useState<Task[]>([]);
    // 着手中タスク
    const [doingTasks, setDoingTasks] = useState<Task[]>([]);
    // 完了タスク
    const [doneTasks, setDoneTasks] = useState<Task[]>([]);
    // Drag中のタスク(レンダリングを抑えるためにuseRefで状態管理)
    const draggingTaskRef = useRef<{task: Task; fromStatus: string} | null>(null);

    // Drag開始時
    const onDragStart = (task: Task, fromStatus: string): void => {
        draggingTaskRef.current = {task, fromStatus}
    }

    // Drop時
    const onDrop = (toStatus: string): void => {
        const dragging = draggingTaskRef.current;
        // 対象がない場合return
        if (!dragging) return;

        const {task, fromStatus} = dragging;
        // 同じ場所ならreturn
        if (fromStatus === toStatus) return;

        // タスク更新
        patchTask(task, fromStatus, toStatus);

        draggingTaskRef.current = null;
    }

    const allowDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    }

    // タスク一覧取得
    const getTasks = async() => {
        try {
            // タスク一覧取得API呼び出し
            const res = await fetch(URL.task);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            if(data.tasks) {
                setNotStartedTasks(data.tasks.filter((task: Task) => {return task.status === STATUS_NOT_STARTED}));
                setDoingTasks(data.tasks.filter((task: Task) => {return task.status === STATUS_DOING}));
                setDoneTasks(data.tasks.filter((task: Task) => {return task.status === STATUS_DONE}));
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    }

    // タスク更新
    const patchTask = async(task: Task, fromStatus: string, toStatus: string) => {
        try {
            // タスク更新API呼び出し
            const res = await fetch(
                URL.task + '/' + task.id,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: toStatus
                    })
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            const removeFromTask = (list: Task[]) => list.filter(t => t.id !== data.id)
            const addToTask = (list: Task[]) => [...list, data]

            // Drag元のタスク一覧を更新
            switch (fromStatus) {
                case STATUS_NOT_STARTED:
                    setNotStartedTasks(prev => removeFromTask(prev));
                    break;
                case STATUS_DOING:
                    setDoingTasks(prev => removeFromTask(prev));
                    break;
                case STATUS_DONE:
                    setDoneTasks(prev => removeFromTask(prev));
                    break;
                default:
                    break;
            }

            // Drag先のタスク一覧を更新
            switch (toStatus) {
                case STATUS_NOT_STARTED:
                    setNotStartedTasks(prev => addToTask(prev));
                    break;
                case STATUS_DOING:
                    setDoingTasks(prev => addToTask(prev));
                    break;
                case STATUS_DONE:
                    setDoneTasks(prev => addToTask(prev));
                    break;
                default:
                    break;
        }

        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    }

    useEffect(() => {
        // タスク一覧取得
        getTasks();
    }, []);

    return {
        notStartedTasks,
        doingTasks,
        doneTasks,
        onDragStart,
        onDrop,
        allowDrop
    };
};