import {
  FormControl,
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

type Props = {
  title: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  value: any;
  onChange: (...event: any[]) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
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
      <FormItem className="gap-1">
        <FormLabel className="form-title">
          {props.title}
          {isRequired && <span className="text-red">*</span>}
        </FormLabel>
        <FormControl>
          <Select
            value={props.value ?? "none"}
            onValueChange={(val) => props.onChange(val === "none" ? null : val)}
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
    </>
  );
};
