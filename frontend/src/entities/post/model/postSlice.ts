// frontend/src/entities/post/model/postSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchPostsBySource, fetchPostRawText } from '../api/postApi';
import { PostState, FetchPostsResponse, FetchPostRawTextResponse, IPost } from './types';
import { StateSchema } from '@/app/providers/config/StateSchema'; // Исправлено: импортируем StateSchema

// Async Thunk для получения списка постов (превью)
export const fetchPostsBySourceThunk = createAsyncThunk<
  FetchPostsResponse, // Тип возвращаемого значения при успехе
  { sourceId: string; page?: number; limit?: number }, // Тип аргументов thunk
  { rejectValue: string } // Тип значения при ошибке
>(
  'posts/fetchBySource',
  async ({ sourceId, page, limit }, { rejectWithValue }) => {
    try {
      const data = await fetchPostsBySource({ sourceId, page, limit });
      // Добавляем sourceId к каждому посту, чтобы знать, к какому источнику он относится
      // Это может быть избыточно, если мы храним их в postsBySource[sourceId], но полезно для консистентности
      const postsWithSourceId = data.posts.map(post => ({ ...post, sourceId }));
      return { ...data, posts: postsWithSourceId as Omit<IPost, 'rawText'>[] }; // Убедимся в типе
    } catch (error: unknown) {
      // Исправлено: используем unknown и проверяем тип ошибки
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch posts');
    }
  }
);

// Async Thunk для получения сырого текста поста
export const fetchPostRawTextThunk = createAsyncThunk<
  FetchPostRawTextResponse, // Тип возвращаемого значения при успехе
  string, // Тип аргумента thunk (postId)
  { rejectValue: string } // Тип значения при ошибке
>(
  'posts/fetchRawText',
  async (postId, { rejectWithValue }) => {
    try {
      const data = await fetchPostRawText(postId);
      return data;
    } catch (error: unknown) {
      // Исправлено: используем unknown и проверяем тип ошибки
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch raw text');
    }
  }
);

const initialState: PostState = {
  postsBySource: {},
  currentRawText: null,
  isLoadingList: false,
  isLoadingRawText: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Можно добавить синхронные редьюсеры при необходимости, например, для очистки состояния
    clearCurrentRawText: (state) => {
        state.currentRawText = null;
    },
    clearPostsForSource: (state, action: PayloadAction<string>) => {
        delete state.postsBySource[action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchPostsBySourceThunk
      .addCase(fetchPostsBySourceThunk.pending, (state) => {
        state.isLoadingList = true;
        state.error = null; // Сбрасываем ошибку при новом запросе
      })
      .addCase(fetchPostsBySourceThunk.fulfilled, (state, action: PayloadAction<FetchPostsResponse & { posts: Omit<IPost, 'rawText'>[] }>) => {
        state.isLoadingList = false;
        // Получаем sourceId из первого поста (или из аргументов thunk, если передавать)
        const sourceId = action.payload.posts[0]?.sourceId;
        if (sourceId) {
            // Добавляем или перезаписываем посты для данного источника
            // Важно: API возвращает Omit<IPost, 'rawText'>, поэтому добавляем заглушку для rawText
            state.postsBySource[sourceId] = action.payload.posts.map(post => ({...post, rawText: ''}));
        }
        // TODO: Обработать пагинацию, если нужно (добавлять к существующему списку или заменять)
      })
      .addCase(fetchPostsBySourceThunk.rejected, (state, action) => {
        state.isLoadingList = false;
        state.error = action.payload || 'Failed to fetch posts';
      })
      // Обработка fetchPostRawTextThunk
      .addCase(fetchPostRawTextThunk.pending, (state) => {
        state.isLoadingRawText = true;
        state.currentRawText = null; // Очищаем предыдущий текст
        state.error = null;
      })
      .addCase(fetchPostRawTextThunk.fulfilled, (state, action: PayloadAction<FetchPostRawTextResponse>) => {
        state.isLoadingRawText = false;
        state.currentRawText = action.payload.rawText;
      })
      .addCase(fetchPostRawTextThunk.rejected, (state, action) => {
        state.isLoadingRawText = false;
        state.error = action.payload || 'Failed to fetch raw text';
      });
  },
});

// Экспорт редьюсера и действий
export const { actions: postActions } = postSlice; // Экспорт синхронных действий
export const { reducer: postReducer } = postSlice;

// Селекторы (примеры)
// Исправлено: используем StateSchema вместо RootState
export const selectPostsForSource = (sourceId: string) => (state: StateSchema) => state.posts.postsBySource[sourceId] || [];
export const selectCurrentRawText = (state: StateSchema) => state.posts.currentRawText;
export const selectIsPostsLoading = (state: StateSchema) => state.posts.isLoadingList;
export const selectIsRawTextLoading = (state: StateSchema) => state.posts.isLoadingRawText;
export const selectPostsError = (state: StateSchema) => state.posts.error;
