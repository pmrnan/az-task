import { DragEvent } from "react";
import { StatusBadge } from "@/components/top/TaskFieldList/TaskField/StatusBadge";
import { TaskItem } from "@/components/top/TaskFieldList/TaskField/TaskItem";
import { BudgeOption, Task } from "@/types/Task";

type Props = {
  statusBudgeOption: BudgeOption;
  tasks?: Task[];
  onDragStart: (task: Task, fromStatus: string) => void;
  onDrop: (toStatus: string) => void;
  allowDrop: (e: DragEvent<HTMLDivElement>) => void;
};

export const TaskField = ({ ...props }: Props) => {
  return (
    <div
      onDrop={() => props.onDrop(props.statusBudgeOption.key)}
      onDragOver={props.allowDrop}
      className="block w-90 h-140 p-4 task-container border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <StatusBadge statusBudgeOption={props.statusBudgeOption} />
      {props.tasks &&
        props.tasks.map((task) => {
          return (
            <TaskItem
              task={task}
              fromStatus={props.statusBudgeOption.key}
              onDragStart={props.onDragStart}
            />
          );
        })}
    </div>
  );
};
