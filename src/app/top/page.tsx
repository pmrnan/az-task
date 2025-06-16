"use client";

import { DataStoreContextProvider } from "@/context/DataStoreContext";
import { AddTaskForm } from "@/components/top/AddTaskForm";
import { TaskFieldList } from "@/components/top/TaskFieldList";

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
