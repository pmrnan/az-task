import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const LoadingOverlay = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-800/70 backdrop-blur-sm",
        className
      )}
    >
      <Loader2
        className="h-16 w-16 animate-spin mb-4 text-gray-300"
        data-testid="loading-spinner"
      />
    </div>
  );
};
