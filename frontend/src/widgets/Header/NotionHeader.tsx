import React, { useState } from 'react';
import { 
  SearchIcon, 
  BellIcon, 
  SunIcon, 
  MoonIcon 
} from '@/shared/icons/NotionSidebarIcons';
import styles from './NotionHeader.module.css';

interface NotionHeaderProps {
  title: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const NotionHeader: React.FC<NotionHeaderProps> = ({ 
  title, 
  user = { name: 'Пользователь', email: 'user@example.com' },
  darkMode = true,
  onToggleDarkMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика поиска
    console.log('Поиск:', searchQuery);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.pageTitle}>{title}</h1>
      
      <div className={styles.headerControls}>
        <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
          <SearchIcon className={styles.searchIcon} color="currentColor" />
          <input 
            type="text" 
            placeholder="Поиск..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        
        <button className={styles.iconButton} aria-label="Уведомления">
          <BellIcon color="currentColor" />
        </button>
        
        <button 
          className={styles.iconButton} 
          onClick={onToggleDarkMode}
          aria-label={darkMode ? 'Включить светлую тему' : 'Включить тёмную тему'}
        >
          {darkMode ? <SunIcon color="currentColor" /> : <MoonIcon color="currentColor" />}
        </button>
        
        <div className={styles.userInfo}>
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className={styles.userAvatar} 
            />
          ) : (
            <div className={styles.userAvatarPlaceholder}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className={styles.userName}>{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default NotionHeader;