// src/features/manageSources/ui/SourcesList.tsx
import React from 'react';
import type { ISource } from '@/entities/source/model/types';
import { SourceListItem } from './SourceListItem';
import './SourcesList.css'; // Стили будут созданы позже

interface SourcesListProps {
  sources: ISource[];
  onEdit: (source: ISource) => void;
  onDelete: (sourceId: string) => void;
}

export const SourcesList: React.FC<SourcesListProps> = ({ sources, onEdit, onDelete }) => {
  if (sources.length === 0) {
    return <p className="no-sources-message">Источники еще не добавлены.</p>;
  }

  return (
    <div className="sources-list-container">
      <h3>Список Источников</h3>
      <ul className="sources-list">
        {sources.map(source => (
          <SourceListItem
            key={source._id}
            source={source}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};
