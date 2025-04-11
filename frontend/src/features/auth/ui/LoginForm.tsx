import React, { useState } from 'react';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectAuthData } from '@/entities/user/model/authSlice';

export interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error } = useAppSelector(selectAuthData);

  const [rememberMe, setRememberMe] = useState(false); // Состояние для "Запомнить меня"

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Передаем email и password, rememberMe обрабатывается локально или в authSlice, если нужно
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Отображение ошибки */}
      {error && <div className="error-text mb-4">{error}</div>}

      {/* Поле Email */}
      {/* Увеличиваем нижний отступ mb-5 */}
      <div className="mb-5">
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <div className="relative input-icon-wrapper">
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="form-input"
            placeholder="your@email.com"
          />
          {/* Добавляем класс ph */}
          <i className="ph ph-envelope input-icon"></i>
        </div>
      </div>

      {/* Поле Пароль */}
      {/* Увеличиваем нижний отступ mb-6 */}
      <div className="mb-6">
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-2">Пароль</label>
        <div className="relative input-icon-wrapper">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="form-input"
            placeholder="••••••••"
          />
          {/* Добавляем класс password-toggle */}
          <i
            className={`input-icon password-toggle ph ${showPassword ? 'ph-eye-slash' : 'ph-eye'}`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
      </div>

      {/* Чекбокс "Запомнить меня" и ссылка "Забыли пароль?" */}
      {/* Увеличиваем нижний отступ mb-8 */}
      <div className="flex items-center justify-between mb-8">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
          {/* Добавляем ml-2 для отступа */}
          <span className="ml-2 text-sm text-gray-300">Запомнить меня</span>
        </label>
        <a href="#" className="text-sm text-primary-light hover:text-primary transition-colors">
          Забыли пароль?
        </a>
      </div>

      {/* Кнопка Войти */}
      <button
        type="submit"
        className="w-full submit-button flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading && ( // Показываем спиннер при загрузке
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};
