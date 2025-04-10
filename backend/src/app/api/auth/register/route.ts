import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import { AppError, BadRequestError, ConflictError } from '@/lib/errors';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const token = await generateToken(newUser);

    const userResponse = {
      id: (newUser._id as mongoose.Types.ObjectId).toString(),
      email: newUser.email,
    };

    return NextResponse.json({ token, user: userResponse }, { status: 201 });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    console.error('Register API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
