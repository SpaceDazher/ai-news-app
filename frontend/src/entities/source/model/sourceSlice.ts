import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios'; // Импортируем axios
import { ISource, SourceDataPayload } from './types'; // Импортируем типы
import { fetchSources, addSource, updateSource, deleteSource } from '../api/sourceApi'; // Импортируем API функции

// Тип для состояния slice
export interface SourceState {
  sources: ISource[];
  isLoading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: SourceState = {
  sources: [],
  isLoading: false,
  error: null,
};

// Вспомогательная функция для обработки ошибок API
const handleApiError = (error: unknown): string => {
  let message = 'An unknown error occurred';
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string; details?: string[] }>;
    message = axiosError.response?.data?.error || axiosError.message || message;
    if (axiosError.response?.data?.details) {
      message += `: ${axiosError.response.data.details.join(', ')}`;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};


// Async Thunks для взаимодействия с API
export const fetchSourcesThunk = createAsyncThunk<ISource[], void>(
  'sources/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSources();
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const addSourceThunk = createAsyncThunk<ISource, SourceDataPayload>(
  'sources/addOne',
  async (sourceData, { rejectWithValue }) => {
    try {
      return await addSource(sourceData);
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateSourceThunk = createAsyncThunk<ISource, { sourceId: string; sourceData: Partial<SourceDataPayload> }>(
  'sources/updateOne',
  async ({ sourceId, sourceData }, { rejectWithValue }) => {
    try {
      return await updateSource(sourceId, sourceData);
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Возвращаем ID удаленного источника для обновления состояния
export const deleteSourceThunk = createAsyncThunk<string, string>(
  'sources/deleteOne',
  async (sourceId, { rejectWithValue }) => {
    try {
      await deleteSource(sourceId);
      return sourceId; // Возвращаем ID для удаления из state
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


// Создание slice
const sourceSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    // Можно добавить редьюсер для очистки ошибок
    clearSourceError: (state: SourceState) => {
        state.error = null;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<SourceState>) => {
    // Обработка fetchSourcesThunk
    builder
      .addCase(fetchSourcesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSourcesThunk.fulfilled, (state, action: PayloadAction<ISource[]>) => {
        state.isLoading = false;
        state.sources = action.payload;
      })
      .addCase(fetchSourcesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Обработка addSourceThunk
    builder
      .addCase(addSourceThunk.pending, (state) => {
        state.isLoading = true; // Можно сделать отдельный флаг isLoadingAdd
        state.error = null;
      })
      .addCase(addSourceThunk.fulfilled, (state, action: PayloadAction<ISource>) => {
        state.isLoading = false;
        state.sources.unshift(action.payload); // Добавляем новый источник в начало списка
      })
      .addCase(addSourceThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Обработка updateSourceThunk
    builder
      .addCase(updateSourceThunk.pending, (state) => {
        state.isLoading = true; // Можно сделать отдельный флаг isLoadingUpdate
        state.error = null;
      })
      .addCase(updateSourceThunk.fulfilled, (state, action: PayloadAction<ISource>) => {
        state.isLoading = false;
        const index = state.sources.findIndex(source => source._id === action.payload._id);
        if (index !== -1) {
          state.sources[index] = action.payload; // Обновляем источник в списке
        }
      })
      .addCase(updateSourceThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Обработка deleteSourceThunk
    builder
      .addCase(deleteSourceThunk.pending, (state) => {
        state.isLoading = true; // Можно сделать отдельный флаг isLoadingDelete
        state.error = null;
      })
      .addCase(deleteSourceThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.sources = state.sources.filter(source => source._id !== action.payload); // Удаляем источник из списка
      })
      .addCase(deleteSourceThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспорт действий и редьюсера
export const { clearSourceError } = sourceSlice.actions;
export const sourceReducer = sourceSlice.reducer;
export default sourceReducer; // Экспорт по умолчанию для простоты

// Селекторы
import { StateSchema } from '@/app/providers/config/StateSchema'; // Используем StateSchema

export const selectAllSources = (state: StateSchema) => state.sources.sources;
export const selectIsSourcesLoading = (state: StateSchema) => state.sources.isLoading;
export const selectSourcesError = (state: StateSchema) => state.sources.error;
