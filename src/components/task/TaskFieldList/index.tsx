import { FIELDS_STATUS } from "@/constansts/task";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { TaskField } from "@/components/task/TaskFieldList/TaskField";
import { useTaskFieldList } from "@/hooks/useTaskFieldList";

export const TaskFieldList = () => {
  const {
    notStartedTasks,
    doingTasks,
    doneTasks,
    isLoading,
    onDragStart,
    onDrop,
    allowDrop,
  } = useTaskFieldList();

  return (
    <>
      {isLoading && <LoadingOverlay />}
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
    </>
  );
};
