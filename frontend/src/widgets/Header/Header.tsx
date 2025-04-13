import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Убираем неиспользуемый импорт
import { UserWidget } from '../UserWidget/UserWidget';
import styles from './Header.module.css';
import {
  SearchIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
} from '@/shared/icons/NotionSidebarIcons'; // Используем иконки из NotionSidebarIcons

// TODO: Реализовать логику поиска, уведомлений и смены темы

export const Header: React.FC<{ title?: string }> = ({ title = "Управление Источниками" }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Предполагаем темную тему по умолчанию
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Добавить логику смены темы (например, через CSS переменные или Context API)
    document.body.classList.toggle('light-mode', !isDarkMode); // Пример
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // TODO: Добавить логику поиска (например, debounce и вызов API/фильтрации)
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Выполнить поиск по searchTerm
    console.log('Поиск:', searchTerm);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип или название приложения можно убрать, если есть в Sidebar */}
        {/* <Link to="/" className={styles.logo}>AI News Doks</Link> */}
        <h1 className={styles.pageTitle}>{title}</h1>
        <div className={styles.headerControls}>
          <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
            <SearchIcon className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
              aria-label="Поиск по приложению"
            />
          </form>
          <button
            className={styles.iconButton}
            title="Уведомления"
            aria-label="Уведомления"
          >
            <BellIcon size={20} />
            {/* TODO: Добавить индикатор новых уведомлений */}
          </button>
          <button
            className={styles.iconButton}
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Светлая тема' : 'Темная тема'}
            aria-label={isDarkMode ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
          <UserWidget />
        </div>
      </div>
    </header>
  );
};

export default Header; // Добавляем экспорт по умолчанию
