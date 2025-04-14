import { CollectionStrategy, CollectionResult } from './CollectionStrategy';
import { ISource } from '../../../models/Source';
import * as Parser from 'rss-parser';
import * as crypto from 'crypto';

export class RssStrategy implements CollectionStrategy {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          ['media:content', 'media'],
          ['content:encoded', 'contentEncoded']
        ]
      }
    });
  }

  async collect(source: ISource): Promise<CollectionResult> {
    try {
      const feed = await this.parser.parseURL(source.url);

      const posts = feed.items.map(item => {
        const content = (item as any).contentEncoded ||
                        item.content ||
                        (item as any)['content:encoded'] ||
                        item.description ||
                        '';

        const hash = crypto.createHash('md5')
          .update(`${source.url}-${item.title}-${item.link}`)
          .digest('hex');

        return {
          sourceId: source._id,
          userId: source.userId,
          title: item.title,
          rawText: content,
          publicationDate: item.pubDate ? new Date(item.pubDate) : new Date(),
          originalUrl: item.link,
          hash
        };
      });

      return {
        success: true,
        posts
      };
    } catch (error: any) {
      console.error(`Error parsing RSS feed ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: error.message
      };
    }
  }
}
