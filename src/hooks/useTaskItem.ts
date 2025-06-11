import { IconOption } from "@/types/Task";
import { Priority } from "@/generated/prisma/index.js";
import { PRIORITY_HIGH, PRIORITY_MIDDLE, PRIORITY_LOW, PRIORITY_ICONS } from '@/constansts/task'

export const useTaskItem = () => {
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

    return {
        getPriorityIconConst
    };
};