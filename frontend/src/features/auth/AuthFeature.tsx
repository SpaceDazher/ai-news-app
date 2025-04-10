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
      navigate('/manage-sources');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, [dispatch, navigate]);

  const handleRegister = useCallback(async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      await dispatch(registerUser({ email: data.email, password: data.password })).unwrap();
      alert('Регистрация успешна! Теперь вы можете войти.');
      handleModeChange('login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }, [dispatch, handleModeChange]);

  return (
    <div className="auth-card p-6 sm:p-8">
      <div className="flex border-b border-gray-700 mb-6">
        <div
          className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
          onClick={() => handleModeChange('login')}
        >
          Вход
        </div>
        <div
          className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
          onClick={() => handleModeChange('register')}
        >
          Регистрация
        </div>
      </div>

      <div className="auth-form-container">
        {mode === 'login' ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}
      </div>
    </div>
  );
};
