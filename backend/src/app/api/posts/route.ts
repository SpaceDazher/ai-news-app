import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongoose';
import Post from '@/models/Post'; // Импортируем модель Post
import Source from '@/models/Source'; // Импортируем Source для проверки владельца
import { AppError, BadRequestError, UnauthorizedError, NotFoundError } from '@/lib/errors';

// GET /api/posts?sourceId=...&page=...&limit=... - Получить список постов (превью) для источника
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Получаем userId из заголовков (добавлен middleware)
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      throw new UnauthorizedError('User ID not found in request headers');
    }

    // Получаем sourceId из query параметров
    const { searchParams } = request.nextUrl;
    const sourceId = searchParams.get('sourceId');
    if (!sourceId) {
      throw new BadRequestError('sourceId query parameter is required');
    }

    // Валидируем sourceId
    if (!mongoose.Types.ObjectId.isValid(sourceId)) {
        throw new BadRequestError('Invalid sourceId format');
    }

    // Проверяем, принадлежит ли источник текущему пользователю
    const source = await Source.findOne({ _id: sourceId, userId });
    if (!source) {
        throw new NotFoundError('Source not found or does not belong to the user');
    }

    // Параметры пагинации
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    // Находим посты для данного sourceId и userId, исключая rawText
    const posts = await Post.find({ userId, sourceId })
      .select('-rawText') // Исключаем поле rawText
      .sort({ publicationDate: -1 }) // Сортируем по дате публикации (сначала новые)
      .skip(skip)
      .limit(limit);

    // Получаем общее количество постов для пагинации
    const totalPosts = await Post.countDocuments({ userId, sourceId });
    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json({
        posts,
        currentPage: page,
        totalPages,
        totalPosts,
    }, { status: 200 });

  } catch (error: unknown) {
    // Обработка ошибок
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    console.error('GET /api/posts error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
     return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
