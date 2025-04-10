import { NextRequest, NextResponse } from 'next/server';
import AnalysisResultModel from '@/models/AnalysisResult';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id') || 'mock-user-id'; // TODO: получить из JWT

    const results = await AnalysisResultModel.find({ userId }).sort({ createdAt: -1 }).limit(50);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/analysis-results:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
