import { apiFetch } from '@/shared/api';
import type { ISource, SourceDataPayload } from '../model/types';

export const fetchSources = async (): Promise<ISource[]> => {
  const res = await apiFetch('/sources');
  if (!res.ok) throw new Error('Failed to fetch sources');
  return res.json();
};

export const addSource = async (sourceData: SourceDataPayload): Promise<ISource> => {
  const res = await apiFetch('/sources', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sourceData),
  });
  if (!res.ok) throw new Error('Failed to add source');
  return res.json();
};

export const updateSource = async (sourceId: string, sourceData: Partial<SourceDataPayload>): Promise<ISource> => {
  const res = await apiFetch(`/sources/${sourceId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sourceData),
  });
  if (!res.ok) throw new Error('Failed to update source');
  return res.json();
};

export const deleteSource = async (sourceId: string): Promise<void> => {
  const res = await apiFetch(`/sources/${sourceId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete source');
};
