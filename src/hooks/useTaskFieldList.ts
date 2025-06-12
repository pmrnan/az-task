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

        const removeFromTask = (list: Task[]) => list.filter(t => t.id !== task.id)
        const addToTask = (list: Task[]) => [...list, task]

        // Drag元のタスクを更新
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

        // Drag先のタスクを更新
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

        draggingTaskRef.current = null;
    }

    const allowDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    }

    useEffect(() => {
        // タスク一覧取得API呼び出し
        fetch(URL.task)
            .then((res) => res.json())
            .then((data) => {
                if(data.tasks) {
                    setNotStartedTasks(data.tasks.filter((task: Task) => {return task.status === STATUS_NOT_STARTED}))
                    setDoingTasks(data.tasks.filter((task: Task) => {return task.status === STATUS_DOING}))
                    setDoneTasks(data.tasks.filter((task: Task) => {return task.status === STATUS_DONE}))
                }
        })
        .catch((error) => {
            console.error("Failed to fetch tasks:", error);
        });
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