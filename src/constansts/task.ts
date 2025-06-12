import { Option } from "@/types/Form";
import { PriorityIcons, FieldsStatus } from "@/types/Task";

// ステータス(Prismaのenumと統一)
export const STATUS_NOT_STARTED = 'NOT_STARTED';
export const STATUS_DOING = 'DOING';
export const STATUS_DONE = 'DONE';

// タスクフィールドのステータス
export const FIELDS_STATUS: FieldsStatus = {
    notStarted: {
        key: STATUS_NOT_STARTED,
        statusName: '未着手',
        badgeClass: 'task-status-badge-not-started'
    },
    doing: {
        key: STATUS_DOING,
        statusName: '着手中',
        badgeClass: 'task-status-badge-doing'
    },
    done: {
        key: STATUS_DONE,
        statusName: '完了',
        badgeClass: 'task-status-badge-done'
    },
}

// 優先度(Prismaのenumと統一)
export const PRIORITY_HIGH = 'HIGH';
export const PRIORITY_MIDDLE = 'MIDDLE';
export const PRIORITY_LOW = 'LOW';

// 優先度選択肢
export const PRIORITY_OPTION: Option[] = [
    {
        value: PRIORITY_HIGH,
        label: '高'
    },
    {
        value: PRIORITY_MIDDLE,
        label: '中'
    },
    {
        value: PRIORITY_LOW,
        label: '低'
    },
]

// 優先度アイコン
export const PRIORITY_ICONS: PriorityIcons = {
    high: {
        class: 'i-tabler-arrow-up task-priority-icon-high'
    },
    middle: {
        class: 'i-tabler-arrow-right task-priority-icon-middle'
    },
    low: {
        class: 'i-tabler-arrow-down task-priority-icon-low'
    },
    none: {
        class: ''
    },
}