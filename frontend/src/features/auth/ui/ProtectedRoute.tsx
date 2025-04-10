import React from 'react'; // Добавляем импорт React для JSX
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'; // Исправляем импорт хука
import { selectAuthData } from '@/entities/user/model/authSlice'; // Убеждаемся, что импорт селектора верный

interface ProtectedRouteProps {
  children: React.ReactNode; // Используем React.ReactNode для большей гибкости
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Используем selectAuthData для получения всего состояния аутентификации
  const { isAuthenticated } = useAppSelector(selectAuthData);

  // Проверяем флаг isAuthenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};
