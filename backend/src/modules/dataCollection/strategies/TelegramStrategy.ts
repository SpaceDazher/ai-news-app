import { CollectionStrategy, CollectionResult } from './CollectionStrategy';
import { ISource } from '../../../models/Source';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import * as crypto from 'crypto';
import { Types } from 'mongoose';

// Необходимы переменные окружения для авторизации Telegram API
const API_ID = parseInt(process.env.TELEGRAM_API_ID || '0', 10);
const API_HASH = process.env.TELEGRAM_API_HASH || '';
const SESSION_STRING = process.env.TELEGRAM_SESSION_STRING || '';

export class TelegramStrategy implements CollectionStrategy {
  private client: TelegramClient;

  constructor() {
    const stringSession = new StringSession(SESSION_STRING);

    this.client = new TelegramClient(
      stringSession,
      API_ID,
      API_HASH,
      { connectionRetries: 5 }
    );
  }

  async collect(source: ISource): Promise<CollectionResult> {
    try {
      if (!this.client.connected) {
        await this.client.connect();
      }

      const channelIdentifier = source.identifier;
      if (!channelIdentifier) {
        throw new Error('Telegram source identifier is required');
      }

      const channel = await this.client.getEntity(channelIdentifier);

      const fromDate = source.lastFetchedAt || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const messages = await this.client.getMessages(channel, {
        limit: 100,
        offsetDate: Math.floor(fromDate.getTime() / 1000)
      });

      const posts = messages.map((message: Partial<{ message: string; date: number; id: number; }>) => {
        const channelObj = channel as { id?: { toString(): string }; username?: string };
        const hash = crypto.createHash('md5')
          .update(`telegram-${channelObj.id ? channelObj.id.toString() : ''}-${message.id}`)
          .digest('hex');

        return {
          sourceId: source._id as Types.ObjectId,
          userId: source.userId,
          title: (message.message ?? '').split('\n')[0].substring(0, 100),
          rawText: message.message ?? '',
          publicationDate: message.date ? new Date(message.date * 1000) : new Date(),
          originalUrl: `https://t.me/${channelObj.username ?? ''}/${message.id}`,
          hash
        };
      });

      return {
        success: true,
        posts
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error fetching Telegram channel ${source.identifier}:`, error);
        return {
          success: false,
          posts: [],
          error: error.message
        };
      } else {
        console.error(`Unknown error fetching Telegram channel ${source.identifier}:`, error);
        return {
          success: false,
          posts: [],
          error: 'Unknown error'
        };
      }
    }
  }
}
