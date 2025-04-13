// src/features/manageSources/ManageSourcesFeature.tsx
import React, { useState } from 'react';
import type { ISource } from '@/entities/source/model/types';
import { useSources } from '@/entities/source/hooks/useSources';
import { AddEditSourceForm } from './ui/AddEditSourceForm';
import { SourcesList } from './ui/SourcesList';
import './ManageSourcesFeature.css';

export const ManageSourcesFeature: React.FC = () => {
  const { sources, isLoading, isError, error, addSource, updateSource, deleteSource, refreshSource } = useSources();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingSource, setEditingSource] = useState<ISource | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleAddClick = () => {
    setEditingSource(null);
    setIsAddFormVisible(true);
    setFormError(null);
  };

  const handleEditClick = (source: ISource) => {
    setEditingSource(source);
    setIsAddFormVisible(true);
    setFormError(null);
  };

  const handleDeleteClick = async (sourceId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот источник?')) {
      try {
        await deleteSource(sourceId);
      } catch (e: any) {
        setFormError(e?.message || 'Ошибка удаления источника');
      }
    }
  };

  const handleFormClose = () => {
    setIsAddFormVisible(false);
    setEditingSource(null);
    setFormError(null);
  };

  // TODO: После перехода на новую AddSourceModal, передавать addSource/updateSource через пропсы

  return (
    <div className="manage-sources-feature">
      <button onClick={handleAddClick} className="add-source-button">
        + Добавить Источник
      </button>

      {/* Модальное окно добавления/редактирования */}
      {isAddFormVisible && (
        <AddEditSourceForm
          source={editingSource}
          onClose={handleFormClose}
          // TODO: onSubmit, addSource, updateSource
        />
      )}

      {/* Ошибки */}
      {(formError || error) && <p className="error-message">{formError || error}</p>}

      {/* Список источников */}
      {isLoading && <p>Загрузка источников...</p>}
      {!isLoading && !isError && (
        <SourcesList
          sources={sources}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onRefresh={async (sourceId: string) => {
            try {
              await refreshSource(sourceId);
            } catch (e) {
              alert('Не удалось обновить источник. Проверьте соединение или попробуйте позже.');
            }
          }}
        />
      )}
    </div>
  );
};
