// src/features/manageSources/ManageSourcesFeature.tsx
import React, { useState } from "react";
import type { ISource, SourceDataPayload } from "@/entities/source/model/types";
import { useSources } from "@/entities/source/hooks/useSources";
import { AddSourceModal } from "./ui/AddSourceModal";
import { SourcesList } from "./ui/SourcesList";
import "./ManageSourcesFeature.css";

export const ManageSourcesFeature: React.FC = () => {
  const {
    sources,
    isLoading,
    isError,
    error,
    addSource,
    updateSource,
    deleteSource,
    refreshSource,
  } = useSources();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<ISource | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Открыть модалку для добавления
  const handleAddClick = () => {
    setEditingSource(null);
    setIsModalOpen(true);
    setFormError(null);
  };

  // Открыть модалку для редактирования
  const handleEditClick = (source: ISource) => {
    setEditingSource(source);
    setIsModalOpen(true);
    setFormError(null);
  };

  // Удаление источника
  const handleDeleteClick = async (sourceId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот источник?")) {
      try {
        await deleteSource(sourceId);
      } catch (e: any) {
        setFormError(e?.message || "Ошибка удаления источника");
      }
    }
  };

  // Добавление/редактирование источника
  const handleModalSubmit = async (data: SourceDataPayload, id?: string) => {
    try {
      if (id) {
        await updateSource(id, data);
      } else {
        await addSource(data);
      }
      setIsModalOpen(false);
      setEditingSource(null);
      setFormError(null);
    } catch (e: any) {
      setFormError(e?.message || "Ошибка сохранения источника");
    }
  };

  // Закрытие модалки
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSource(null);
    setFormError(null);
  };

  // Переключение автообновления
  const handleToggleAutoFetch = async (sourceId: string, value: boolean) => {
    try {
      await updateSource(sourceId, { autoFetch: value });
    } catch (e: any) {
      setFormError(e?.message || "Ошибка обновления автообновления");
    }
  };

  return (
    <div className="manage-sources-feature">
      <button onClick={handleAddClick} className="add-source-button">
        + Добавить источник
      </button>

      {/* Модальное окно добавления/редактирования */}
      {isModalOpen && (
        <AddSourceModal
          source={editingSource}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}

      {/* Ошибки */}
      {(formError || error) && (
        <p className="error-message">{formError || error}</p>
      )}

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
              alert(
                "Не удалось обновить источник. Проверьте соединение или попробуйте позже."
              );
            }
          }}
          onToggleAutoFetch={handleToggleAutoFetch}
        />
      )}
    </div>
  );
};
