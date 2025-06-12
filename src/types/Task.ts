import { Priority, Status } from "@/generated/prisma/index.js";

export type Task = {
    id: number,
    userId: number,
    title: string,
    status: Status,
    limitDate: Date | null,
    priority: Priority | null
}

export type StatusBudges = {
    notStarted: BudgeOption,
    doing: BudgeOption,
    done: BudgeOption,
}

export type BudgeOption = {
    key: string,
    name: string,
    class: string
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