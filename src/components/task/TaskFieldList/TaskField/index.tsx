import { DragEvent } from "react";
import { StatusBadge } from "@/components/task/TaskFieldList/TaskField/StatusBadge";
import { TaskItem } from "@/components/task/TaskFieldList/TaskField/TaskItem";
import { FieldStatusOption, Task } from "@/types/Task";

type Props = {
  fieldStatusOption: FieldStatusOption;
  tasks?: Task[];
  onDragStart: (task: Task, fromStatus: string) => void;
  onDrop: (toStatus: string) => void;
  allowDrop: (e: DragEvent<HTMLDivElement>) => void;
};

export const TaskField = ({ ...props }: Props) => {
  return (
    <div
      onDrop={() => props.onDrop(props.fieldStatusOption.key)}
      onDragOver={props.allowDrop}
      className="block w-90 h-140 p-4 task-container border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <StatusBadge
        statusName={props.fieldStatusOption.statusName}
        class={props.fieldStatusOption.badgeClass}
      />
      <div className="h-120 overflow-y-auto">
        {props.tasks &&
          props.tasks.map((task) => {
            return (
              <TaskItem
                task={task}
                fromStatus={props.fieldStatusOption.key}
                onDragStart={props.onDragStart}
              />
            );
          })}
      </div>
    </div>
  );
};
