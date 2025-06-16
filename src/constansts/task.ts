import { Option } from "@/types/Form";
import { PriorityIcons, FieldsStatus } from "@/types/Task";

// ステータス(Prismaのenumと統一)
export const STATUS_NOT_STARTED = 'NOT_STARTED';
export const STATUS_DOING = 'DOING';
export const STATUS_DONE = 'DONE';

// ステータス名称取得
export const getStatusName = (status: string) => {
    switch (status) {
        case STATUS_NOT_STARTED:
            return '未着手';
        case STATUS_DOING:
            return '着手中';
        case STATUS_DONE:
            return '完了';
        default:
            return '';
    }
}

// タスクフィールドのステータス
export const FIELDS_STATUS: FieldsStatus = {
    notStarted: {
        key: STATUS_NOT_STARTED,
        statusName: getStatusName(STATUS_NOT_STARTED),
        badgeClass: 'task-status-badge-not-started'
    },
    doing: {
        key: STATUS_DOING,
        statusName: getStatusName(STATUS_DOING),
        badgeClass: 'task-status-badge-doing'
    },
    done: {
        key: STATUS_DONE,
        statusName: getStatusName(STATUS_DONE),
        badgeClass: 'task-status-badge-done'
    },
}

// 優先度(Prismaのenumと統一)
export const PRIORITY_HIGH = 'HIGH';
export const PRIORITY_MIDDLE = 'MIDDLE';
export const PRIORITY_LOW = 'LOW';

// 優先度名称取得
export const getPriorityName = (priority: string) => {
    switch (priority) {
        case PRIORITY_HIGH:
            return '高';
        case PRIORITY_MIDDLE:
            return '中';
        case PRIORITY_LOW:
            return '低';
        default:
            return '';
    }
}

// 優先度選択肢
export const PRIORITY_OPTION: Option[] = [
    {
        value: PRIORITY_HIGH,
        label: getPriorityName(PRIORITY_HIGH),
    },
    {
        value: PRIORITY_MIDDLE,
        label: getPriorityName(PRIORITY_MIDDLE),
    },
    {
        value: PRIORITY_LOW,
        label: getPriorityName(PRIORITY_LOW),
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