export interface CollectionStatus {
  id: string;
  sourceId: string;
  startedAt: string;
  finishedAt?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  count: number;
  error?: string;
}
