// src/features/manageSources/ManageSourcesFeature.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Убираем addSourceThunk, updateSourceThunk
import { fetchSourcesThunk, deleteSourceThunk, clearSourceError } from '@/entities/source/model/sourceSlice';
import type { RootState, AppDispatch } from '@/app/providers/StoreProvider';
import type { ISource } from '@/entities/source/model/types'; // Убираем SourceDataPayload
import { AddEditSourceForm } from './ui/AddEditSourceForm'; // Импортируем форму
import { SourcesList } from './ui/SourcesList'; // Импортируем список
import './ManageSourcesFeature.css';

export const ManageSourcesFeature: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { sources, isLoading, error } = useSelector((state: RootState) => state.sources);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingSource, setEditingSource] = useState<ISource | null>(null);

  // Загружаем источники при монтировании компонента
  useEffect(() => {
    dispatch(fetchSourcesThunk());
  }, [dispatch]);

  const handleAddClick = () => {
    setEditingSource(null); // Сбрасываем редактируемый источник
    setIsAddFormVisible(true); // Показываем форму добавления
    dispatch(clearSourceError()); // Очищаем предыдущие ошибки
  };

  const handleEditClick = (source: ISource) => {
    setEditingSource(source); // Устанавливаем источник для редактирования
    setIsAddFormVisible(true); // Показываем ту же форму, но для редактирования
    dispatch(clearSourceError());
  };

  const handleDeleteClick = (sourceId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот источник?')) {
      dispatch(deleteSourceThunk(sourceId));
    }
  };

  const handleFormClose = () => {
    setIsAddFormVisible(false);
    setEditingSource(null);
  };

  // Убираем handleFormSubmit, т.к. он больше не используется

  return (
    <div className="manage-sources-feature">
      <button onClick={handleAddClick} className="add-source-button">
        + Добавить Источник
      </button>

      {/* Форма добавления/редактирования */}
      {isAddFormVisible && (
        <AddEditSourceForm
            source={editingSource}
            onClose={handleFormClose}
            // onSubmit больше не нужен здесь, т.к. логика внутри формы
        />
      )}

      {/* Отображение ошибок загрузки списка */}
      {error && <p className="error-message">{error}</p>}

      {/* Список источников */}
      {isLoading && <p>Загрузка источников...</p>}
      {!isLoading && !error && (
        <SourcesList
          sources={sources}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onRefresh={async (sourceId: string) => {
            try {
              const res = await fetch(`/api/sources/${sourceId}/refresh`, { method: 'POST' });
              if (!res.ok) throw new Error('Ошибка обновления источника');
              // Можно показать уведомление или обновить только lastFetched, но проще перезагрузить список
              dispatch(fetchSourcesThunk());
            } catch (e) {
              alert('Не удалось обновить источник. Проверьте соединение или попробуйте позже.');
            }
          }}
        />
      )}
    </div>
  );
};
