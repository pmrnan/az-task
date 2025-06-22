import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  title: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  value: any;
  onChange: (...event: any[]) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  placeholder?: string;
  isRequired?: boolean;
};

export const AppTextForm = ({
  placeholder = "入力してください",
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
          <Input
            placeholder={placeholder}
            className="hover:bg-accent"
            value={props.value}
            onChange={props.onChange}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};
