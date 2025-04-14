import { CollectionStrategy, CollectionResult } from './CollectionStrategy';
import { ISource } from '../../../models/Source';
import axios from 'axios';
import * as crypto from 'crypto';

export class ApiStrategy implements CollectionStrategy {
  async collect(source: ISource): Promise<CollectionResult> {
    try {
      if (!source.url) {
        throw new Error('Source URL is required for API collection');
      }

      const headers: Record<string, string> = {
        ...(source.config?.headers || {})
      };

      // Добавить API-ключ, если есть
      if (source.config?.apiKey) {
        headers['Authorization'] = `Bearer ${source.config.apiKey}`;
      }

      const response = await axios.get(source.url, {
        headers,
        timeout: 15000
      });

      const data = response.data;

      // Определяем структуру ответа
      let items: Record<string, unknown>[] = [];

      if (Array.isArray(data)) {
        items = data as Record<string, unknown>[];
      } else if (data.items || data.articles || data.posts || data.results) {
        items = data.items || data.articles || data.posts || data.results;
      } else {
        items = [data];
      }

      const posts: Partial<import('../../../models/RawPost').IRawPost>[] = items.map((item: Record<string, unknown>) => {
        const title = (item.title || item.headline || item.name || '') as string;
        const content = (item.content || item.body || item.text || item.description || JSON.stringify(item)) as string;
        const link = (item.url || item.link || item.originalUrl || source.url) as string;
        const dateRaw = item.date || item.pubDate || item.published || item.createdAt;
        let publicationDate: Date;
        if (
          typeof dateRaw === 'string' ||
          typeof dateRaw === 'number' ||
          dateRaw instanceof Date
        ) {
          publicationDate = new Date(dateRaw);
        } else {
          publicationDate = new Date();
        }

        const hash = crypto.createHash('md5')
          .update(`${source.url}-${title}-${link}`)
          .digest('hex');

        return {
          sourceId: source._id as import('mongoose').Types.ObjectId,
          userId: source.userId,
          title,
          rawText: content,
          publicationDate,
          originalUrl: link,
          hash
        };
      });

      return {
        success: true,
        posts
      };
    } catch (error: unknown) {
      let errorMessage = 'Unknown error';
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        errorMessage = (error as { message: string }).message;
      }
      console.error(`Error fetching API ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: errorMessage
      };
    }
  }
}
