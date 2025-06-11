import { format } from "date-fns";
import { Priority, Status } from "@/generated/prisma/index.js";
import { useTaskItem } from "@/hooks/useTaskItem";

type Props = {
  taskId: number;
  title: string;
  status: Status;
  limitDate: Date | null;
  priority: Priority | null;
};

export const TaskItem = ({ ...props }: Props) => {
  const { getPriorityIconConst } = useTaskItem();

  return (
    <div
      key={props.taskId}
      className="block max-w-sm px-4 py-2 mb-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
    >
      <div className="grid grid-rows-2 gap-2 items-center">
        <h1>{props.title}</h1>
        <div className="grid grid-cols-2 items-center text-xs">
          <div className="flex gap-3 items-center">
            <label>優先度:</label>
            {props.priority ? (
              <span
                className={getPriorityIconConst(props.priority).class}
              ></span>
            ) : (
              <>-</>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <label>期日:</label>
            {props.limitDate ? (
              <span>{format(props.limitDate, "yyyy/MM/dd")}</span>
            ) : (
              <>-</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
