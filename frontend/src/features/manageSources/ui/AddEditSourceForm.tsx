// src/features/manageSources/ui/AddEditSourceForm.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/providers/StoreProvider';
import type { ISource, SourceType, SourceDataPayload } from '@/entities/source/model/types';
import { addSourceThunk, updateSourceThunk } from '@/entities/source/model/sourceSlice';
import './AddEditSourceForm.css'; // Стили будут созданы позже

interface AddEditSourceFormProps {
  source?: ISource | null; // Источник для редактирования (null или undefined для добавления)
  onClose: () => void; // Функция для закрытия формы
}

export const AddEditSourceForm: React.FC<AddEditSourceFormProps> = ({ source, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const isEditing = !!source; // Определяем режим (редактирование или добавление)

  // Состояние формы
  const [name, setName] = useState('');
  const [type, setType] = useState<SourceType>('website'); // Тип по умолчанию
  const [url, setUrl] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Предзаполнение формы при редактировании
  useEffect(() => {
    if (isEditing && source) {
      setName(source.name);
      setType(source.type);
      setUrl(source.url || '');
      setIdentifier(source.identifier || '');
    } else {
      // Сброс формы при переключении на добавление
      setName('');
      setType('website');
      setUrl('');
      setIdentifier('');
    }
    setFormError(null); // Сбрасываем ошибку при изменении режима
  }, [source, isEditing]);

  const validateForm = (): boolean => {
    if (!name.trim()) {
        setFormError('Название источника обязательно.');
        return false;
    }
    if (type === 'website' || type === 'api') {
        if (!url.trim()) {
            setFormError('URL обязателен для типа "Сайт" или "API".');
            return false;
        }
        // Простая проверка URL (можно улучшить)
        // Простая проверка URL (можно улучшить)
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
             setFormError('URL должен начинаться с http:// или https://');
             return false;
        }
        try {
            new URL(url); // Проверяем валидность URL
        } catch { // Убираем неиспользуемую переменную _
            setFormError('Некорректный формат URL.');
            return false;
        }
    } else if (type === 'telegram') {
        if (!identifier.trim()) {
            setFormError('Идентификатор обязателен для типа "Telegram".');
            return false;
        }
    }
    setFormError(null);
    return true;
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }

    const sourceData: SourceDataPayload = {
      name: name.trim(),
      type,
      url: (type === 'website' || type === 'api') ? url.trim() : undefined,
      identifier: type === 'telegram' ? identifier.trim() : undefined,
    };

    try {
      if (isEditing && source) {
        // Вызов thunk для обновления
        await dispatch(updateSourceThunk({ sourceId: source._id, sourceData })).unwrap(); // unwrap для обработки ошибок thunk
      } else {
        // Вызов thunk для добавления
        await dispatch(addSourceThunk(sourceData)).unwrap();
      }
      onClose(); // Закрываем форму после успешной операции
    } catch (rejectedValueOrSerializedError) { // Используем стандартное имя переменной
      // Ошибки из rejectWithValue попадают сюда при использовании unwrap()
      const errorMessage = typeof rejectedValueOrSerializedError === 'string'
          ? rejectedValueOrSerializedError
          : 'Не удалось сохранить источник.'; // Сообщение по умолчанию
      setFormError(errorMessage);
      console.error("Form submission error:", rejectedValueOrSerializedError);
    }
  };

  return (
    <div className="add-edit-source-form-overlay">
      <div className="add-edit-source-form-card">
        <h3>{isEditing ? 'Редактировать Источник' : 'Добавить Источник'}</h3>
        <form onSubmit={handleSubmit}>
          {formError && <p className="form-error-message">{formError}</p>}

          <div className="form-group">
            <label htmlFor="source-name">Название</label>
            <input
              type="text"
              id="source-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="source-type">Тип</label>
            <select
              id="source-type"
              value={type}
              onChange={(e) => setType(e.target.value as SourceType)}
              required
              className="form-input"
              disabled={isEditing} // Запрещаем менять тип при редактировании
            >
              <option value="website">Сайт (URL)</option>
              <option value="telegram">Telegram (@username или ссылка)</option>
              <option value="api">API (URL)</option>
            </select>
          </div>

          {(type === 'website' || type === 'api') && (
            <div className="form-group">
              <label htmlFor="source-url">URL</label>
              <input
                type="url"
                id="source-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required={type === 'website' || type === 'api'}
                className="form-input"
                placeholder={type === 'website' ? 'https://example.com/news' : 'https://api.example.com/data'}
              />
            </div>
          )}

          {type === 'telegram' && (
            <div className="form-group">
              <label htmlFor="source-identifier">Идентификатор Telegram</label>
              <input
                type="text"
                id="source-identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required={type === 'telegram'}
                className="form-input"
                placeholder="@channel_name или https://t.me/channel_name"
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="submit-button">
              {isEditing ? 'Сохранить Изменения' : 'Добавить Источник'}
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
