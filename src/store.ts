import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // ใช้ localStorage
import authReducer from "./features/auth/authSlice";
import tasksReducer from "./features/tasks/tasksSlice";

const authPersistConfig = {
  key: "root",
  storage,
};

const tasksPersistConfig = {
  key: "tasks",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedTasksReducer = persistReducer(tasksPersistConfig, tasksReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    tasks: persistedTasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
