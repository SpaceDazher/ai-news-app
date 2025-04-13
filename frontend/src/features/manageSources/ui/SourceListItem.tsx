// src/features/manageSources/ui/SourceListItem.tsx
import React from 'react';
import type { ISource } from '@/entities/source/model/types';
import './SourceListItem.css';

// SVG-иконки
import {
  RssIcon,
  WebsiteIcon,
  ApiIcon,
  YouTubeIcon,
  TwitterIcon,
  TelegramIcon,
  StatusActiveIcon,
  StatusInactiveIcon,
  StatusErrorIcon,
  StatusWarningIcon,
  EditIcon,
  TrashIcon,
  RefreshIcon,
} from '@/shared/icons/CustomIcons';

// SVG для кнопок

// Получить SVG-иконку по типу источника
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'rss': return <RssIcon size={24} />;
    case 'website': return <WebsiteIcon size={24} />;
    case 'api': return <ApiIcon size={24} />;
    case 'youtube': return <YouTubeIcon size={24} />;
    case 'twitter': return <TwitterIcon size={24} />;
    case 'telegram': return <TelegramIcon size={24} />;
    default: return <WebsiteIcon size={24} />;
  }
};

// Получить SVG-статус
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return <StatusActiveIcon />;
    case 'inactive': return <StatusInactiveIcon />;
    case 'error': return <StatusErrorIcon />;
    case 'warning': return <StatusWarningIcon />;
    default: return <StatusInactiveIcon />;
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
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};
