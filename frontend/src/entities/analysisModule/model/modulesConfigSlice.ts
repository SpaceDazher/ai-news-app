import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiFetch } from '../../../shared/api';

export interface ModuleConfig {
  _id: string;
  moduleId: string;
  name: string;
  description: string;
  isEnabled: boolean;
  prompt?: string;
  parameters?: Record<string, any>;
}

export interface ModulesConfigState {
  list: ModuleConfig[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ModulesConfigState = {
  list: [],
  isLoading: false,
  error: null,
};

export const fetchModulesConfig = createAsyncThunk<ModuleConfig[]>(
  'modulesConfig/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch('/admin/analysis-modules');
      if (!res.ok) throw new Error('Failed to fetch modules config');
      return await res.json();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateModuleConfig = createAsyncThunk<ModuleConfig, { moduleId: string; data: Partial<ModuleConfig> }>(
  'modulesConfig/update',
  async ({ moduleId, data }, { rejectWithValue }) => {
    try {
      const res = await apiFetch(`/admin/analysis-modules/${moduleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update module config');
      return await res.json();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const modulesConfigSlice = createSlice({
  name: 'modulesConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModulesConfig.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchModulesConfig.fulfilled, (state, action: PayloadAction<ModuleConfig[]>) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchModulesConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateModuleConfig.fulfilled, (state, action: PayloadAction<ModuleConfig>) => {
        const idx = state.list.findIndex((m) => m.moduleId === action.payload.moduleId);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  },
});

export const modulesConfigReducer = modulesConfigSlice.reducer;
