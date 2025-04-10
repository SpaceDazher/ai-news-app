import { NextRequest, NextResponse } from 'next/server';
import FolderModel from '@/models/Folder';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id') || 'mock-user-id'; // TODO: из JWT
    const folders = await FolderModel.find({ userId });
    return NextResponse.json(folders, { status: 200 });
  } catch (error) {
    console.error('GET /api/folders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, sourceIds } = await req.json();
    const userId = req.headers.get('x-user-id') || 'mock-user-id'; // TODO: из JWT

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const folder = await FolderModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      name,
      sourceIds: (sourceIds || []).map((id: string) => new mongoose.Types.ObjectId(id)),
    });

    return NextResponse.json(folder, { status: 201 });
  } catch (error) {
    console.error('POST /api/folders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
