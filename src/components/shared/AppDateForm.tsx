import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { UseFormReturn } from "react-hook-form";

type Props = {
  name: string;
  title: string;
  form: UseFormReturn<any>;
  placeholder?: string;
};

export const AppDateForm = ({ placeholder = "日付を選択してください", ...props }: Props) => {
  return (
    <>
      <FormField
        control={props.form.control}
        name={props.name}
        render={({ field }) => (
          <>
            <FormItem className="gap-1">
              {props.title && <FormLabel className="form-title">{props.title}</FormLabel>}
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-[100%] justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                      <CalendarIcon />
                      {field.value ? format(field.value, "yyyy/MM/dd") : placeholder}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    {field.value && (
                      <div className="flex justify-end">
                        <Button type="button" variant="ghost" className="text-sm mx-2 mb-1 px-2" onClick={() => field.onChange(undefined)}>
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
        )}
      />
    </>
  );
};
