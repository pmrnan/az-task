import { useEffect, useState } from 'react';
import { URL } from "@/constansts/api"
import { Task } from "@/types/Task";
import { STATUS_NOT_STARTED, STATUS_DOING, STATUS_DONE } from '@/constansts/task'

export const useTaskFieldList = () => {
    // 未着手タスク
    const [notStartedTasks, setNotStartedTasks] = useState<Task[] | undefined>(undefined);
    // 着手中タスク
    const [doingTasks, setDoingTasks] = useState<Task[] | undefined>(undefined);
    // 完了タスク
    const [doneTasks, setDoneTasks] = useState<Task[] | undefined>(undefined);

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
        doneTasks
    };
};