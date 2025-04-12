import React, { useState } from 'react';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectAuthData } from '@/entities/user/model/authSlice';
import { EnvelopeIcon } from '@/shared/icons/EnvelopeIcon';
import { EyeIcon } from '@/shared/icons/EyeIcon';
import { EyeSlashIcon } from '@/shared/icons/EyeSlashIcon';

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
  const { isLoading, error } = useAppSelector(selectAuthData);
  const [acceptTerms, setAcceptTerms] = useState(false); // Состояние для принятия условий
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // Локальная ошибка для подтверждения пароля
  const [termsError, setTermsError] = useState(''); // Локальная ошибка для принятия условий
  const [registerErrors, setRegisterErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Сбрасываем локальные ошибки
    setConfirmPasswordError('');
    setTermsError('');
    setRegisterErrors({});

    // Локальная валидация
    let hasErrors = false;
    const errors: {[key: string]: string} = {};
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
      setConfirmPasswordError('Пароли не совпадают');
      hasErrors = true;
    }
    
    if (!acceptTerms) {
      errors.acceptTerms = 'Вы должны принять условия использования';
      setTermsError('Вы должны принять условия использования');
      hasErrors = true;
    }

    if (hasErrors) {
      setRegisterErrors(errors);
      return;
    }

    // Передаем данные в родительский компонент
    onSubmit({ email, password, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-in card-3d-inner transform transition-all duration-300 hover:scale-[1.02]">
      {/* Отображение общей ошибки от Redux */}
      {error && <div className="error-text mb-4">{error}</div>}

      {/* Поле Email */}
      <div className="mb-4">
        <label htmlFor="register-email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <div className="input-icon-wrapper">
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="form-input bg-gray-800/50 border-gray-700 focus:border-primary-light focus:ring-primary-light/20 transition-all duration-300"
            placeholder="your@email.com"
          />
          <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
            <EnvelopeIcon />
          </div>
        </div>
        {registerErrors.email && <p className="error-message">{registerErrors.email}</p>}
      </div>

      {/* Поле Пароль */}
      <div className="mb-4">
        <label htmlFor="register-password" className="block text-sm font-medium text-gray-300 mb-2">Пароль</label>
        <div className="input-icon-wrapper">
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="form-input bg-gray-800/50 border-gray-700 focus:border-primary-light focus:ring-primary-light/20 transition-all duration-300"
            placeholder="••••••••"
          />
          <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          </div>
        </div>
        {registerErrors.password && <p className="error-message">{registerErrors.password}</p>}
      </div>

      {/* Поле Подтвердите пароль */}
      <div className="mb-6">
        <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-300 mb-2">Подтвердите пароль</label>
        <div className="input-icon-wrapper">
          <input
            id="register-confirm-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            className="form-input bg-gray-800/50 border-gray-700 focus:border-primary-light focus:ring-primary-light/20 transition-all duration-300"
            placeholder="••••••••"
          />
          <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          </div>
        </div>
        {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
      </div>

      {/* Чекбокс "Принимаю условия" */}
      <div className="mb-6">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            disabled={isLoading}
            required
          />
          <span className="text-sm text-gray-300">
            Я принимаю <a href="#" className="text-primary-light hover:text-primary transition-colors">Условия использования</a> и <a href="#" className="text-primary-light hover:text-primary transition-colors">Политику конфиденциальности</a>
          </span>
        </label>
        {termsError && <p className="error-message">{termsError}</p>}
      </div>

      {/* Кнопка Зарегистрироваться */}
      <button
        type="submit"
        className="btn btn-primary w-full flex items-center justify-center bg-gradient-to-r from-primary via-primary-light to-primary hover:from-primary-light hover:to-primary transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden rounded-lg shadow-lg hover:shadow-primary/20"
        disabled={isLoading}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <span>{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</span>
      </button>
    </form>
  );
};
