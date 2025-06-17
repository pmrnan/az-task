import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "@/types/Form";
import { UseFormReturn } from "react-hook-form";

type Props = {
  name: string;
  title: string;
  form: UseFormReturn<any>;
  options: Option[];
  placeholder?: string;
  isRequired?: boolean;
};

export const AppSelectForm = ({
  placeholder = "選択してください",
  isRequired = false,
  ...props
}: Props) => {
  return (
    <>
      <FormField
        control={props.form.control}
        name={props.name}
        render={({ field }) => (
          <FormItem className="gap-1">
            <FormLabel className="form-title">
              {props.title}
              {isRequired && <span className="text-red">*</span>}
            </FormLabel>
            <FormControl>
              <Select
                value={field.value ?? "none"}
                onValueChange={(val) =>
                  field.onChange(val === "none" ? null : val)
                }
              >
                <SelectTrigger className="w-[100%] cursor-pointer hover:bg-accent">
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
