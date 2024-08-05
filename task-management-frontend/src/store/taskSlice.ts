import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export interface ITasks {
  id?: number;
  title: string;
  description: string;
  status: string;
}

const initialState = {
  tasks: [] as ITasks[],
  error: '',
  loading: false,
  editId: null,
  isModalOpen: false,
  isEditMode: false,
  isDrawerOpen: false,
  taskId: null,
};

const api = axios.create({
  baseURL: API_ENDPOINT,
});

const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
  const response = await api.get('/tasks');
  return response.data;
});

const addTasks = createAsyncThunk('task/addTasks', async (data: any) => {
  const response = await api.post('/tasks', {
    ...data,
  });
  return response.data;
});

const editTasks = createAsyncThunk('task/editTasks', async (data: any) => {
  const response = await api.put(`/tasks/${data.id}`, { ...data });
  return response.data;
});

const deleteTasks = createAsyncThunk(
  'task/deleteTasks',
  async ({ id }: { id: number }) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    openModel: (state, action) => {
      state.isModalOpen = action.payload.isModalOpen;
      state.isEditMode = action.payload.isEditMode || false;
      state.editId = action.payload.editId || null;
    },
    handelDrawer: (state, action) => {
      state.isDrawerOpen = action.payload.isDrawerOpen;
      state.taskId = action.payload.taskId || null;
    },
  },
  extraReducers: builder => {
    // request send to server.
    builder.addCase(fetchTasks.pending, state => {
      state.loading = true;
    });
    // success response came from server.
    builder.addCase(fetchTasks.fulfilled, (state, action: any) => {
      state.loading = false;
      state.tasks = action?.payload?.data;
      state.error = '';
    });
    // error response came from server.
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.tasks = [];
      state.error = action?.error?.message as string;
    });

    // Add Task async cases
    builder.addCase(addTasks.pending, state => {
      state.loading = true;
    });

    builder.addCase(addTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.isModalOpen = false;
      state.tasks = [...state.tasks, { ...action?.payload?.data }];
    });

    builder.addCase(addTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });

    // Edit Task async cases
    builder.addCase(editTasks.pending, state => {
      state.loading = true;
    });

    builder.addCase(editTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.isModalOpen = false;
      state.editId = null;
      state.tasks = state.tasks.map(item =>
        item.id === action.payload.data.id ? action.payload.data : item
      );
    });

    builder.addCase(editTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });

    // Delete Task async cases
    builder.addCase(deleteTasks.pending, state => {
      state.loading = true;
    });

    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter(
        item => item.id !== action.payload.data.id
      );
    });

    builder.addCase(deleteTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

const actions = taskSlice.actions;
export default taskSlice.reducer;
export const { openModel, handelDrawer } = actions;
export { addTasks, deleteTasks, editTasks, fetchTasks };
