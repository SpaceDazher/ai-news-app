---
date: 2025-04-07
---
---
 The data collection module will be integrated into the existing Next.js-based backend architecture. The module will work as follows:

1. **Data Sources**: Fetch from configured sources in the MongoDB database (managed through the ManageSourcesPage)
2. **Collection Process**: Implement specialized collectors for different source types (websites, APIs, Telegram)
3. **Storage**: Store raw data in MongoDB for further processing
4. **Processing Pipeline**: Connect with existing analysis modules
5. **Scheduling**: Implement a scheduling system using either built-in cron-like functionality or a dedicated task queue

### System Components Diagram

```
┌─────────────────┐      ┌──────────────────┐      ┌────────────────────┐
│  Source Config  │      │  Data Collection │      │  Data Processing   │
│  (MongoDB)      │─────▶│  Module          │─────▶│  Pipeline          │
└─────────────────┘      └──────────────────┘      └────────────────────┘
                               │    ▲
                               │    │
                               ▼    │
┌─────────────────┐      ┌──────────────────┐      ┌────────────────────┐
│  External       │      │  Collection      │      │  Raw Posts Storage │
│  Data Sources   │◀────▶│  Strategies      │─────▶│  (MongoDB)         │
└─────────────────┘      └──────────────────┘      └────────────────────┘
```

## 2. Data Source Collection Implementation

### 2.1 Source Entity Enhancement

Based on the current Source model, we'll enhance it to support additional properties for scraping:

```typescript
// models/Source.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISource extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: 'website' | 'telegram' | 'api';
  url?: string;
  identifier?: string;
  lastFetchedAt?: Date;
  config?: {
    selectors?: {
      title?: string;
      content?: string;
      date?: string;
      link?: string;
    };
    apiKey?: string;
    headers?: Record<string, string>;
    fetchInterval?: number; // in minutes
  };
}

const SourceSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['website', 'telegram', 'api'], required: true },
  url: { type: String },
  identifier: { type: String },
  lastFetchedAt: { type: Date, default: null },
  config: {
    selectors: {
      title: { type: String },
      content: { type: String },
      date: { type: String },
      link: { type: String }
    },
    apiKey: { type: String },
    headers: { type: Schema.Types.Mixed },
    fetchInterval: { type: Number, default: 60 } // 60 minutes default
  }
}, { timestamps: true });

export default mongoose.models.Source || mongoose.model<ISource>('Source', SourceSchema);
```

### 2.2 Raw Post Model

We'll create a model to store the raw data collected before processing:

```typescript
// models/RawPost.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRawPost extends Document {
  sourceId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  rawText: string;
  publicationDate: Date;
  originalUrl: string;
  collectedAt: Date;
  processed: boolean;
  hash: string; // For deduplication
}

const RawPostSchema: Schema = new Schema({
  sourceId: { type: Schema.Types.ObjectId, ref: 'Source', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  rawText: { type: String, required: true },
  publicationDate: { type: Date },
  originalUrl: { type: String },
  collectedAt: { type: Date, default: Date.now },
  processed: { type: Boolean, default: false },
  hash: { type: String, index: true } // Create index for faster deduplication lookup
}, { timestamps: true });

export default mongoose.models.RawPost || mongoose.model<IRawPost>('RawPost', RawPostSchema);
```

## 3. Collection Strategies Implementation

I'll implement a Strategy Pattern for different collection methods:

```typescript
// modules/dataCollection/strategies/CollectionStrategy.ts
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
```

### 3.1 Website Scraping Strategy

For websites, we'll implement both static and dynamic scraping:

```typescript
// modules/dataCollection/strategies/WebsiteStrategy.ts
import { CollectionStrategy, CollectionResult } from './CollectionStrategy';
import { ISource } from '../../../models/Source';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as crypto from 'crypto';
import puppeteer from 'puppeteer';

export class WebsiteStrategy implements CollectionStrategy {
  async collect(source: ISource): Promise<CollectionResult> {
    try {
      // Try static scraping first
      const staticResult = await this.scrapeStatic(source);
      
      // If static scraping failed or returned no content, try dynamic
      if (!staticResult.success || staticResult.posts.length === 0) {
        console.log(`Static scraping failed for ${source.url}, trying dynamic...`);
        return await this.scrapeDynamic(source);
      }
      
      return staticResult;
    } catch (error) {
      console.error(`Error scraping website ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: error.message
      };
    }
  }
  
  private async scrapeStatic(source: ISource): Promise<CollectionResult> {
    try {
      const response = await axios.get(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          ...source.config?.headers
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
    } catch (error) {
      console.error(`Static scraping error for ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: error.message
      };
    }
  }
  
  private async scrapeDynamic(source: ISource): Promise<CollectionResult> {
    let browser = null;
    
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      await page.goto(source.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      
      // Wait for content selectors
      if (source.config?.selectors?.content) {
        await page.waitForSelector(source.config.selectors.content, { timeout: 5000 })
          .catch(() => console.log(`Content selector not found: ${source.config.selectors.content}`));
      }
      
      const html = await page.content();
      const $ = cheerio.load(html);
      const posts = this.extractPostsFromHtml($, source);
      
      return {
        success: true,
        posts
      };
    } catch (error) {
      console.error(`Dynamic scraping error for ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: error.message
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
  ): Partial<IRawPost>[] {
    const posts: Partial<IRawPost>[] = [];
    const selectors = source.config?.selectors || {};
    
    // Default selectors if none provided
    const titleSelector = selectors.title || 'h1, h2, header';
    const contentSelector = selectors.content || 'article, .content, .post-content';
    const dateSelector = selectors.date || 'time, .date, .published, meta[property="article:published_time"]';
    const linkSelector = selectors.link || 'a.read-more, a.more, .read-link';
    
    // Extract post based on provided selectors
    const postElements = $(contentSelector);
    
    if (postElements.length > 0) {
      // Handle case where content selector returns individual posts
      postElements.each((_, element) => {
        const $element = $(element);
        
        const title = $element.find(titleSelector).first().text().trim();
        const content = $element.text().trim();
        
        let date = null;
        const dateEl = $element.find(dateSelector);
        if (dateEl.length > 0) {
          date = dateEl.attr('datetime') || dateEl.attr('content') || dateEl.text();
        }
        
        let link = '';
        const linkEl = $element.find(linkSelector);
        if (linkEl.length > 0) {
          link = new URL(linkEl.attr('href'), source.url).toString();
        }
        
        // Generate a hash for deduplication
        const hash = crypto.createHash('md5')
          .update(`${source.url}-${title}-${content.substring(0, 100)}`)
          .digest('hex');
        
        posts.push({
          sourceId: source._id,
          userId: source.userId,
          title,
          rawText: content,
          publicationDate: date ? new Date(date) : new Date(),
          originalUrl: link || source.url,
          hash
        });
      });
    } else {
      // If no posts found with specific selectors, treat the whole page as one post
      const title = $(titleSelector).first().text().trim();
      const content = $('body').text().trim();
      
      let date = null;
      const dateEl = $(dateSelector);
      if (dateEl.length > 0) {
        date = dateEl.attr('datetime') || dateEl.attr('content') || dateEl.text();
      }
      
      // Generate a hash for deduplication
      const hash = crypto.createHash('md5')
        .update(`${source.url}-${title}-${content.substring(0, 100)}`)
        .digest('hex');
      
      posts.push({
        sourceId: source._id,
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
```

### 3.2 RSS Strategy

For RSS feeds:

```typescript
// modules/dataCollection/strategies/RssStrategy.ts
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
        // Get content from various possible fields
        const content = item.contentEncoded || 
                        item.content || 
                        item['content:encoded'] || 
                        item.description || 
                        '';
        
        // Generate hash for deduplication
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
    } catch (error) {
      console.error(`Error parsing RSS feed ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: error.message
      };
    }
  }
}
```

### 3.3 API Strategy

For external APIs:

```typescript
// modules/dataCollection/strategies/ApiStrategy.ts
import { CollectionStrategy, CollectionResult } from './CollectionStrategy';
import { ISource } from '../../../models/Source';
import axios from 'axios';
import * as crypto from 'crypto';

export class ApiStrategy implements CollectionStrategy {
  async collect(source: ISource): Promise<CollectionResult> {
    try {
      const headers: Record<string, string> = {
        ...source.config?.headers
      };
      
      // Add API key if present
      if (source.config?.apiKey) {
        headers['Authorization'] = `Bearer ${source.config.apiKey}`;
      }
      
      const response = await axios.get(source.url, {
        headers,
        timeout: 15000
      });
      
      const data = response.data;
      
      // Handle different API response formats
      let items = [];
      
      if (Array.isArray(data)) {
        items = data;
      } else if (data.items || data.articles || data.posts || data.results) {
        items = data.items || data.articles || data.posts || data.results;
      } else {
        // If we can't determine the structure, treat the whole response as one item
        items = [data];
      }
      
      const posts = items.map(item => {
        // Try to extract common fields based on typical API responses
        const title = item.title || item.headline || item.name || '';
        const content = item.content || item.body || item.text || item.description || JSON.stringify(item);
        const link = item.url || item.link || item.originalUrl || source.url;
        const date = item.date || item.pubDate || item.published || item.createdAt || new Date();
        
        // Generate hash for deduplication
        const hash = crypto.createHash('md5')
          .update(`${source.url}-${title}-${link}`)
          .digest('hex');
        
        return {
          sourceId: source._id,
          userId: source.userId,
          title,
          rawText: content,
          publicationDate: new Date(date),
          originalUrl: link,
          hash
        };
      });
      
      return {
        success: true,
        posts
      };
    } catch (error) {
      console.error(`Error fetching API ${source.url}:`, error);
      return {
        success: false,
        posts: [],
        error: error.message
      };
    }
  }
}
```

### 3.4 Telegram Strategy

For Telegram channels:

```typescript
// modules/dataCollection/strategies/TelegramStrategy.ts
import { CollectionStrategy, CollectionResult } from './CollectionStrategy';
import { ISource } from '../../../models/Source';
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import * as crypto from 'crypto';

// You'll need to set up these environment variables
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
      
      // Parse the channel identifier
      const channelIdentifier = source.identifier;
      
      // Get channel entity
      const channel = await this.client.getEntity(channelIdentifier);
      
      // Calculate the date from which to fetch messages
      const fromDate = source.lastFetchedAt || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Default: 1 week ago
      
      // Fetch messages
      const messages = await this.client.getMessages(channel, {
        limit: 100, // Adjust based on your needs
        offsetDate: fromDate
      });
      
      const posts = messages.map(message => {
        // Generate a hash for deduplication
        const hash = crypto.createHash('md5')
          .update(`telegram-${channel.id}-${message.id}`)
          .digest('hex');
        
        return {
          sourceId: source._id,
          userId: source.userId,
          title: message.message.split('\n')[0].substring(0, 100), // First line as title
          rawText: message.message,
          publicationDate: new Date(message.date * 1000), // Telegram date is in seconds
          originalUrl: `https://t.me/${channel.username}/${message.id}`,
          hash
        };
      });
      
      return {
        success: true,
        posts
      };
    } catch (error) {
      console.error(`Error fetching Telegram channel ${source.identifier}:`, error);
      return {
        success: false,
        posts: [],
        error: error.message
      };
    }
  }
}
```

## 4. Collection Manager Implementation

This will handle the overall collection process and strategy selection:

```typescript
// modules/dataCollection/CollectionManager.ts
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
      // Get the appropriate strategy
      const strategy = this.strategies.get(source.type);
      
      if (!strategy) {
        throw new Error(`Unsupported source type: ${source.type}`);
      }
      
      // Collect data
      const result = await strategy.collect(source);
      
      if (!result.success) {
        return {
          success: false,
          count: 0,
          error: result.error
        };
      }
      
      // Deduplicate and save posts
      const savedCount = await this.savePostsWithDeduplication(result.posts);
      
      // Update the source's lastFetchedAt
      await Source.findByIdAndUpdate(source._id, {
        lastFetchedAt: new Date()
      });
      
      return {
        success: true,
        count: savedCount
      };
    } catch (error) {
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
      // Get all sources that need fetching based on their interval
      const sources = await Source.find({
        $or: [
          { lastFetchedAt: null },
          { 
            lastFetchedAt: { 
              $lt: new Date(Date.now() - (source.config?.fetchInterval || 60) * 60 * 1000) 
            } 
          }
        ]
      });
      
      let total = 0;
      let failed = 0;
      
      // Process each source
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
    } catch (error) {
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
    
    // Extract hashes for deduplication check
    const hashes = posts.map(post => post.hash);
    
    // Find existing posts with the same hashes
    const existingPosts = await RawPost.find({
      hash: { $in: hashes }
    }).select('hash').lean();
    
    // Create a set of existing hashes for quick lookup
    const existingHashes = new Set(existingPosts.map(post => post.hash));
    
    // Filter out duplicates
    const uniquePosts = posts.filter(post => !existingHashes.has(post.hash));
    
    if (uniquePosts.length === 0) {
      return 0;
    }
    
    // Save new posts
    await RawPost.insertMany(uniquePosts);
    
    return uniquePosts.length;
  }
}
```

## 5. Scheduling and Integration

### 5.1 Setting up a Scheduler with BullMQ

```typescript
// modules/dataCollection/scheduler.ts
import { Queue, Worker, QueueScheduler } from 'bullmq';
import { CollectionManager } from './CollectionManager';
import Source from '../../models/Source';
import mongoose from 'mongoose';

// Connect to Redis
const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10)
};

// Create the queue and scheduler
const dataCollectionQueue = new Queue('data-collection', { connection });
const scheduler = new QueueScheduler('data-collection', { connection });

// Initialize collection manager
const collectionManager = new CollectionManager();

// Define the worker
const worker = new Worker('data-collection', async job => {
  switch (job.name) {
    case 'collect-from-source':
      const { sourceId } = job.data;
      const source = await Source.findById(sourceId);
      
      if (!source) {
        throw new Error(`Source not found: ${sourceId}`);
      }
      
      return await collectionManager.collectFromSource(source);
      
    case 'collect-from-all':
      return await collectionManager.collectFromAllSources();
      
    default:
      throw new Error(`Unknown job name: ${job.name}`);
  }
}, { connection });

// Handle worker events
worker.on('completed', job => {
  console.log(`Job ${job.id} completed with result:`, job.returnvalue);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error:`, err);
});

// Setup recurring jobs
export async function setupRecurringJobs() {
  // Clean existing recurring jobs
  const repeatableJobs = await dataCollectionQueue.getRepeatableJobs();
  for (const job of repeatableJobs) {
    await dataCollectionQueue.removeRepeatableByKey(job.key);
  }
  
  // Add collect-from-all job to run every hour
  await dataCollectionQueue.add('collect-from-all', {}, {
    repeat: {
      pattern: '0 * * * *' // Every hour
    }
  });
  
  // Add individual source jobs
  const sources = await Source.find().select('_id config.fetchInterval');
  
  for (const source of sources) {
    const interval = source.config?.fetchInterval || 60; // Default: 60 minutes
    
    await dataCollectionQueue.add('collect-from-source', {
      sourceId: source._id
    }, {
      repeat: {
        pattern: `*/${interval} * * * *` // Every X minutes (cron format)
      }
    });
  }
}

// Export functions for manual triggering
export async function triggerCollectionForSource(sourceId: string) {
  return await dataCollectionQueue.add('collect-from-source', { sourceId });
}

export async function triggerCollectionForAllSources() {
  return await dataCollectionQueue.add('collect-from-all', {});
}
```

### 5.2 API Endpoint for Manual Collection

```typescript
// pages/api/sources/[sourceId]/collect.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { triggerCollectionForSource } from '../../../../modules/dataCollection/scheduler';
import { connectToDatabase } from '../../../../lib/mongoose';
import { verifyToken } from '../../../../lib/auth';
import Source from '../../../../models/Source';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Connect to database
    await connectToDatabase();
    
    // Verify authentication
    const user = await verifyToken(req);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get source ID from URL
    const { sourceId } = req.query;
    
    if (!sourceId || typeof sourceId !== 'string') {
      return res.status(400).json({ error: 'Source ID is required' });
    }
    
    // Verify source belongs to user
    const source = await Source.findOne({
      _id: sourceId,
      userId: user.id
    });
    
    if (!source) {
      return res.status(404).json({ error: 'Source not found' });
    }
    
    // Trigger collection
    const job = await triggerCollectionForSource(sourceId);
    
    return res.status(202).json({
      message: 'Collection started',
      jobId: job.id
    });
  } catch (error) {
    console.error('Error in collect API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

### 5.3 Integration with Next.js App Initialization

```typescript
// server.js (custom Next.js server)
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { setupRecurringJobs } = require('./modules/dataCollection/scheduler');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Initialize data collection scheduler
  setupRecurringJobs()
    .then(() => console.log('Data collection jobs scheduled'))
    .catch(err => console.error('Error scheduling collection jobs:', err));
  
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

## 6. Frontend Integration

### 6.1 Enhanced ManageSourcesPage with Collection Controls

Add a "Collect Now" button to the Source management UI:

```tsx
// components/SourceCardWidget.tsx
import React from 'react';
import { useSourceCollect } from '../features/manageSources/hooks/useSourceCollect';

interface SourceCardWidgetProps {
  source: {
    id: string;
    name: string;
    type: string;
    url?: string;
    identifier?: string;
    lastFetchedAt?: string;
  };
  onEdit: (sourceId: string) => void;
  onDelete: (sourceId: string) => void;
}

export const SourceCardWidget: React.FC<SourceCardWidgetProps> = ({
  source,
  onEdit,
  onDelete
}) => {
  const { collectFromSource, isCollecting, error } = useSourceCollect();
  
  const handleCollectClick = async () => {
    await collectFromSource(source.id);
  };
  
  return (
    <div className="source-card">
      <div className="source-details">
        <h3>{source.name}</h3>
        <p>Type: {source.type}</p>
        {source.url && <p>URL: {source.url}</p>}
        {source.identifier && <p>Identifier: {source.identifier}</p>}
        <p>Last Collected: {source.lastFetchedAt ? new Date(source.lastFetchedAt).toLocaleString() : 'Never'}</p>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="source-actions">
        <button onClick={() => onEdit(source.id)}>Edit</button>
        <button onClick={() => onDelete(source.id)}>Delete</button>
        <button 
          onClick={handleCollectClick} 
          disabled={isCollecting}
        >
          {isCollecting ? 'Collecting...' : 'Collect Now'}
        </button>
      </div>
    </div>
  );
};
```

### 6.2 Source Collection Hook

```tsx
// features/manageSources/hooks/useSourceCollect.ts
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sourcesActions } from '../../../entities/source/model/slice';
import { selectSourceById } from '../../../entities/source/model/selectors';
import { api } from '../../../shared/api';

export const useSourceCollect = () => {
  const [isCollecting, setIsCollecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const collectFromSource = async (sourceId: string) => {
    setIsCollecting(true);
    setError(null);
    
    try {
      const response = await api.post(`/sources/${sourceId}/collect`);
      
      if (response.status === 202) {
        // Update the source's lastFetchedAt in Redux store
        dispatch(sourcesActions.updateSource({
          id: sourceId,
          changes: {
            lastFetchedAt: new Date().toISOString()
          }
        }));
        
        return true;
      } else {
        throw new Error('Failed to start collection');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to collect data');
      console.error('Collection error:', err);
      return false;
    } finally {
      setIsCollecting(false);
    }
  };
  
  return {
    collectFromSource,
    isCollecting,
    error
  };
};
```

### 6.3 Redux Integration for Source Entity

Enhance the source slice to handle lastFetchedAt updates:

```tsx
// entities/source/model/slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../shared/api';
import { ISource } from './types';

interface SourcesState {
  entities: Record<string, ISource>;
  ids: string[];
  loading: boolean;
  error: string | null;
}

const initialState: SourcesState = {
  entities: {},
  ids: [],
  loading: false,
  error: null
};

export const fetchSources = createAsyncThunk(
  'sources/fetchSources',
  async () => {
    const response = await api.get('/sources');
    return response.data;
  }
);

export const addSource = createAsyncThunk(
  'sources/addSource',
  async (sourceData: Partial<ISource>) => {
    const response = await api.post('/sources', sourceData);
    return response.data;
  }
);

export const updateSource = createAsyncThunk(
  'sources/updateSource',
  async ({ id, data }: { id: string, data: Partial<ISource> }) => {
    const response = await api.put(`/sources/${id}`, data);
    return response.data;
  }
);

export const deleteSource = createAsyncThunk(
  'sources/deleteSource',
  async (id: string) => {
    await api.delete(`/sources/${id}`);
    return id;
  }
);

const sourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    updateSource: (state, action: PayloadAction<{ id: string, changes: Partial<ISource> }>) => {
      const { id, changes } = action.payload;
      if (state.entities[id]) {
        state.entities[id] = { ...state.entities[id], ...changes };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = {};
        state.ids = [];
        
        action.payload.forEach((source: ISource) => {
          state.entities[source.id] = source;
          state.ids.push(source.id);
        });
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch sources';
      })
      .addCase(addSource.fulfilled, (state, action) => {
        const source = action.payload;
        state.entities[source.id] = source;
        state.ids.push(source.id);
      })
      .addCase(updateSource.fulfilled, (state, action) => {
        const source = action.payload;
        state.entities[source.id] = source;
      })
      .addCase(deleteSource.fulfilled, (state, action) => {
        const id = action.payload;
        delete state.entities[id];
        state.ids = state.ids.filter(sourceId => sourceId !== id);
      });
  }
});

export const sourcesActions = sourcesSlice.actions;
export default sourcesSlice.reducer;
```

## 7. Enhanced Source Form for Scraping Configuration

To allow users to configure the selectors and other parameters for scraping:

```tsx
// features/manageSources/ui/WebsiteForm.tsx
import React, { useState } from 'react';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

interface WebsiteFormProps {
  initialData?: {
    name?: string;
    url?: string;
    config?: {
      selectors?: {
        title?: string;
        content?: string;
        date?: string;
        link?: string;
      };
      fetchInterval?: number;
    };
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const WebsiteForm: React.FC<WebsiteFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    url: initialData.url || '',
    config: {
      selectors: {
        title: initialData.config?.selectors?.title || '',
        content: initialData.config?.selectors?.content || '',
        date: initialData.config?.selectors?.date || '',
        link: initialData.config?.selectors?.link || ''
      },
      fetchInterval: initialData.config?.fetchInterval || 60
    },
    showAdvanced: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('selector.')) {
      const selectorName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        config: {
          ...prev.config,
          selectors: {
            ...prev.config.selectors,
            [selectorName]: value
          }
        }
      }));
    } else if (name === 'fetchInterval') {
      setFormData(prev => ({
        ...prev,
        config: {
          ...prev.config,
          fetchInterval: parseInt(value, 10) || 60
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract the data for submission
    const { showAdvanced, ...submitData } = formData;
    
    // Clean empty selectors
    if (submitData.config.selectors) {
      Object.keys(submitData.config.selectors).forEach(key => {
        if (!submitData.config.selectors[key]) {
          delete submitData.config.selectors[key];
        }
      });
    }
    
    onSubmit({
      ...submitData,
      type: 'website'
    });
  };

  const toggleAdvanced = () => {
    setFormData(prev => ({ ...prev, showAdvanced: !prev.showAdvanced }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name (Optional)</label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="My News Site"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="url">Website URL (Required)</label>
        <Input
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com/news"
          required
        />
      </div>
      
      <div className="form-group">
        <Button type="button" onClick={toggleAdvanced}>
          {formData.showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
        </Button>
      </div>
      
      {formData.showAdvanced && (
        <div className="advanced-settings">
          <h4>Scraping Configuration</h4>
          
          <div className="form-group">
            <label htmlFor="fetchInterval">Fetch Interval (minutes)</label>
            <Input
              id="fetchInterval"
              name="fetchInterval"
              type="number"
              min="10"
              max="1440"
              value={formData.config.fetchInterval}
              onChange={handleChange}
            />
            <small>How often to check for new content (minimum 10 minutes)</small>
          </div>
          
          <h5>CSS Selectors</h5>
          <small>Leave empty to use default selectors</small>
          
          <div className="form-group">
            <label htmlFor="selector.title">Title Selector</label>
            <Input
              id="selector.title"
              name="selector.title"
              value={formData.config.selectors.title}
              onChange={handleChange}
              placeholder="h1, .headline"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="selector.content">Content Selector</label>
            <Input
              id="selector.content"
              name="selector.content"
              value={formData.config.selectors.content}
              onChange={handleChange}
              placeholder="article, .content, .post-content"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="selector.date">Date Selector</label>
            <Input
              id="selector.date"
              name="selector.date"
              value={formData.config.selectors.date}
              onChange={handleChange}
              placeholder="time, .date, meta[property='article:published_time']"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="selector.link">Link Selector</label>
            <Input
              id="selector.link"
              name="selector.link"
              value={formData.config.selectors.link}
              onChange={handleChange}
              placeholder="a.read-more, a.more"
            />
          </div>
        </div>
      )}
      
      <div className="form-actions">
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};
```

## 8. Collection Status Monitoring and Dashboard

Let's create components to monitor the collection status:

### 8.1 Collection Status Model

```typescript
// entities/collection/model/types.ts
export interface CollectionStatus {
  id: string;
  sourceId: string;
  startedAt: string;
  finishedAt?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  count: number;
  error?: string;
}
```

### 8.2 Recent Collections API Endpoint

```typescript
// pages/api/sources/[sourceId]/collections.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongoose';
import { verifyToken } from '../../../../lib/auth';
import Source from '../../../../models/Source';
import CollectionStatus from '../../../../models/CollectionStatus';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Connect to database
    await connectToDatabase();
    
    // Verify authentication
    const user = await verifyToken(req);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get source ID from URL
    const { sourceId } = req.query;
    
    if (!sourceId || typeof sourceId !== 'string') {
      return res.status(400).json({ error: 'Source ID is required' });
    }
    
    // Verify source belongs to user
    const source = await Source.findOne({
      _id: sourceId,
      userId: user.id
    });
    
    if (!source) {
      return res.status(404).json({ error: 'Source not found' });
    }
    
    // Get recent collection statuses
    const collections = await CollectionStatus.find({
      sourceId
    })
    .sort({ startedAt: -1 })
    .limit(10);
    
    return res.status(200).json(collections);
  } catch (error) {
    console.error('Error in collections API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

### 8.3 Collection Status Component

```tsx
// features/manageSources/ui/SourceCollectionStatus.tsx
import React, { useEffect, useState } from 'react';
import { api } from '../../../shared/api';
import { CollectionStatus } from '../../../entities/collection/model/types';
import { Spinner } from '../../../shared/ui/Spinner';

interface SourceCollectionStatusProps {
  sourceId: string;
}

export const SourceCollectionStatus: React.FC<SourceCollectionStatusProps> = ({
  sourceId
}) => {
  const [collections, setCollections] = useState<CollectionStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchCollections = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/sources/${sourceId}/collections`);
      setCollections(response.data);
    } catch (err) {
      setError('Failed to fetch collection history');
      console.error('Collection history error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCollections();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchCollections, 30000);
    
    return () => clearInterval(interval);
  }, [sourceId]);
  
  if (loading && collections.length === 0) {
    return <Spinner />;
  }
  
  if (error && collections.length === 0) {
    return <div className="error">{error}</div>;
  }
  
  if (collections.length === 0) {
    return <div className="empty-state">No collection history yet</div>;
  }
  
  return (
    <div className="collection-history">
      <h4>Recent Collection Activity</h4>
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Posts Collected</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {collections.map(collection => (
            <tr key={collection.id} className={`status-${collection.status}`}>
              <td>{new Date(collection.startedAt).toLocaleString()}</td>
              <td>{collection.status}</td>
              <td>{collection.count}</td>
              <td>
                {collection.error && (
                  <span className="error-message" title={collection.error}>
                    Error
                  </span>
                )}
                {collection.status === 'running' && <Spinner size="small" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={fetchCollections} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  );
};
```

## 9. Error Handling and Monitoring

### 9.1 Collection Error Logging

```typescript
// models/CollectionError.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICollectionError extends Document {
  sourceId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  timestamp: Date;
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  metadata?: Record<string, any>;
}

const CollectionErrorSchema: Schema = new Schema({
  sourceId: { type: Schema.Types.ObjectId, ref: 'Source', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  errorType: { type: String, required: true },
  errorMessage: { type: String, required: true },
  stackTrace: { type: String },
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });

// Create index for faster queries
CollectionErrorSchema.index({ sourceId: 1, timestamp: -1 });
CollectionErrorSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.models.CollectionError || mongoose.model<ICollectionError>('CollectionError', CollectionErrorSchema);
```

### 9.2 Error Logging Service

```typescript
// modules/dataCollection/errorLogger.ts
import mongoose from 'mongoose';
import CollectionError from '../../models/CollectionError';

export class ErrorLogger {
  public static async logError(
    sourceId: mongoose.Types.ObjectId | string,
    userId: mongoose.Types.ObjectId | string,
    errorType: string,
    error: Error,
    metadata?: Record<string, any>
  ) {
    try {
      await CollectionError.create({
        sourceId,
        userId,
        errorType,
        errorMessage: error.message,
        stackTrace: error.stack,
        metadata
      });
    } catch (logError) {
      console.error('Failed to log collection error:', logError);
      console.error('Original error:', error);
    }
  }
  
  public static async getErrorsForSource(
    sourceId: mongoose.Types.ObjectId | string,
    limit: number = 10
  ) {
    return await CollectionError.find({ sourceId })
      .sort({ timestamp: -1 })
      .limit(limit);
  }
  
  public static async getErrorsForUser(
    userId: mongoose.Types.ObjectId | string,
    limit: number = 20
  ) {
    return await CollectionError.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit);
  }
}
```

## 10. Package Dependencies

For this implementation, we'll need to add the following npm packages:

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "bullmq": "^5.0.0",
    "cheerio": "^1.0.0-rc.12",
    "crypto": "^1.0.1",
    "ioredis": "^5.3.2",
    "mongoose": "^8.0.0",
    "next": "^14.0.0",
    "puppeteer": "^21.3.8",
    "rss-parser": "^3.13.0",
    "telegram": "^2.19.10"
  }
}
```

## 11. Implementation Steps and Timeline

Here's a suggested implementation plan with estimated timelines:

1. **Week 1: Setup Core Infrastructure**
   - Enhance MongoDB models (Source and RawPost)
   - Implement basic collection strategies
   - Set up error logging infrastructure

2. **Week 2: Implement Collection Strategies**
   - Develop and test Website scraping (static and dynamic)
   - Implement RSS and API strategies
   - Build Telegram integration

3. **Week 3: Scheduling and Collection Management**
   - Set up BullMQ integration
   - Implement collection manager
   - Add deduplication logic
   - Create API endpoints for manual collection

4. **Week 4: Frontend Integration**
   - Enhance ManageSourcesPage with collection controls
   - Add collection status monitoring components
   - Implement advanced source configuration forms
   - Add testing and documentation

## 12. Deployment Considerations

For deploying this system:

1. **Environment Configuration**
   - Set up Redis for BullMQ queues
   - Configure MongoDB with appropriate indexes
   - Set up environment variables for secrets (API keys, etc.)

2. **Resource Requirements**
   - Estimate memory usage for Puppeteer instances
   - Plan for database storage needs based on content volume
   - Consider scaling options as source count grows

3. **Monitoring**
   - Implement health checks for the collection system
   - Set up alerts for prolonged collection failures
   - Add metrics for collection performance

## Conclusion

This comprehensive implementation plan provides a scalable, maintainable approach to data collection that integrates with your existing application architecture. The modular design allows for easy extension with new source types and collection strategies in the future.

Key strengths of this implementation include:

1. **Modularity**: Strategy pattern allows adding new source types easily
2. **Resilience**: Error handling and retry mechanisms ensure reliability
3. **Scalability**: Queue-based architecture can scale horizontally
4. **User Control**: Advanced configuration options for power users
5. **Monitoring**: Built-in status tracking and error logging

By following this implementation plan, you'll be able to add robust data collection capabilities to your application that integrate seamlessly with your existing source management features and data processing pipeline.