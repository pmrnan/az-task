"use client";
import { FIELDS_STATUS } from "@/constansts/task";
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
        fieldStatusOption={FIELDS_STATUS.notStarted}
        tasks={notStartedTasks}
        onDragStart={onDragStart}
        onDrop={onDrop}
        allowDrop={allowDrop}
      />
      <TaskField
        fieldStatusOption={FIELDS_STATUS.doing}
        tasks={doingTasks}
        onDragStart={onDragStart}
        onDrop={onDrop}
        allowDrop={allowDrop}
      />
      <TaskField
        fieldStatusOption={FIELDS_STATUS.done}
        tasks={doneTasks}
        onDragStart={onDragStart}
        onDrop={onDrop}
        allowDrop={allowDrop}
      />
    </div>
  );
};
