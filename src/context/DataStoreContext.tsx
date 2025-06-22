import React, { useReducer, createContext, JSX } from "react";
import {
  CONTEXT_FETCH_START,
  CONTEXT_FETCH_END,
  CONTEXT_NOT_STARTED_TASKS,
  CONTEXT_DOING_TASKS,
  CONTEXT_DONE_TASKS,
} from "@/constansts/context";
import { Task } from "@/types/Task";

type DataStore = {
  isLoading: boolean;
  isError: boolean;
  notStartedTasks: Task[];
  doingTasks: Task[];
  doneTasks: Task[];
};

type ReducerAction = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

type DataStoreContext = {
  state: DataStore;
  dispatch: React.Dispatch<ReducerAction>;
};

const reducerFunc = (state: DataStore, action: ReducerAction) => {
  switch (action.type) {
    case CONTEXT_FETCH_START:
      return {
        ...state,
        isLoading: true,
      };
    case CONTEXT_FETCH_END:
      return {
        ...state,
        isLoading: false,
      };
    case CONTEXT_NOT_STARTED_TASKS:
      return {
        ...state,
        isLoading: false,
        notStartedTasks: action.data,
      };
    case CONTEXT_DOING_TASKS:
      return {
        ...state,
        isLoading: false,
        doingTasks: action.data,
      };
    case CONTEXT_DONE_TASKS:
      return {
        ...state,
        isLoading: false,
        doneTasks: action.data,
      };
    default:
      return state;
  }
};

const initialState: DataStore = {
  isLoading: false,
  isError: false,
  notStartedTasks: [],
  doingTasks: [],
  doneTasks: [],
};

export const DataStoreContext = createContext({} as DataStoreContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataStoreContextProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  return (
    <DataStoreContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </DataStoreContext.Provider>
  );
};
