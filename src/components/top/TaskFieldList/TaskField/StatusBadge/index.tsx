import { cn } from "@/lib/utils";
import { BudgeOption } from "@/types/Task";

type Props = {
  statusBudgeOption: BudgeOption;
};

export const StatusBadge = ({ statusBudgeOption }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full w-20 px-2 py-1 mb-4 task-status-badge",
        statusBudgeOption.class
      )}
    >
      <div>{statusBudgeOption.name}</div>
    </div>
  );
};
