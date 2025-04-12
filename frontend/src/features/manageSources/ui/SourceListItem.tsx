// src/features/manageSources/ui/SourceListItem.tsx
import React from 'react';
import type { ISource } from '@/entities/source/model/types';
import './SourceListItem.css';

// SVG-иконки
import {
  RssIcon,
  WebsiteIcon,
  ApiIcon,
  SocialIcon,
  StatusActive,
  StatusInactive,
  StatusError,
} from '@/shared/icons/SourceTypeIcons';

// SVG для кнопок
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M3 17l2-2h10l2 2v-2l-2-2H5l-2 2v2z" fill="#4F8CFF"/>
    <rect x="7" y="2" width="6" height="10" rx="2" fill="#4F8CFF"/>
  </svg>
);
const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="5" y="7" width="10" height="10" rx="2" fill="#EB5757"/>
    <rect x="8" y="10" width="4" height="4" rx="1" fill="#fff"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M10 3v2a5 5 0 1 1-4.546 2.914" stroke="#00B894" strokeWidth="2" strokeLinecap="round"/>
    <polyline points="3 5 10 5 10 12" stroke="#00B894" strokeWidth="2" fill="none"/>
  </svg>
);

// Получить SVG-иконку по типу источника
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'rss': return <RssIcon />;
    case 'website': return <WebsiteIcon />;
    case 'api': return <ApiIcon />;
    case 'social': return <SocialIcon />;
    default: return <WebsiteIcon />;
  }
};

// Получить SVG-статус
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return <StatusActive />;
    case 'inactive': return <StatusInactive />;
    case 'error': return <StatusError />;
    default: return <StatusInactive />;
  }
};

// Получить подпись статуса на русском
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'Активен';
    case 'inactive': return 'Неактивен';
    case 'error': return 'Ошибка';
    default: return 'Неактивен';
  }
};

interface SourceListItemProps {
  source: ISource;
  onEdit: (source: ISource) => void;
  onDelete: (sourceId: string) => void;
  onRefresh?: (sourceId: string) => void;
}

export const SourceListItem: React.FC<SourceListItemProps> = ({
  source,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  return (
    <li className="source-list-item">
      <div className="source-card-header">
        <span className="source-type-icon" title={`Тип: ${source.type ?? 'website'}`}>
          {getTypeIcon(source.type ?? 'website')}
        </span>
        <span className="source-status" title={getStatusLabel(source.status ?? 'inactive')}>
          {getStatusIcon(source.status ?? 'inactive')}
          <span className="status-label">{getStatusLabel(source.status ?? 'inactive')}</span>
        </span>
        <span className="source-category">
          {source.category ? source.category : 'Без категории'}
        </span>
      </div>
      <div className="source-card-body">
        <span className="source-name">{source.name}</span>
        <span className="source-url">
          {source.url ? (
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.url}
            </a>
          ) : (
            'Нет ссылки'
          )}
        </span>
        <div className="source-meta">
          <span className="source-updated">
            {source.lastFetched
              ? `Обновлено: ${new Date(source.lastFetched).toLocaleString('ru-RU')}`
              : 'Нет данных об обновлении'}
          </span>
          <span className="source-frequency">
            Частота: {typeof source.updateFrequency === 'number' ? `${source.updateFrequency} мин.` : '—'}
          </span>
          {source.requiresAuth && (
            <span className="source-auth">🔒 Авторизация</span>
          )}
        </div>
        {Array.isArray(source.tags) && source.tags.length > 0 && (
          <div className="source-tags">
            {source.tags.map((tag: string) => (
              <span className="source-tag" key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="source-card-actions">
        <button
          onClick={() => onEdit(source)}
          className="edit-button"
          aria-label="Редактировать источник"
          title="Редактировать"
        >
          <EditIcon />
        </button>
        {onRefresh && (
          <button
            onClick={() => onRefresh(source._id)}
            className="refresh-button"
            aria-label="Обновить источник"
            title="Обновить"
          >
            <RefreshIcon />
          </button>
        )}
        <button
          onClick={() => onDelete(source._id)}
          className="delete-button"
          aria-label="Удалить источник"
          title="Удалить"
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};
