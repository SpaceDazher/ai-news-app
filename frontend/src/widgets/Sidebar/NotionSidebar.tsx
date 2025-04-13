import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  SourcesIcon, 
  DatabaseIcon, 
  TopicsIcon, 
  SettingsIcon 
} from '@/shared/icons/NotionSidebarIcons';
import styles from './NotionSidebar.module.css';

interface NotionSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const NotionSidebar: React.FC<NotionSidebarProps> = ({ 
  collapsed = false, 
  onToggleCollapse 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggleCollapse) {
      onToggleCollapse();
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.logo}>
          {isCollapsed ? 'AD' : 'AI News Doks'}
        </h2>
        <button 
          onClick={handleToggleCollapse} 
          className={styles.collapseButton}
          aria-label={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className={styles.sidebarNav}>
        <NavLink 
          to="/dashboard" 
          title="Дашборд"
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <HomeIcon color="currentColor" />
          {!isCollapsed && <span className={styles.linkText}>Дашборд</span>}
        </NavLink>
        
        <NavLink 
          to="/manage-sources" 
          title="Источники"
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <SourcesIcon color="currentColor" />
          {!isCollapsed && <span className={styles.linkText}>Источники</span>}
        </NavLink>
        
        <NavLink 
          to="/data-viewer" 
          title="Данные"
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <DatabaseIcon color="currentColor" />
          {!isCollapsed && <span className={styles.linkText}>Данные</span>}
        </NavLink>
        
        <NavLink 
          to="/folders" 
          title="Темы"
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <TopicsIcon color="currentColor" />
          {!isCollapsed && <span className={styles.linkText}>Темы</span>}
        </NavLink>
        
        <NavLink 
          to="/admin/modules" 
          title="Настройки"
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <SettingsIcon color="currentColor" />
          {!isCollapsed && <span className={styles.linkText}>Настройки</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default NotionSidebar;