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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="error-text">{error}</div>}

      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <div className="relative">
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
          <i className="ph-envelope password-toggle"></i>
        </div>
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1">Пароль</label>
        <div className="relative">
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
          <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            <i className={showPassword ? 'ph-eye-slash' : 'ph-eye'}></i>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full submit-button" disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};
