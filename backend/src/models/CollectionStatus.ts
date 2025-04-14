import mongoose, { Schema, Document } from 'mongoose';

export interface ICollectionStatus extends Document {
  sourceId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  startedAt: Date;
  finishedAt?: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
  count: number;
  error?: string;
}

const CollectionStatusSchema: Schema = new Schema({
  sourceId: { type: Schema.Types.ObjectId, ref: 'Source', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startedAt: { type: Date, default: Date.now },
  finishedAt: { type: Date },
  status: { type: String, enum: ['pending', 'running', 'completed', 'failed'], required: true },
  count: { type: Number, default: 0 },
  error: { type: String }
}, { timestamps: true });

export default mongoose.models.CollectionStatus || mongoose.model<ICollectionStatus>('CollectionStatus', CollectionStatusSchema);
