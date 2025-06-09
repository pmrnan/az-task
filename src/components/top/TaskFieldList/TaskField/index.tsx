import { TaskBadge } from "@/components/top/TaskFieldList/TaskField/TaskBadge";
import { TaskItem } from "@/components/top/TaskFieldList/TaskField/TaskItem";

type Props = {
  statusName: string;
};

export const TaskField = ({ statusName }: Props) => {
  return (
    <div className="block w-90 h-140 p-4 task-container border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <TaskBadge statusName={statusName} />
      <TaskItem title="task1" />
    </div>
  );
};
