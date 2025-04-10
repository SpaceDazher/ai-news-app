import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongoose';
import Post from '@/models/Post'; // Импортируем модель Post
import { AppError, UnauthorizedError, NotFoundError, BadRequestError } from '@/lib/errors';

// Интерфейс для параметров маршрута
interface RouteParams {
  postId: string;
}

// GET /api/posts/:postId/raw - Получить сырой текст поста
export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams } // Получаем postId из параметров маршрута
) {
  try {
    await dbConnect();

    // Получаем userId из заголовков (добавлен middleware)
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      throw new UnauthorizedError('User ID not found in request headers');
    }

    // Получаем postId из параметров URL
    const { postId } = params;

    // Валидируем postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new BadRequestError('Invalid postId format');
    }

    // Находим пост по ID и userId, чтобы убедиться, что он принадлежит пользователю
    // Выбираем только поле rawText
    const post = await Post.findOne({ _id: postId, userId }).select('rawText');

    if (!post) {
      // Если пост не найден или не принадлежит пользователю
      throw new NotFoundError('Post not found or does not belong to the user');
    }

    // Возвращаем только сырой текст
    return NextResponse.json({ rawText: post.rawText }, { status: 200 });

  } catch (error: unknown) {
    // Обработка ошибок
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    console.error(`GET /api/posts/${params?.postId}/raw error:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
