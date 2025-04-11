import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, LoginFormData } from './ui/LoginForm';
import { RegisterForm, RegisterFormData } from './ui/RegisterForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { loginUser, registerUser, clearAuthError } from '@/entities/user/model/authSlice';
import './AuthFeature.css';

type AuthMode = 'login' | 'register';

export const AuthFeature: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModeChange = useCallback((newMode: AuthMode) => {
    dispatch(clearAuthError());
    setMode(newMode);
  }, [dispatch]);

  const handleLogin = useCallback(async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate('/manage-sources'); // Или на дашборд '/dashboard'
    } catch (error) {
      console.error('Login failed:', error);
      // Ошибка будет отображена в LoginForm через useAppSelector
    }
  }, [dispatch, navigate]);

  const handleRegister = useCallback(async (data: RegisterFormData) => {
    // Валидация паролей уже не нужна здесь, т.к. RegisterForm должен ее делать
    // if (data.password !== data.confirmPassword) {
    //   console.error('Passwords do not match');
    //   // Можно диспатчить ошибку или отображать ее локально в RegisterForm
    //   return;
    // }
    try {
      // Отправляем только email и password
      await dispatch(registerUser({ email: data.email, password: data.password })).unwrap();
      alert('Регистрация успешна! Теперь вы можете войти.');
      handleModeChange('login'); // Переключаем на логин после успешной регистрации
    } catch (error) {
      console.error('Registration failed:', error);
      // Ошибка будет отображена в RegisterForm через useAppSelector
    }
  }, [dispatch, handleModeChange]);

  return (
    // Используем классы из AuthPage.css или AuthFeature.css, если он есть
    <div className="auth-card p-6 sm:p-8">
      {/* Добавляем логотип */}
      <div className="flex justify-center mb-6">
        <div className="news-logo">News Analytics</div>
      </div>

      {/* Табы */}
      <div className="flex border-b border-gray-700 mb-6">
        <button // Используем button для доступности
          className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
          onClick={() => handleModeChange('login')}
        >
          Вход
        </button>
        <button // Используем button для доступности
          className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
          onClick={() => handleModeChange('register')}
        >
          Регистрация
        </button>
      </div>

      {/* Контейнер для форм */}
      <div className="auth-form-container">
        {mode === 'login' ? (
          <>
            <LoginForm onSubmit={handleLogin} />
            {/* Ссылка для переключения на регистрацию */}
            <div className="pt-4 text-center text-sm text-gray-400">
              Нет аккаунта?{' '}
              <button onClick={() => handleModeChange('register')} className="text-primary-light hover:text-primary transition-colors font-medium">
                Зарегистрироваться
              </button>
            </div>
          </>
        ) : (
          <>
            <RegisterForm onSubmit={handleRegister} />
            {/* Ссылка для переключения на вход */}
            <div className="pt-4 text-center text-sm text-gray-400">
              Уже есть аккаунт?{' '}
              <button onClick={() => handleModeChange('login')} className="text-primary-light hover:text-primary transition-colors font-medium">
                Войти
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
