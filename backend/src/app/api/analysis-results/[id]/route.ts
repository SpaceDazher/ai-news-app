import { NextRequest, NextResponse } from 'next/server';
import AnalysisResultModel from '@/models/AnalysisResult';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const result = await AnalysisResultModel.findById(id);

    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/analysis-results/:id:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
