// frontend/src/entities/post/model/types.ts

export interface IPost {
  id: string; // В MongoDB это _id, но Mongoose часто преобразует его в id
  sourceId: string; // ID источника, к которому принадлежит пост
  title?: string; // Заголовок поста (может отсутствовать)
  rawText: string; // Полный сырой текст поста
  publicationDate: string; // Дата публикации в формате ISO строки
  url?: string; // URL оригинального поста (если применимо)
  // Дополнительные поля, если они будут возвращаться API для превью
  // Например, краткое превью текста, если оно генерируется на бэке
  // previewText?: string;
}

export interface PostState {
  postsBySource: {
    [sourceId: string]: IPost[];
  };
  currentRawText: string | null;
  isLoadingList: boolean;
  isLoadingRawText: boolean;
  error: string | null;
}

// Тип для ответа API при получении списка постов
export interface FetchPostsResponse {
  posts: Omit<IPost, 'rawText'>[]; // Список постов без полного текста
  totalPages: number;
  currentPage: number;
}

// Тип для ответа API при получении сырого текста
export interface FetchPostRawTextResponse {
  rawText: string;
}
