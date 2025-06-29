import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  title: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  value: any;
  onChange: (...event: any[]) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  placeholder?: string;
  isRequired?: boolean;
};

export const AppDateForm = ({
  placeholder = "日付を選択してください",
  isRequired = false,
  ...props
}: Props) => {
  return (
    <>
      <FormItem className="gap-1">
        <FormLabel className="form-title">
          {props.title}
          {isRequired && <span className="text-red">*</span>}
        </FormLabel>
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[100%] justify-start text-left font-normal cursor-pointer",
                  !props.value && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {props.value ? format(props.value, "yyyy/MM/dd") : placeholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={props.value}
                onSelect={props.onChange}
              />
              {props.value && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-sm mx-2 mb-1 px-2"
                    onClick={() => props.onChange(undefined)}
                  >
                    日付をクリア
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};
