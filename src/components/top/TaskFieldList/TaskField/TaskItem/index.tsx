type TaskItemProps = {
  title: string;
};

export const TaskItem = ({ title }: TaskItemProps) => {
  return (
    <div className="block max-w-sm p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600">
      <h1>{title}</h1>
    </div>
  );
};
