"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="my-4 mx-16 grid grid-cols-[15fr_1fr] items-center ">
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
            <AppTextForm name="task_name" title="タスク名" form={form} />
            <AppDateForm name="limit_date" title="期日" form={form} />
            <AppSelectForm name="priority" title="優先度" form={form} options={PRIORITY_OPTION} />
          </div>
          <div className="ml-auto">
            <Button type="submit" className="submit-button">
              追加
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
