import { ISource } from '../../../models/Source';
import { IRawPost } from '../../../models/RawPost';

export interface CollectionResult {
  success: boolean;
  posts: Partial<IRawPost>[];
  error?: string;
}

export interface CollectionStrategy {
  collect(source: ISource): Promise<CollectionResult>;
}
