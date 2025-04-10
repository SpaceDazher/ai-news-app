import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import AnalysisResultModel from '@/models/AnalysisResult';
import { cleanText } from '@/modules/textPreprocessing';
import { classifyText, getDefaultLLM as getLLMForClassification } from '@/modules/textClassification';
import { analyzeSentiment, getDefaultLLM as getLLMForSentiment } from '@/modules/sentimentAnalysis';

// TODO: подключить Socket.IO сервер
// import { io } from '@/lib/socket';

export async function POST(req: NextRequest) {
  try {
    const { rawText, sourceId, categories = ['Политика', 'Экономика', 'Общество', 'Спорт', 'Культура'] } = await req.json();

    if (!rawText || typeof rawText !== 'string') {
      return NextResponse.json({ error: 'rawText is required' }, { status: 400 });
    }

    const userId = req.headers.get('x-user-id') || 'mock-user-id'; // TODO: получить из JWT

    const cleaned = cleanText(rawText);

    const llmClassification = getLLMForClassification();
    const llmSentiment = getLLMForSentiment();

    const [category, sentiment] = await Promise.all([
      classifyText(llmClassification, cleaned, categories),
      analyzeSentiment(llmSentiment, cleaned),
    ]);

    const analysisResult = await AnalysisResultModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      sourceId: new mongoose.Types.ObjectId(sourceId),
      rawText,
      cleanedText: cleaned,
      category,
      sentiment,
    });

    // TODO: emit через Socket.IO
    // io.emit('analysis-update', { id: analysisResult._id, category, sentiment });

    return NextResponse.json(
      {
        message: 'Text accepted for processing',
        analysisId: analysisResult._id,
        category,
        sentiment,
      },
      { status: 202 }
    );
  } catch (error) {
    console.error('Error in /api/processText:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
