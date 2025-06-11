import { Option, Status } from "@/types/Task";

export const STATUS: Status = {
    notStarted: {
        name: '未着手',
        class: 'task-status-not-started'
    },
    doing: {
        name: '着手中',
        class: 'task-status-doing'
    },
    done: {
        name: '完了',
        class: 'task-status-done'
    },
}

export const PRIORITY: Option[] = [
    {
        value: 'high',
        label: '高'
    },
    {
        value: 'middle',
        label: '中'
    },
    {
        value: 'low',
        label: '低'
    },
]