import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import {
  HomeIcon,
  SourcesIcon,
  DataIcon,
  TopicsIcon,
  SettingsIcon,
  HelpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/shared/icons/NotionSidebarIcons'; // Предполагаем, что иконки будут здесь

// TODO: Создать NotionSidebarIcons.tsx с нужными SVG

const NAV_ITEMS = [
  { path: '/dashboard', title: 'Дашборд', icon: HomeIcon },
  { path: '/manage-sources', title: 'Источники', icon: SourcesIcon },
  { path: '/data-viewer', title: 'Данные', icon: DataIcon },
  { path: '/folders', title: 'Темы', icon: TopicsIcon },
  { path: '/admin/modules', title: 'Настройки', icon: SettingsIcon },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        {!isCollapsed && <span className={styles.logoText}>AI News Doks</span>}
        <button
          onClick={toggleSidebar}
          className={styles.toggleButton}
          aria-label={isCollapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
          title={isCollapsed ? 'Развернуть' : 'Свернуть'}
        >
          {isCollapsed ? <ChevronRightIcon size={20} /> : <ChevronLeftIcon size={20} />}
        </button>
      </div>

      <nav className={styles.nav}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
                title={isCollapsed ? item.title : undefined} // Показываем title только в свёрнутом виде
                aria-label={item.title}
              >
                <span className={styles.icon}>
                  <item.icon size={22} />
                </span>
                {!isCollapsed && <span className={styles.text}>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <NavLink
          to="/help" // TODO: Создать страницу помощи
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
          title={isCollapsed ? 'Помощь' : undefined}
          aria-label="Помощь"
        >
          <span className={styles.icon}>
            <HelpIcon size={22} />
          </span>
          {!isCollapsed && <span className={styles.text}>Помощь</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
