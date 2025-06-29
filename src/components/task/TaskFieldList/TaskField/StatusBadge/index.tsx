import { cn } from "@/lib/utils";

type Props = {
  statusName: string;
  class: string;
};

export const StatusBadge = ({ ...props }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full w-20 px-2 py-1 mb-4 task-status-badge",
        props.class,
      )}
    >
      <div>{props.statusName}</div>
    </div>
  );
};
