"use client";

import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { AppDateForm } from "@/components/shared/AppDateForm";
import { AppSelectForm } from "@/components/shared/AppSelectForm";
import { AppTextForm } from "@/components/shared/AppTextForm";
import { PRIORITY_OPTION } from "@/constansts/task";
import { addTaskInputSchema, AddTaskInputSchema } from "@/lib/schema/Task";

type Props<T extends FieldValues = AddTaskInputSchema> = {
  onValid: SubmitHandler<T>;
  onInValid?: SubmitErrorHandler<T>;
};

export const AddTaskForm = ({ ...props }: Props) => {
  // RHFの設定
  const form = useForm<AddTaskInputSchema>({
    defaultValues: {
      title: "",
      priority: null,
      limitDate: null,
    },
    mode: "onSubmit",
    resolver: zodResolver(addTaskInputSchema),
  });

  // onValidをラップして、送信後にreset()を実行
  const handleValid: SubmitHandler<AddTaskInputSchema> = async (data) => {
    await props.onValid(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleValid, props.onInValid)}
        className="space-y-8"
      >
        <div className="my-4 mx-16 grid grid-cols-[15fr_1fr] items-center ">
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <>
                  <AppTextForm
                    title="タスク名"
                    value={field.value}
                    onChange={field.onChange}
                    isRequired={true}
                  />
                </>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <>
                  <AppSelectForm
                    title="優先度"
                    value={field.value}
                    onChange={field.onChange}
                    options={PRIORITY_OPTION}
                  />
                </>
              )}
            />
            <FormField
              control={form.control}
              name="limitDate"
              render={({ field }) => (
                <>
                  <AppDateForm
                    title="期日"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </>
              )}
            />
          </div>
          <div className="ml-auto">
            <Button type="submit" className="cursor-pointer submit-button">
              追加
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
