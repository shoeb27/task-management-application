import taskReducer from '@/store/taskSlice';
import { configureStore } from '@reduxjs/toolkit';

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default store;
