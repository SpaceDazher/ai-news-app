import mongoose, { Document, Schema, Types } from 'mongoose';

// Интерфейс для документа Post
export interface IPost extends Document {
  userId: Types.ObjectId;
  sourceId: Types.ObjectId;
  title?: string; // Заголовок может быть не всегда доступен
  rawText: string;
  publicationDate: Date;
  url?: string; // URL оригинального поста/сообщения
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Ссылка на модель User
      required: true,
      index: true, // Индекс для быстрого поиска постов пользователя
    },
    sourceId: {
      type: Schema.Types.ObjectId,
      ref: 'Source', // Ссылка на модель Source
      required: true,
      index: true, // Индекс для быстрого поиска постов источника
    },
    title: {
      type: String,
      trim: true,
    },
    rawText: {
      type: String,
      required: [true, 'Raw text is required'],
    },
    publicationDate: {
      type: Date,
      required: [true, 'Publication date is required'],
      index: true, // Индекс для сортировки по дате
    },
    url: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Добавляет createdAt и updatedAt
    versionKey: false, // Отключаем поле __v
  }
);

// Предотвращаем создание дублирующей модели, если она уже была скомпилирована
const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
