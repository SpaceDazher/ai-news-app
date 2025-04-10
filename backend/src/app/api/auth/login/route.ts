import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'; // Добавляем импорт mongoose
import User from '@/models/User'; // Убедитесь, что путь правильный
import { generateToken } from '@/lib/auth'; // Убедитесь, что путь правильный
import dbConnect from '@/lib/mongoose'; // Исправлен импорт
import { AppError, BadRequestError, UnauthorizedError } from '@/lib/errors'; // Исправлен импорт

export async function POST(request: Request) {
  try {
    await dbConnect(); // Исправлен вызов

    const body = await request.json();
    const { email, password } = body;

    // 1. Валидация входных данных
    if (!email || !password) {
      throw new BadRequestError('Email and password are required'); // Используем BadRequestError
    }

    // 2. Поиск пользователя по email
    const user = await User.findOne({ email }).select('+password'); // Включаем пароль для сравнения
    if (!user || !user.password) { // Добавлена проверка наличия user.password
      throw new UnauthorizedError('Invalid email or password'); // Используем UnauthorizedError
    }

    // 3. Сравнение паролей
    // Добавляем '!' к password, т.к. мы уже проверили его наличие выше
    const isPasswordMatch = await bcrypt.compare(password!, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedError('Invalid email or password'); // Используем UnauthorizedError
    }

    // 4. Генерация JWT (используем await, так как generateToken теперь async)
    // Передаем весь объект пользователя в generateToken
    const token = await generateToken(user);

    // 5. Возвращаем токен и данные пользователя (без пароля)
    // Создаем объект пользователя без пароля для ответа
    const userResponse = {
      id: (user._id as mongoose.Types.ObjectId).toString(), // Используем правильное преобразование типа
      email: user.email,
      // Добавьте другие поля пользователя, если они есть и нужны на фронтенде
    };

    return NextResponse.json({ token, user: userResponse }, { status: 200 });

  } catch (error) {
    // Реализуем обработку ошибок здесь
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    // Обработка непредвиденных ошибок
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
