import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiFetch } from '../../../shared/api';

export interface Folder {
  _id: string;
  userId: string;
  name: string;
  sourceIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FoldersState {
  list: Folder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FoldersState = {
  list: [],
  isLoading: false,
  error: null,
};

export const fetchFolders = createAsyncThunk<Folder[]>(
  'folders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch('/folders');
      if (!res.ok) throw new Error('Failed to fetch folders');
      return await res.json();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const createFolder = createAsyncThunk<Folder, { name: string; sourceIds: string[] }>(
  'folders/create',
  async ({ name, sourceIds }, { rejectWithValue }) => {
    try {
      const res = await apiFetch('/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, sourceIds }),
      });
      if (!res.ok) throw new Error('Failed to create folder');
      return await res.json();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFolders.fulfilled, (state, action: PayloadAction<Folder[]>) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createFolder.fulfilled, (state, action: PayloadAction<Folder>) => {
        state.list.push(action.payload);
      });
  },
});

export const foldersReducer = foldersSlice.reducer;
