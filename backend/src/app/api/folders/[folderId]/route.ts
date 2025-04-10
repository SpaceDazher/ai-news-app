import { NextRequest, NextResponse } from 'next/server';
import FolderModel from '@/models/Folder';
import mongoose from 'mongoose';

export async function PUT(req: NextRequest, { params }: { params: { folderId: string } }) {
  try {
    const { folderId } = params;
    const { name, sourceIds } = await req.json();

    const updated = await FolderModel.findByIdAndUpdate(
      folderId,
      {
        name,
        sourceIds: (sourceIds || []).map((id: string) => new mongoose.Types.ObjectId(id)),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('PUT /api/folders/:folderId error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { folderId: string } }) {
  try {
    const { folderId } = params;

    const deleted = await FolderModel.findByIdAndDelete(folderId);

    if (!deleted) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Folder deleted' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/folders/:folderId error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
