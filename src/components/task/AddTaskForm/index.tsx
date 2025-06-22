"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useAddTaskForm } from "@/hooks/useForm/useAddTaskForm";
import { AppDateForm } from "@/components/shared/AppDateForm";
import { AppSelectForm } from "@/components/shared/AppSelectForm";
import { AppTextForm } from "@/components/shared/AppTextForm";
import { PRIORITY_OPTION } from "@/constansts/task";

export const AddTaskForm = () => {
  // フォーム定義呼び出し
  const { form, onSubmit } = useAddTaskForm();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
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
