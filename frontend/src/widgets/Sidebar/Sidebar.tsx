import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

import {
  RssIcon,
  WebsiteIcon,
  ApiIcon,
  EditIcon,
} from '@/shared/icons/CustomIcons';
// TODO: Заменить текстовые иконки на реальные SVG или иконки из библиотеки
const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard" // Основной дашборд (пока не реализован)
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            title="Основной Дашборд"
                        >
                            <span className={styles.icon}><WebsiteIcon size={22} /></span>
                            <span className={styles.text}>Дашборд</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/manage-sources"
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            title="Управление Источниками"
                        >
                            <span className={styles.icon}><RssIcon size={22} /></span>
                            <span className={styles.text}>Источники</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/data-viewer"
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            title="Просмотр Данных"
                        >
                            <span className={styles.icon}><WebsiteIcon size={22} /></span>
                            <span className={styles.text}>Данные</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/folders" // Дашборд классификации (пока не реализован)
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            title="Темы (Папки)"
                        >
                            <span className={styles.icon}><ApiIcon size={22} /></span>
                            <span className={styles.text}>Темы</span>
                        </NavLink>
                    </li>
                    {/* Ссылка на админку (можно показывать по роли) */}
                    <li>
                        <NavLink
                            to="/admin/modules" // Конфигурация модулей (пока не реализована)
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            title="Настройка Модулей"
                        >
                            <span className={styles.icon}><EditIcon size={22} /></span>
                            <span className={styles.text}>Настройки</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
