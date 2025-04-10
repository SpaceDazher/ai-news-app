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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading, error } = useAppSelector(selectAuthData);
  const [clientError, setClientError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientError(null);
    if (password !== confirmPassword) {
      setClientError('Пароли не совпадают');
      return;
    }
    onSubmit({ email, password, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(clientError || error) && <div className="error-text">{clientError || error}</div>}

      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <div className="relative">
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
          <i className="ph-envelope password-toggle"></i>
        </div>
      </div>

      <div>
        <label htmlFor="register-password" className="block text-sm font-medium text-gray-300 mb-1">Пароль</label>
        <div className="relative">
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
          <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            <i className={showPassword ? 'ph-eye-slash' : 'ph-eye'}></i>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-300 mb-1">Подтвердите пароль</label>
        <div className="relative">
          <input
            id="register-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            className="form-input"
            placeholder="••••••••"
          />
          <div className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            <i className={showConfirmPassword ? 'ph-eye-slash' : 'ph-eye'}></i>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full submit-button" disabled={isLoading}>
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};
