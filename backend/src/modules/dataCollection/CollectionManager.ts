import { ISource } from '../../models/Source';
import { IRawPost } from '../../models/RawPost';
import { CollectionStrategy } from './strategies/CollectionStrategy';
import { WebsiteStrategy } from './strategies/WebsiteStrategy';
import { RssStrategy } from './strategies/RssStrategy';
import { ApiStrategy } from './strategies/ApiStrategy';
import { TelegramStrategy } from './strategies/TelegramStrategy';
import RawPost from '../../models/RawPost';
import Source from '../../models/Source';
import mongoose from 'mongoose';

export class CollectionManager {
  private strategies: Map<string, CollectionStrategy>;

  constructor() {
    this.strategies = new Map();
    this.strategies.set('website', new WebsiteStrategy());
    this.strategies.set('rss', new RssStrategy());
    this.strategies.set('api', new ApiStrategy());
    this.strategies.set('telegram', new TelegramStrategy());
  }

  public async collectFromSource(source: ISource): Promise<{
    success: boolean;
    count: number;
    error?: string;
  }> {
    try {
      // Получить нужную стратегию
      const strategy = this.strategies.get(source.type);

      if (!strategy) {
        throw new Error(`Unsupported source type: ${source.type}`);
      }

      // Собрать данные
      const result = await strategy.collect(source);

      if (!result.success) {
        return {
          success: false,
          count: 0,
          error: result.error
        };
      }

      // Дедупликация и сохранение постов
      const savedCount = await this.savePostsWithDeduplication(result.posts);

      // Обновить lastFetchedAt
      await Source.findByIdAndUpdate(source._id, {
        lastFetchedAt: new Date()
      });

      return {
        success: true,
        count: savedCount
      };
    } catch (error: any) {
      console.error(`Error collecting from source ${source.name}:`, error);
      return {
        success: false,
        count: 0,
        error: error.message
      };
    }
  }

  public async collectFromAllSources(): Promise<{
    success: boolean;
    total: number;
    failed: number;
  }> {
    try {
      // Получить все источники, требующие сбора
      const sources = await Source.find({
        $or: [
          { lastFetchedAt: null },
          {
            lastFetchedAt: {
              $lt: new Date(Date.now() - (60 * 60 * 1000)) // 60 минут по умолчанию
            }
          }
        ]
      });

      let total = 0;
      let failed = 0;

      for (const source of sources) {
        const result = await this.collectFromSource(source);

        if (result.success) {
          total += result.count;
        } else {
          failed++;
          console.error(`Failed to collect from ${source.name}: ${result.error}`);
        }
      }

      return {
        success: true,
        total,
        failed
      };
    } catch (error: any) {
      console.error('Error collecting from all sources:', error);
      return {
        success: false,
        total: 0,
        failed: 0
      };
    }
  }

  private async savePostsWithDeduplication(
    posts: Partial<IRawPost>[]
  ): Promise<number> {
    if (posts.length === 0) {
      return 0;
    }

    // Получить хэши для дедупликации
    const hashes = posts.map(post => post.hash);

    // Найти существующие посты с такими хэшами
    const existingPosts = await RawPost.find({
      hash: { $in: hashes }
    }).select('hash').lean();

    const existingHashes = new Set(existingPosts.map(post => post.hash));

    // Оставить только уникальные посты
    const uniquePosts = posts.filter(post => !existingHashes.has(post.hash));

    if (uniquePosts.length === 0) {
      return 0;
    }

    await RawPost.insertMany(uniquePosts);

    return uniquePosts.length;
  }
}
