import { apiFetch } from '@/shared/api';
import { FetchPostsResponse, FetchPostRawTextResponse } from '../model/types';

interface FetchPostsParams {
  sourceId: string;
  page?: number;
  limit?: number;
}

export const fetchPostsBySource = async (params: FetchPostsParams): Promise<FetchPostsResponse> => {
  const { sourceId, page = 1, limit = 20 } = params;
  const url = `/posts?sourceId=${sourceId}&page=${page}&limit=${limit}`;
  const res = await apiFetch(url);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export const fetchPostRawText = async (postId: string): Promise<FetchPostRawTextResponse> => {
  const res = await apiFetch(`/posts/${postId}/raw`);
  if (!res.ok) throw new Error('Failed to fetch raw text');
  return res.json();
};
