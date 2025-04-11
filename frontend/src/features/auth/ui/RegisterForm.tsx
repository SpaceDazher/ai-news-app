import React, { useState } from 'react';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectAuthData } from '@/entities/user/model/authSlice';

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // Удаляем неиспользуемые переменные
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading, error } = useAppSelector(selectAuthData);
  // const [clientError, setClientError] = useState<string | null>(null); // Заменяем на более специфичные ошибки
  const [acceptTerms, setAcceptTerms] = useState(false); // Состояние для принятия условий
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // Локальная ошибка для подтверждения пароля
  const [termsError, setTermsError] = useState(''); // Локальная ошибка для принятия условий

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Сбрасываем локальные ошибки
    setConfirmPasswordError('');
    setTermsError('');

    // Локальная валидация
    if (password !== confirmPassword) {
      setConfirmPasswordError('Пароли не совпадают');
      return;
    }
    if (!acceptTerms) {
      setTermsError('Вы должны принять условия использования');
      return;
    }

    // Передаем данные в родительский компонент
    onSubmit({ email, password, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Отображение общей ошибки от Redux */}
      {error && <div className="error-text mb-4">{error}</div>}

      {/* Поле Email */}
      {/* Увеличиваем нижний отступ mb-5 */}
      <div className="mb-5">
        <label htmlFor="register-email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <div className="relative input-icon-wrapper">
          <input
            id="register-email"
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
      {/* Увеличиваем нижний отступ mb-5 */}
      <div className="mb-5">
        <label htmlFor="register-password" className="block text-sm font-medium text-gray-300 mb-2">Пароль</label>
        <div className="relative input-icon-wrapper">
          <input
            id="register-password"
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

      {/* Поле Подтвердите пароль */}
      {/* Увеличиваем нижний отступ mb-6 */}
      <div className="mb-6">
        <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-300 mb-2">Подтвердите пароль</label>
        <div className="relative input-icon-wrapper">
          <input
            id="register-confirm-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        {confirmPasswordError && <p className="error-text mt-1">{confirmPasswordError}</p>}
      </div>

      {/* Чекбокс "Я принимаю Условия использования..." */}
      {/* Увеличиваем нижний отступ mb-8 */}
      <div className="mb-8">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            required
            disabled={isLoading}
          />
          {/* Добавляем ml-2 для отступа */}
          <span className="ml-2 text-sm text-gray-300">
            Я принимаю <a href="#" className="text-primary-light hover:text-primary transition-colors">Условия использования</a> и <a href="#" className="text-primary-light hover:text-primary transition-colors">Политику конфиденциальности</a>
          </span>
        </label>
        {termsError && <p className="error-text mt-1">{termsError}</p>}
      </div>

      {/* Кнопка Зарегистрироваться */}
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
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};
