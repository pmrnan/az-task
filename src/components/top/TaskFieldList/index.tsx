import { STATUS } from "@/constansts/task";
import { TaskField } from "@/components/top/TaskFieldList/TaskField";

export const TaskFieldList = () => {
  return (
    <div className="pt-4 gap-x-5 flex justify-center">
      <TaskField statusName={STATUS.notStartetd.name} />
      <TaskField statusName={STATUS.doing.name} />
      <TaskField statusName={STATUS.done.name} />
    </div>
  );
};
