/**
 * Типы источников (должны совпадать с backend и документацией v0.2)
 * 'rss' | 'website' | 'api' | 'social'
 */
export type SourceType = 'rss' | 'website' | 'api' | 'social';

/**
 * Интерфейс для объекта источника данных (клиентская сторона)
 * Расширен по документации v0.2
 */
export interface ISource {
  _id: string; // MongoDB ID
  userId: string; // ID пользователя-владельца
  name: string;
  type: SourceType;
  url?: string;
  identifier?: string;
  createdAt: string; // Даты обычно приходят как строки ISO
  updatedAt: string;

  // Новые поля для расширенного UI и API v0.2
  description?: string; // Описание источника (добавлено для v0.2)
  status?: 'active' | 'inactive' | 'error' | 'warning'; // Статус источника
  category?: string; // Категория (например, "Технологии")
  lastFetched?: string; // Дата последнего обновления (ISO)
  updateFrequency?: number; // Частота обновления в минутах
  requiresAuth?: boolean; // Требуется ли авторизация
  username?: string; // Имя пользователя для авторизации
  password?: string; // Пароль для авторизации
  tags?: string[]; // Теги источника
  autoFetch?: boolean; // Автоматический сбор данных (добавлено для v0.2)
}

// Тип для данных создания/обновления источника (совпадает с API)
export interface SourceDataPayload {
  name: string;
  type: SourceType;
  url?: string;
  identifier?: string;
  // Новые поля для создания/обновления
  description?: string; // Описание источника (добавлено для v0.2)
  category?: string;
  updateFrequency?: number;
  requiresAuth?: boolean;
  username?: string;
  password?: string;
  tags?: string[];
  autoFetch?: boolean; // Автоматический сбор данных (добавлено для v0.2)
}
