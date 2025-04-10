import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose'; // Added import for Types
import AnalysisResultModel from '@/models/AnalysisResult'; // Removed unused IAnalysisResult import
import FolderModel from '@/models/Folder';

// Define a specific type for the query object
interface AnalysisResultQuery {
  sourceId: { $in: Types.ObjectId[] }; // Assuming folder.sourceIds are ObjectIds
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

export async function GET(req: NextRequest, { params }: { params: { folderId: string } }) {
  try {
    const { folderId } = params;
    const url = new URL(req.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    const folder = await FolderModel.findById(folderId);
    if (!folder) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }

    // Use the specific query type instead of any
    const query: AnalysisResultQuery = {
      sourceId: { $in: folder.sourceIds },
    };

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const posts = await AnalysisResultModel.find(query).sort({ createdAt: -1 }).limit(100);

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('GET /api/folders/:folderId/posts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
