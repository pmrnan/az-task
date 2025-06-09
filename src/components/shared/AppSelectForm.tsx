import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Option } from "@/types/Task";
import { UseFormReturn } from "react-hook-form";

type Props = {
  name: string;
  title: string;
  form: UseFormReturn<any>;
  options: Option[];
  placeholder?: string;
};

export const AppSelectForm = ({ placeholder = "選択してください", ...props }: Props) => {
  return (
    <>
      <FormField
        control={props.form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem className="gap-1">
            {props.title && <FormLabel className="form-title">{props.title}</FormLabel>}
            <FormControl>
              <Select value={field.value} onValueChange={(val) => field.onChange(val === "none" ? undefined : val)}>
                <SelectTrigger className="w-[100%]">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">-- 未選択 --</SelectItem>
                  {props.options.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
