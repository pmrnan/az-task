import { cn } from "@/lib/utils";
import { STATUS } from "@/constansts/task";

type Props = {
  statusName: string;
};

export const TaskBadge = ({ statusName }: Props) => {
  return (
    <div className={cn("flex items-center justify-center rounded-full w-20 px-2 py-1 mb-4", statusName === STATUS.notStartetd.name && STATUS.notStartetd.class, statusName === STATUS.doing.name && STATUS.doing.class, statusName === STATUS.done.name && STATUS.done.class)}>
      <div>{statusName}</div>
    </div>
  );
};
