import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongoose';
import { verifyToken, getTokenFromHeader } from '../../../../lib/auth';
import Source from '../../../../models/Source';
import { CollectionManager } from '../../../../modules/dataCollection/CollectionManager';

export async function POST(req: NextRequest, { params }: { params: { sourceId: string } }) {
  try {
    await connectToDatabase();

    const authHeader = req.headers.get('authorization');
    const token = getTokenFromHeader(authHeader || undefined);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sourceId } = params;

    if (!sourceId) {
      return NextResponse.json({ error: 'Source ID is required' }, { status: 400 });
    }

    const source = await Source.findOne({
      _id: sourceId,
      userId: user.id
    });

    if (!source) {
      return NextResponse.json({ error: 'Source not found' }, { status: 404 });
    }

    const collectionManager = new CollectionManager();
    const result = await collectionManager.collectFromSource(source);

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Collection failed' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Collection started',
      count: result.count
    }, { status: 202 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in collect API:', error.message);
    } else {
      console.error('Error in collect API:', error);
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
