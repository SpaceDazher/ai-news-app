import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { selectAuthData, logout } from '@/entities/user/model/authSlice';
import styles from './UserWidget.module.css'; // Создадим стили

export const UserWidget: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector(selectAuthData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    // После выхода можно перенаправить на страницу входа
    navigate('/auth');
  }, [dispatch, navigate]);

  return (
    <div className={styles.userWidget}>
      {isAuthenticated && user ? (
        <>
          <span className={styles.userEmail}>{user.email}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Выйти
          </button>
        </>
      ) : (
        <Link to="/auth" className={styles.loginLink}>
          Войти / Регистрация
        </Link>
      )}
    </div>
  );
};
