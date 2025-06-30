import { AddTaskForm } from "@/components/task/AddTask/AddTaskForm";
import { useAddTask } from "@/hooks/useAddTask";

export const AddTask = () => {
  // フォーム定義呼び出し
  const { postTask } = useAddTask();
  return (
    <>
      <AddTaskForm onValid={postTask} />
    </>
  );
};
