import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  details?: string;
  category: string;
  dueDate?: string;
  userEmail: string; // เพิ่ม field ระบุเจ้าของ Task
}

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) =>
          task.id === action.payload.id &&
          task.userEmail === action.payload.userEmail
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(
      state,
      action: PayloadAction<{ id: string; userEmail: string }>
    ) {
      state.tasks = state.tasks.filter(
        (task) =>
          task.id !== action.payload.id ||
          task.userEmail !== action.payload.userEmail
      );
    },
    getTasksByUser(state, action: PayloadAction<string>) {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.userEmail === action.payload),
      };
    },
  },
});

export const { addTask, updateTask, deleteTask, getTasksByUser } =
  tasksSlice.actions;
export default tasksSlice.reducer;
