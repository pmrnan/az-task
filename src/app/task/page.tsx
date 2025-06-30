"use client";

import { DataStoreContextProvider } from "@/context/DataStoreContext";
import { AddTask } from "@/components/task/AddTask";
import { TaskFieldList } from "@/components/task/TaskFieldList";

export default function TaskPage() {
  return (
    <>
      <DataStoreContextProvider>
        <AddTask />
        <TaskFieldList />
      </DataStoreContextProvider>
    </>
  );
}
