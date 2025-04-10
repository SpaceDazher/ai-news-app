import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAnalysisResult extends Document {
  userId: Types.ObjectId;
  sourceId: Types.ObjectId;
  rawText: string;
  cleanedText: string;
  category?: string;
  sentiment?: string;
  entities?: Array<{ entity: string; type: string }>;
  summary?: string;
  importanceScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

const AnalysisResultSchema = new Schema<IAnalysisResult>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sourceId: { type: Schema.Types.ObjectId, ref: 'Source', required: true },
    rawText: { type: String, required: true },
    cleanedText: { type: String, required: true },
    category: { type: String },
    sentiment: { type: String },
    entities: [
      {
        entity: String,
        type: String,
      },
    ],
    summary: { type: String },
    importanceScore: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.AnalysisResult ||
  mongoose.model<IAnalysisResult>('AnalysisResult', AnalysisResultSchema);
