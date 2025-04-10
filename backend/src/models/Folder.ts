import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFolder extends Document {
  userId: Types.ObjectId;
  name: string;
  sourceIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema = new Schema<IFolder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    sourceIds: [{ type: Schema.Types.ObjectId, ref: 'Source' }],
  },
  { timestamps: true }
);

export default mongoose.models.Folder || mongoose.model<IFolder>('Folder', FolderSchema);
