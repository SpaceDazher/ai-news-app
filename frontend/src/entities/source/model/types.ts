// Типы источников (должны совпадать с backend)
export type SourceType = 'website' | 'telegram' | 'api';

// Интерфейс для объекта источника данных (клиентская сторона)
export interface ISource {
  _id: string; // MongoDB ID
  userId: string; // ID пользователя-владельца
  name: string;
  type: SourceType;
  url?: string;
  identifier?: string;
  createdAt: string; // Даты обычно приходят как строки ISO
  updatedAt: string;
}

// Тип для данных создания/обновления источника (совпадает с API)
export interface SourceDataPayload {
  name: string;
  type: SourceType;
  url?: string;
  identifier?: string;
}
