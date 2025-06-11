import { StatusBadge } from "@/components/top/TaskFieldList/TaskField/StatusBadge";
import { TaskItem } from "@/components/top/TaskFieldList/TaskField/TaskItem";
import { BudgeOption, Task } from "@/types/Task";

type Props = {
  statusBudgeOption: BudgeOption;
  tasks?: Task[];
};

export const TaskField = ({ ...props }: Props) => {
  return (
    <div className="block w-90 h-140 p-4 task-container border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <StatusBadge statusBudgeOption={props.statusBudgeOption} />
      {props.tasks &&
        props.tasks.map((task) => {
          return (
            <TaskItem
              taskId={task.id}
              title={task.title}
              status={task.status}
              limitDate={task.limitDate}
              priority={task.priority}
            />
          );
        })}
    </div>
  );
};
