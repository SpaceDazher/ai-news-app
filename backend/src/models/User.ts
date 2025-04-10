import mongoose, { Schema, Document, models, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// Интерфейс для документа пользователя (для TypeScript)
export interface IUser extends Document {
  email: string;
  password?: string; // Пароль опционален при извлечении, но обязателен при создании
  createdAt: Date;
  updatedAt: Date;
  // Метод для сравнения паролей
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Схема Mongoose
const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Простая валидация email
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Не возвращать пароль по умолчанию при запросах
    },
  },
  {
    timestamps: true, // Автоматически добавляет createdAt и updatedAt
  }
);

// Middleware (pre-save hook) для хеширования пароля перед сохранением
UserSchema.pre<IUser>('save', async function (next) {
  // Хешируем пароль только если он был изменен (или новый)
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10); // Генерируем соль
    this.password = await bcrypt.hash(this.password, salt); // Хешируем пароль
    next();
  } catch (error: unknown) { // Changed 'Error' to 'unknown' per TS best practices
    next(error as Error); // Cast unknown to Error for next()
  }
});

// Метод для сравнения введенного пароля с хешем в базе данных
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
    // Если у пользователя нет пароля (например, при запросе без select: false), возвращаем false
    if (!this.password) {
        // Возможно, стоит запросить пользователя с паролем явно, если это необходимо
        // const userWithPassword = await mongoose.model('User').findById(this._id).select('+password');
        // if (!userWithPassword || !userWithPassword.password) return false;
        // return bcrypt.compare(candidatePassword, userWithPassword.password);
        // Пока просто возвращаем false, если пароль не загружен
        console.warn(`Attempted to compare password for user ${this.email} without password field selected.`);
        return false;
    }
  return bcrypt.compare(candidatePassword, this.password);
};

// Создаем модель User. Проверяем, не была ли модель уже скомпилирована.
const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
