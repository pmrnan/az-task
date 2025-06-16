import { format } from "date-fns";
import { DeleteWithConfirm } from "@/components/shared/DeleteWithConfirm";
import { useTaskItem } from "@/hooks/useTaskItem";
import { Task } from "@/types/Task";

type Props = {
  task: Task;
  fromStatus: string;
  onDragStart: (task: Task, fromStatus: string) => void;
};

export const TaskItem = ({ ...props }: Props) => {
  const { onDelete, getPriorityIconConst } = useTaskItem();

  return (
    <div
      key={props.task.id}
      draggable={true}
      onDragStart={() => props.onDragStart(props.task, props.fromStatus)}
      className="block max-w-sm py-1 mb-2 cursor-move bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
    >
      <div className="flex gap-1 items-center pl-1">
        <span className="i-tabler-grip-vertical bg-gray-700"></span>

        <div className="w-[100%] grid grid-rows-2 items-center">
          <div className="grid grid-cols-[15fr_1fr] pt-1">
            <h1 className="border-b-1 border-b-rose-light pb-2 truncate">
              {props.task.title}
            </h1>
            <DeleteWithConfirm
              deleteButton={
                <div className="flex justify-end pr-2 cursor-pointer">
                  <span className="i-tabler-x text-xs bg-gray-600 hover:bg-gray-900"></span>
                </div>
              }
              confirmMessage="タスクを削除しますか？"
              onDelete={() => onDelete(props.task.id, props.task.status)}
            />
          </div>
          <div className="grid grid-cols-2 items-center text-xs">
            <div className="flex gap-3 items-center">
              <label>優先度:</label>
              {props.task.priority ? (
                <span
                  className={getPriorityIconConst(props.task.priority).class}
                ></span>
              ) : (
                <>-</>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <label>期日:</label>
              {props.task.limitDate ? (
                <span>{format(props.task.limitDate, "yyyy/MM/dd")}</span>
              ) : (
                <>-</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
