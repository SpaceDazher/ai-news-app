import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiFetch } from '../../../shared/api';

interface Kpis {
  totalPosts: number;
  averageSentiment: number;
  topCategory: string;
  newToday: number;
}

interface ImportantNewsItem {
  id: string;
  title: string;
  summary: string;
  importanceScore: number;
  sentiment: string;
  category: string;
  sources: string[];
}

interface SentimentTrendPoint {
  date: string;
  score: number;
}

interface CategoryDistributionItem {
  category: string;
  count: number;
}

interface SentimentDistribution {
  positive: number;
  negative: number;
  neutral: number;
}

interface TopEntity {
  entity: string;
  count: number;
}

interface DashboardData {
  kpis: Kpis;
  importantNews: ImportantNewsItem[];
  sentimentTrend: SentimentTrendPoint[];
  categoryDistribution: CategoryDistributionItem[];
  sentimentDistribution: SentimentDistribution;
  topEntities: TopEntity[];
}

export interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk<DashboardData>(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch('/dashboard');
      if (!res.ok) throw new Error('Failed to fetch dashboard data');
      return await res.json();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const dashboardReducer = dashboardSlice.reducer;
