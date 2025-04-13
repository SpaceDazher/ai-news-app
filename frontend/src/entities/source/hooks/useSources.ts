import useSWR from 'swr';
import { fetchSources, addSource, updateSource, deleteSource, refreshSource } from '../api/sourceApi';
import type { ISource, SourceDataPayload } from '../model/types';

export function useSources() {
  const { data, error, mutate, isLoading } = useSWR<ISource[]>('/sources', fetchSources);

  // Добавление источника
  const add = async (sourceData: SourceDataPayload) => {
    const newSource = await addSource(sourceData);
    mutate((prev: ISource[] | undefined) => prev ? [newSource, ...prev] : [newSource], false);
    mutate();
    return newSource;
  };

  // Обновление источника
  const update = async (sourceId: string, sourceData: Partial<SourceDataPayload>) => {
    const updatedSource = await updateSource(sourceId, sourceData);
    mutate((prev: ISource[] | undefined) => prev ? prev.map((s: ISource) => s._id === sourceId ? updatedSource : s) : [updatedSource], false);
    mutate();
    return updatedSource;
  };

  // Удаление источника
  const remove = async (sourceId: string) => {
    await deleteSource(sourceId);
    mutate((prev: ISource[] | undefined) => prev ? prev.filter((s: ISource) => s._id !== sourceId) : [], false);
    mutate();
    return true;
  };

  // Ручное обновление источника
  const refresh = async (sourceId: string) => {
    const result = await refreshSource(sourceId);
    mutate();
    return result;
  };

  return {
    sources: data || [],
    isLoading,
    isError: !!error,
    error,
    addSource: add,
    updateSource: update,
    deleteSource: remove,
    refreshSource: refresh,
    mutate,
  };
}
