import React from 'react';
import { Link } from 'react-router-dom';
import { UserWidget } from '../UserWidget/UserWidget'; // Импортируем UserWidget
import styles from './Header.module.css'; // Создадим стили

import { EditIcon, RefreshIcon, PlusIcon } from '@/shared/icons/CustomIcons';

export const Header: React.FC<{ title?: string }> = ({ title = "Управление Источниками" }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>AI News Doks</Link>
        <h1 className={styles.pageTitle}>{title}</h1>
        <div className={styles.headerControls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Поиск источников..."
              className={styles.searchInput}
              aria-label="Поиск"
            />
            <RefreshIcon size={20} />
          </div>
          <button className={styles.iconButton} title="Уведомления" aria-label="Уведомления">
            <EditIcon size={20} />
          </button>
          <button className={styles.iconButton} title="Сменить тему" aria-label="Сменить тему">
            <PlusIcon size={20} />
          </button>
          <UserWidget />
        </div>
      </div>
    </header>
  );
};
