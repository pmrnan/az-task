import { Priority, Status } from "@/generated/prisma/index.js";

export type Task = {
    id: number,
    userId: number,
    title: string,
    status: Status,
    limitDate: Date | null,
    priority: Priority | null
}

export type FieldsStatus = {
    notStarted: FieldStatusOption,
    doing: FieldStatusOption,
    done: FieldStatusOption,
}

export type FieldStatusOption = {
    key: string,
    statusName: string,
    badgeClass: string
}

export type PriorityIcons = {
    high: IconOption,
    middle: IconOption,
    low: IconOption,
    none: IconOption,
}

export type IconOption = {
    class: string
}