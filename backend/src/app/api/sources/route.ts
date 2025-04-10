import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mongoose from 'mongoose'; // Добавляем импорт mongoose
import dbConnect from '@/lib/mongoose';
import Source, { ISource } from '@/models/Source'; // Импортируем модель и интерфейс
import { AppError, BadRequestError, UnauthorizedError } from '@/lib/errors';

// GET /api/sources - Получить список источников пользователя
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    console.log('Request headers for /api/sources:', request.headers); // <--- Добавляем лог

    // Получаем userId из заголовков, добавленных middleware
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      throw new UnauthorizedError('User ID not found in request headers');
    }

    // Находим все источники для данного пользователя
    const sources = await Source.find({ userId }).sort({ createdAt: -1 }); // Сортируем по дате создания

    return NextResponse.json(sources, { status: 200 });

  } catch (error: unknown) {
    // Обработка ошибок
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    console.error('GET /api/sources error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/sources - Создать новый источник
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Получаем userId из заголовков
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      throw new UnauthorizedError('User ID not found in request headers');
    }

    // Получаем данные из тела запроса
    const body = await request.json();
    const { name, type, url, identifier } = body;

    // Валидация базовых полей (остальная валидация в схеме Mongoose)
    if (!name || !type) {
      throw new BadRequestError('Source name and type are required');
    }

    // Создаем новый источник, привязывая его к пользователю
    const newSourceData: Partial<ISource> = {
      userId: new mongoose.Types.ObjectId(userId), // Преобразуем строку ID в ObjectId
      name,
      type,
      url: type === 'website' || type === 'api' ? url : undefined,
      identifier: type === 'telegram' ? identifier : undefined,
    };

    // Mongoose выполнит валидацию url/identifier на основе type перед сохранением
    const newSource = await Source.create(newSourceData);

    return NextResponse.json(newSource, { status: 201 }); // Статус 201 Created

  } catch (error: unknown) {
     // Обработка ошибок, включая ошибки валидации Mongoose
    if (error instanceof mongoose.Error.ValidationError) {
        // Собираем сообщения об ошибках валидации
        // Используем тип ошибки Mongoose для err
        const validationErrors = Object.values(error.errors).map(
            (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => err.message
        );
        return NextResponse.json({ error: 'Validation failed', details: validationErrors }, { status: 400 });
    }
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    console.error('POST /api/sources error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
