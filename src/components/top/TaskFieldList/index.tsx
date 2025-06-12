"use client";
import { STATUS_BUDGES } from "@/constansts/task";
import { TaskField } from "@/components/top/TaskFieldList/TaskField";
import { useTaskFieldList } from "@/hooks/useTaskFieldList";

export const TaskFieldList = () => {
  const {
    notStartedTasks,
    doingTasks,
    doneTasks,
    onDragStart,
    onDrop,
    allowDrop,
  } = useTaskFieldList();

  return (
    <div className="pt-4 gap-x-5 flex justify-center">
      <TaskField
        statusBudgeOption={STATUS_BUDGES.notStarted}
        tasks={notStartedTasks}
        onDragStart={onDragStart}
        onDrop={onDrop}
        allowDrop={allowDrop}
      />
      <TaskField
        statusBudgeOption={STATUS_BUDGES.doing}
        tasks={doingTasks}
        onDragStart={onDragStart}
        onDrop={onDrop}
        allowDrop={allowDrop}
      />
      <TaskField
        statusBudgeOption={STATUS_BUDGES.done}
        tasks={doneTasks}
        onDragStart={onDragStart}
        onDrop={onDrop}
        allowDrop={allowDrop}
      />
    </div>
  );
};
