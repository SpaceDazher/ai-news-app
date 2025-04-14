import mongoose, { Schema, Document } from 'mongoose';

export interface ICollectionError extends Document {
  sourceId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  timestamp: Date;
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  metadata?: Record<string, unknown>;
}

const CollectionErrorSchema: Schema = new Schema({
  sourceId: { type: Schema.Types.ObjectId, ref: 'Source', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  errorType: { type: String, required: true },
  errorMessage: { type: String, required: true },
  stackTrace: { type: String },
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });

// Индексы для ускорения поиска по sourceId и userId
CollectionErrorSchema.index({ sourceId: 1, timestamp: -1 });
CollectionErrorSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.models.CollectionError || mongoose.model<ICollectionError>('CollectionError', CollectionErrorSchema);
