import { NextRequest, NextResponse } from 'next/server';
import ModuleConfigModel from '@/models/ModuleConfig';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) { // Added eslint disable comment for unused var
  try {
    const modules = await ModuleConfigModel.find();
    return NextResponse.json(modules, { status: 200 });
  } catch (error) {
    console.error('GET /api/admin/analysis-modules error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
