import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiFetch } from '../../../shared/api';

export interface AnalysisResult {
  _id: string;
  userId: string;
  sourceId: string;
  rawText: string;
  cleanedText: string;
  category?: string;
  sentiment?: string;
  entities?: Array<{ entity: string; type: string }>;
  summary?: string;
  importanceScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AnalysisResultState {
  list: AnalysisResult[];
  current: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalysisResultState = {
  list: [],
  current: null,
  isLoading: false,
  error: null,
};

export const fetchAnalysisResults = createAsyncThunk<AnalysisResult[]>(
  'analysisResult/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch('/analysis-results');
      if (!res.ok) throw new Error('Failed to fetch');
      return await res.json();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchAnalysisResultById = createAsyncThunk<AnalysisResult, string>(
  'analysisResult/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiFetch(`/analysis-results/${id}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return await res.json();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const startTextAnalysis = createAsyncThunk<any, { rawText: string; sourceId: string }>(
  'analysisResult/startTextAnalysis',
  async ({ rawText, sourceId }, { rejectWithValue }) => {
    try {
      const res = await apiFetch('/processText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText, sourceId }),
      });
      if (!res.ok) throw new Error('Failed to start analysis');
      return await res.json();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const analysisResultSlice = createSlice({
  name: 'analysisResult',
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<AnalysisResult | null>) {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalysisResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnalysisResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnalysisResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAnalysisResultById.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { setCurrent } = analysisResultSlice.actions;
export const analysisResultReducer = analysisResultSlice.reducer;
