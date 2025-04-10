import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongoose';
import Source, { ISource } from '@/models/Source';
import { AppError, BadRequestError, UnauthorizedError, NotFoundError } from '@/lib/errors';

interface Params {
  params: { sourceId: string };
}

// Вспомогательная функция для проверки ID и прав доступа
async function findAndAuthorizeSource(sourceId: string, userId: string): Promise<ISource> {
  if (!mongoose.Types.ObjectId.isValid(sourceId)) {
    throw new BadRequestError('Invalid Source ID format');
  }

  const source = await Source.findById(sourceId);

  if (!source) {
    throw new NotFoundError('Source not found');
  }

  // Проверяем, принадлежит ли источник текущему пользователю
  if (source.userId.toString() !== userId) {
    throw new UnauthorizedError('You do not have permission to access this source');
  }

  return source;
}

// PUT /api/sources/:sourceId - Обновить источник
export async function PUT(request: NextRequest, { params }: Params) {
  const { sourceId } = params;
  try {
    await dbConnect();

    // Получаем userId из заголовков
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      throw new UnauthorizedError('User ID not found in request headers');
    }

    // Находим источник и проверяем права доступа
    const source = await findAndAuthorizeSource(sourceId, userId);

    // Получаем данные для обновления из тела запроса
    const body = await request.json();
    // Разрешаем обновление только определенных полей (например, name, url, identifier)
    const allowedUpdates: Partial<ISource> = {};
    if (body.name !== undefined) allowedUpdates.name = body.name;
    if (body.url !== undefined && (source.type === 'website' || source.type === 'api')) allowedUpdates.url = body.url;
    if (body.identifier !== undefined && source.type === 'telegram') allowedUpdates.identifier = body.identifier;
    // Тип источника (type) обычно не меняется после создания

    if (Object.keys(allowedUpdates).length === 0) {
        throw new BadRequestError('No valid fields provided for update');
    }

    // Обновляем документ
    // findByIdAndUpdate вернет старый документ по умолчанию, { new: true } вернет обновленный
    const updatedSource = await Source.findByIdAndUpdate(sourceId, allowedUpdates, {
      new: true, // Вернуть обновленный документ
      runValidators: true, // Запустить валидаторы Mongoose при обновлении
    });

    if (!updatedSource) {
        // Эта проверка на случай, если источник был удален между findById и findByIdAndUpdate
        throw new NotFoundError('Source not found after update attempt');
    }

    return NextResponse.json(updatedSource, { status: 200 });

  } catch (error: unknown) {
    // Обработка ошибок
    if (error instanceof mongoose.Error.ValidationError) {
        // Используем тип ошибки Mongoose для err
        const validationErrors = Object.values(error.errors).map(
             (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => err.message
        );
        return NextResponse.json({ error: 'Validation failed', details: validationErrors }, { status: 400 });
    }
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    console.error(`PUT /api/sources/${sourceId} error:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/sources/:sourceId - Удалить источник
export async function DELETE(request: NextRequest, { params }: Params) {
  const { sourceId } = params;
  try {
    await dbConnect();

    // Получаем userId из заголовков
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      throw new UnauthorizedError('User ID not found in request headers');
    }

    // Находим источник и проверяем права доступа
    await findAndAuthorizeSource(sourceId, userId);

    // Удаляем документ
    const result = await Source.findByIdAndDelete(sourceId);

    if (!result) {
        // Эта проверка на случай, если источник был удален между findAndAuthorizeSource и findByIdAndDelete
        throw new NotFoundError('Source not found during delete attempt');
    }

    // Возвращаем успешный ответ без тела
    return new NextResponse(null, { status: 204 }); // Статус 204 No Content

  } catch (error: unknown) {
    // Обработка ошибок
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    console.error(`DELETE /api/sources/${sourceId} error:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
