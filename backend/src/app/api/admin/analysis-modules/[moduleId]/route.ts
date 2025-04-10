import { NextRequest, NextResponse } from 'next/server';
import ModuleConfigModel from '@/models/ModuleConfig';

export async function PUT(req: NextRequest, context: { params: { moduleId: string } }) {
  try {
    const { moduleId } = context.params;
    const body = await req.json();

    const updated = await ModuleConfigModel.findOneAndUpdate(
      { moduleId },
      body,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('PUT /api/admin/analysis-modules/:moduleId error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
