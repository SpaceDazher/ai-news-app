import mongoose, { Schema, Document } from 'mongoose';

export interface IRawPost extends Document {
  sourceId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  rawText: string;
  publicationDate: Date;
  originalUrl: string;
  collectedAt: Date;
  processed: boolean;
  hash: string; // Для дедупликации
}

const RawPostSchema: Schema = new Schema({
  sourceId: { type: Schema.Types.ObjectId, ref: 'Source', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  rawText: { type: String, required: true },
  publicationDate: { type: Date },
  originalUrl: { type: String },
  collectedAt: { type: Date, default: Date.now },
  processed: { type: Boolean, default: false },
  hash: { type: String, index: true } // Индекс для быстрого поиска дубликатов
}, { timestamps: true });

export default mongoose.models.RawPost || mongoose.model<IRawPost>('RawPost', RawPostSchema);
