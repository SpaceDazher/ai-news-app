import React from 'react';
import { Link } from 'react-router-dom';
import { UserWidget } from '../UserWidget/UserWidget'; // Импортируем UserWidget
import styles from './Header.module.css'; // Создадим стили

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>AI News Doks</Link>
        {/* Здесь можно добавить навигацию, если нужно */}
        <UserWidget /> {/* Добавляем виджет пользователя */}
      </div>
    </header>
  );
};
