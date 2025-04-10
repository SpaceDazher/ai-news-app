// src/features/manageSources/ui/SourceListItem.tsx
import React from 'react';
import type { ISource } from '@/entities/source/model/types';
import './SourceListItem.css'; // Стили будут созданы позже

interface SourceListItemProps {
  source: ISource;
  onEdit: (source: ISource) => void;
  onDelete: (sourceId: string) => void;
}

// Функция для отображения иконки типа источника (пример)
const getSourceTypeIcon = (type: string) => {
  switch (type) {
    case 'website': return '🌐'; // Глобус
    case 'telegram': return '✈️'; // Самолетик
    case 'api': return '⚙️'; // Шестеренка
    default: return '?';
  }
};

// Функция для отображения идентификатора источника
const getSourceIdentifier = (source: ISource) => {
    switch (source.type) {
        case 'website':
        case 'api':
            return source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer">{source.url}</a> : 'N/A';
        case 'telegram':
            return source.identifier || 'N/A';
        default:
            return 'N/A';
    }
};

export const SourceListItem: React.FC<SourceListItemProps> = ({ source, onEdit, onDelete }) => {
  return (
    <li className="source-list-item">
      <div className="source-info">
        <span className="source-icon" title={`Тип: ${source.type}`}>{getSourceTypeIcon(source.type)}</span>
        <span className="source-name">{source.name}</span>
        <span className="source-identifier">{getSourceIdentifier(source)}</span>
      </div>
      <div className="source-actions">
        <button onClick={() => onEdit(source)} className="edit-button" title="Редактировать">✏️</button>
        <button onClick={() => onDelete(source._id)} className="delete-button" title="Удалить">🗑️</button>
      </div>
    </li>
  );
};
