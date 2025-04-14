import { CollectionStrategy, CollectionResult } from './CollectionStrategy';
import { ISource } from '../../../models/Source';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as crypto from 'crypto';
import puppeteer from 'puppeteer';

interface WebsiteConfig {
  headers?: Record<string, string>;
  selectors?: {
    content?: string;
    title?: string;
    date?: string;
    link?: string;
    [key: string]: string | undefined;
  };
  [key: string]: unknown;
}

export class WebsiteStrategy implements CollectionStrategy {
  async collect(source: ISource): Promise<CollectionResult> {
    try {
      if (!source.url) {
        throw new Error('Source URL is required for Website collection');
      }
      // Сначала пробуем статический парсинг
      const staticResult = await this.scrapeStatic(source);

      // Если неудачно — пробуем динамический
      if (!staticResult.success || staticResult.posts.length === 0) {
        console.log(`Static scraping failed for ${source.url}, trying dynamic...`);
        return await this.scrapeDynamic(source);
      }

      return staticResult;
    } catch (error: unknown) {
      console.error(`Error scraping website ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async scrapeStatic(source: ISource): Promise<CollectionResult> {
    try {
      if (!source.url) {
        throw new Error('Source URL is required for Website static scraping');
      }
      const config = source.config as WebsiteConfig;
      const response = await axios.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          ...(config?.headers || {})
        },
        timeout: 15000
      });

      const html = response.data;
      const $ = cheerio.load(html);
      const posts = this.extractPostsFromHtml($, source);

      return {
        success: true,
        posts
      };
    } catch (error: unknown) {
      console.error(`Static scraping error for ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async scrapeDynamic(source: ISource): Promise<CollectionResult> {
    let browser: import('puppeteer').Browser | null = null;

    try {
      if (!source.url) {
        throw new Error('Source URL is required for Website dynamic scraping');
      }
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      await page.goto(source.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const config = source.config as WebsiteConfig;
      // Ждём селектор контента, если задан
      const contentSelector = config?.selectors?.content;
      if (contentSelector) {
        await page.waitForSelector(contentSelector, { timeout: 5000 })
          .catch(() => console.log(`Content selector not found: ${contentSelector}`));
      }

      const html = await page.content();
      const $ = cheerio.load(html);
      const posts = this.extractPostsFromHtml($, source);

      return {
        success: true,
        posts
      };
    } catch (error: unknown) {
      console.error(`Dynamic scraping error for ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: error instanceof Error ? error.message : String(error)
      };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  private extractPostsFromHtml(
    $: cheerio.CheerioAPI,
    source: ISource
  ): Partial<import('../../../models/RawPost').IRawPost>[] {
    const config = source.config as WebsiteConfig;
    const posts: Partial<import('../../../models/RawPost').IRawPost>[] = [];
    const selectors = (config?.selectors ?? {}) as Record<string, string | undefined>;

    // Дефолтные селекторы
    const titleSelector = selectors.title || 'h1, h2, header';
    const contentSelector = selectors.content || 'article, .content, .post-content';
    const dateSelector = selectors.date || 'time, .date, .published, meta[property="article:published_time"]';
    const linkSelector = selectors.link || 'a.read-more, a.more, .read-link';

    // Извлечение постов по селекторам
    const postElements = $(contentSelector);

    if (postElements.length > 0) {
      postElements.each((_, element) => {
        const $element = $(element);

        const title = $element.find(titleSelector).first().text().trim();
        const content = $element.text().trim();

        let date: string | undefined;
        const dateEl = $element.find(dateSelector);
        if (dateEl.length > 0) {
          date = dateEl.attr('datetime') || dateEl.attr('content') || dateEl.text();
        }

        let link = '';
        const linkEl = $element.find(linkSelector);
        if (linkEl.length > 0) {
          try {
            link = new URL(linkEl.attr('href') || '', source.url!).toString();
          } catch {
            link = source.url!;
          }
        }

        // Хэш для дедупликации
        const hash = crypto.createHash('md5')
          .update(`${source.url}-${title}-${content.substring(0, 100)}`)
          .digest('hex');

        posts.push({
          sourceId: source._id as import('mongoose').Types.ObjectId,
          userId: source.userId,
          title,
          rawText: content,
          publicationDate: date ? new Date(date) : new Date(),
          originalUrl: link || source.url,
          hash
        });
      });
    } else {
      // Если не найдено — вся страница как один пост
      const title = $(titleSelector).first().text().trim();
      const content = $('body').text().trim();

      let date: string | undefined;
      const dateEl = $(dateSelector);
      if (dateEl.length > 0) {
        date = dateEl.attr('datetime') || dateEl.attr('content') || dateEl.text();
      }

      const hash = crypto.createHash('md5')
        .update(`${source.url}-${title}-${content.substring(0, 100)}`)
        .digest('hex');

      posts.push({
        sourceId: source._id as import('mongoose').Types.ObjectId,
        userId: source.userId,
        title,
        rawText: content,
        publicationDate: date ? new Date(date) : new Date(),
        originalUrl: source.url,
        hash
      });
    }

    return posts;
  }
}
