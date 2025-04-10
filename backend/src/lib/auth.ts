// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';
import mongoose from 'mongoose'; // Keep mongoose import if needed elsewhere, otherwise remove
import { IUser } from '../models/User'; // Keep IUser import if needed for generateToken payload typing

import type { JWTPayload } from 'jose'; // Import JWTPayload type from jose

// Our interface for the payload we expect AFTER verification
// It extends the base JWTPayload from jose
interface AppJwtPayload extends JWTPayload {
  userId: string; // Ensure userId is expected
  email?: string; // Optional email
}

// Получаем секрет из переменных окружения и кодируем его
const JWT_SECRET_STRING = process.env.JWT_SECRET || 'your-fallback-secret-for-dev';
if (!JWT_SECRET_STRING) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
  // В реальном приложении здесь лучше выбросить ошибку или завершить процесс
  // throw new Error("JWT_SECRET is not defined.");
}
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Используем '1h' как в примере

// Generate JWT token using jose
export async function generateToken(user: IUser): Promise<string> {
  // Define the payload structure expected by SignJWT
  const payload: JWTPayload = { // Use JWTPayload type here
    userId: (user._id as mongoose.Types.ObjectId).toString(),
    // email: user.email, // Optionally include email if needed in the token payload itself
  };

  // SignJWT expects an object compatible with JWTPayload
  return await new SignJWT(payload) // Pass the payload directly
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
}

// Verify JWT token using jose
export async function verifyToken(token: string): Promise<AppJwtPayload> { // Return our specific AppJwtPayload
  try {
    // jwtVerify returns { payload: JWTPayload, protectedHeader: CompactJWSHeaderParameters }
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Verify that the payload contains userId and it's a string
    if (typeof payload.userId !== 'string') {
        console.error('Decoded JWT payload:', payload); // Log the actual payload
        throw new Error('Invalid token payload: userId missing or not a string.');
    }
    // We've confirmed the structure matches AppJwtPayload
    return payload as AppJwtPayload;
  } catch (error) {
    // Логируем ошибку верификации, чтобы понять причину (истек, невалиден и т.д.)
    console.error('Token verification error:', error instanceof Error ? error.message : error);
    throw error; // Передаем ошибку дальше для обработки в middleware
  }
}

// Извлекаем токен из заголовка Authorization (остается без изменений)
export function getTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }

  // Возвращаем null, если схема не Bearer, чтобы избежать путаницы
  // Если вы ожидаете другие форматы, измените логику
  return null;
  // return authHeader; // Старая логика, менее строгая
}
