import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type Props = {
  name: string;
  title: string;
  form: UseFormReturn<any>;
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
              <Input
                placeholder={placeholder}
                className="hover:bg-accent"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
