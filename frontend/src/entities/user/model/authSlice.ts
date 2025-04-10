import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { apiFetch } from '@/shared/api';

// Типы для данных пользователя и ответа API
export interface UserData {
  id: string;
  email: string;
  // Добавьте другие поля, если они есть
}

interface AuthResponse {
  token: string;
  user: UserData;
}

interface RegisterResponse {
    message: string;
    user: UserData;
}

// Тип для состояния slice
export interface AuthState {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Начальное состояние
// Пытаемся получить токен и пользователя из localStorage при инициализации
const storedToken = localStorage.getItem('authToken');
const storedUserString = localStorage.getItem('authUser');
const storedUser = storedUserString ? JSON.parse(storedUserString) as UserData : null;

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken && !!storedUser,
  isLoading: false,
  error: null,
};

// Async Thunk для входа пользователя
export const loginUser = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) throw new Error('Login failed');
      const data: AuthResponse = await res.json();
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      return data;
    } catch (error: unknown) { // Используем unknown
      let message = 'Login failed';
      if (axios.isAxiosError(error)) { // Проверяем тип ошибки
        const axiosError = error as AxiosError<{ error?: string }>; // Уточняем тип
        message = axiosError.response?.data?.error || axiosError.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

// Async Thunk для регистрации пользователя
export const registerUser = createAsyncThunk<RegisterResponse, { email: string; password: string }>(
    'auth/registerUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await apiFetch('/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
            });
            if (!res.ok) throw new Error('Registration failed');
            const data: RegisterResponse = await res.json();
            return data;
        } catch (error: unknown) { // Используем unknown
            let message = 'Registration failed';
            if (axios.isAxiosError(error)) { // Проверяем тип ошибки
                const axiosError = error as AxiosError<{ error?: string }>; // Уточняем тип
                message = axiosError.response?.data?.error || axiosError.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            return rejectWithValue(message);
        }
    }
);

// Создание slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Редьюсер для выхода пользователя
    logout: (state: AuthState) => { // Добавляем тип state
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      // Очищаем localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    },
    // Можно добавить редьюсер для очистки ошибок
    clearAuthError: (state: AuthState) => { // Добавляем тип state
        state.error = null;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => { // Добавляем тип builder
    // Обработка loginUser
    builder
      .addCase(loginUser.pending, (state: AuthState) => { // Добавляем тип state
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse>) => { // Добавляем тип state
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state: AuthState, action) => { // Добавляем тип state
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload as string;
      });

    // Обработка registerUser
    builder
        .addCase(registerUser.pending, (state: AuthState) => { // Добавляем тип state
            state.isLoading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state: AuthState) => { // Добавляем тип state
            // Регистрация прошла успешно, но не меняем статус аутентификации
            state.isLoading = false;
            state.error = null; // Можно установить сообщение об успехе, если нужно
        })
        .addCase(registerUser.rejected, (state: AuthState, action) => { // Добавляем тип state
            state.isLoading = false;
            state.error = action.payload as string;
        });
  },
});

// Экспорт действий и редьюсера
export const { logout, clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authReducer;

// Селекторы (примеры)
// import { RootState } from '@/app/providers/StoreProvider'; // Путь к корневому состоянию
// export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
// export const selectUser = (state: RootState) => state.auth.user;
// export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
// export const selectAuthError = (state: RootState) => state.auth.error;

// Селектор для получения данных аутентификации (пользователь и токен)
export const selectAuthData = (state: { auth: AuthState }) => state.auth;
