"use client";
import { STATUS_BUDGES } from "@/constansts/task";
import { TaskField } from "@/components/top/TaskFieldList/TaskField";
import { useTaskFieldList } from "@/hooks/useTaskFieldList";

export const TaskFieldList = () => {
  const { notStartedTasks, doingTasks, doneTasks } = useTaskFieldList();
  return (
    <div className="pt-4 gap-x-5 flex justify-center">
      <TaskField
        statusBudgeOption={STATUS_BUDGES.notStarted}
        tasks={notStartedTasks}
      />
      <TaskField statusBudgeOption={STATUS_BUDGES.doing} tasks={doingTasks} />
      <TaskField statusBudgeOption={STATUS_BUDGES.done} tasks={doneTasks} />
    </div>
  );
};
