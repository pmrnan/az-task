"use client";

import { DataStoreContextProvider } from "@/context/DataStoreContext";
import { AddTaskForm } from "@/components/task/AddTaskForm";
import { TaskFieldList } from "@/components/task/TaskFieldList";

export default function TopPage() {
  return (
    <>
      <DataStoreContextProvider>
        <AddTaskForm />
        <TaskFieldList />
      </DataStoreContextProvider>
    </>
  );
}
