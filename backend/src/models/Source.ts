import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

// Типы источников
export type SourceType = 'website' | 'telegram' | 'api';

// Интерфейс для документа источника
export interface ISource extends Document {
  userId: Types.ObjectId; // Ссылка на пользователя-владельца
  name: string; // Название источника (задается пользователем)
  type: SourceType; // Тип источника
  url?: string; // URL для website или API
  identifier?: string; // Идентификатор для Telegram (@username или ссылка)
  createdAt: Date;
  updatedAt: Date;
}

// Схема Mongoose
const SourceSchema: Schema<ISource> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Ссылка на модель User
      required: true,
      index: true, // Индекс для быстрого поиска по пользователю
    },
    name: {
      type: String,
      required: [true, 'Source name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['website', 'telegram', 'api'], // Допустимые значения
      required: [true, 'Source type is required'],
    },
    url: {
      type: String,
      trim: true,
      // Валидация URL может быть добавлена здесь или в API роуте
      // required: function() { return this.type === 'website' || this.type === 'api'; } // Условно обязательное поле
    },
    identifier: {
      type: String,
      trim: true,
      // required: function() { return this.type === 'telegram'; } // Условно обязательное поле
    },
  },
  {
    timestamps: true, // Автоматически добавляет createdAt и updatedAt
    // Добавляем валидацию на уровне схемы, чтобы URL или identifier были обязательны в зависимости от типа
    validateBeforeSave: true, // Включаем валидацию перед сохранением
  }
);

// Дополнительная валидация перед сохранением
SourceSchema.pre('validate', function(next) {
  if (this.type === 'website' || this.type === 'api') {
    if (!this.url) {
      this.invalidate('url', 'URL is required for website or API source type.', this.url);
    }
    this.identifier = undefined; // Очищаем identifier, если тип website/api
  } else if (this.type === 'telegram') {
    if (!this.identifier) {
      this.invalidate('identifier', 'Identifier is required for Telegram source type.', this.identifier);
    }
    this.url = undefined; // Очищаем url, если тип telegram
  }
  next();
});


// Создаем модель Source. Проверяем, не была ли модель уже скомпилирована.
const Source: Model<ISource> = models.Source || mongoose.model<ISource>('Source', SourceSchema);

export default Source;
