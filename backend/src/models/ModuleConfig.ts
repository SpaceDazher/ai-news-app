import mongoose, { Schema, Document } from 'mongoose';

export interface IModuleConfig extends Document {
  moduleId: string;
  name: string;
  description: string;
  isEnabled: boolean;
  prompt?: string;
  parameters?: Record<string, unknown>; // Changed 'any' to 'unknown' for better type safety
}

const ModuleConfigSchema = new Schema<IModuleConfig>(
  {
    moduleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    isEnabled: { type: Boolean, default: true },
    prompt: { type: String },
    parameters: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.models.ModuleConfig || mongoose.model<IModuleConfig>('ModuleConfig', ModuleConfigSchema);
