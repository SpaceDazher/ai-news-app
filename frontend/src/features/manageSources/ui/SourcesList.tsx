// src/features/manageSources/ui/SourcesList.tsx
import React, { useMemo, useState } from 'react';
import type { ISource } from '@/entities/source/model/types';
import { SourceListItem } from './SourceListItem';
import SourceContainer from './SourceContainer';
import './SourcesList.css';

interface SourcesListProps {
  sources: ISource[];
  onEdit: (source: ISource) => void;
  onDelete: (sourceId: string) => void;
  onRefresh?: (sourceId: string) => void;
}

const PAGE_SIZE = 8;

const TABS = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'inactive', label: 'Неактивные' },
  { key: 'error', label: 'Ошибка' },
];

export const SourcesList: React.FC<SourcesListProps> = ({
  sources,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const [tab, setTab] = useState<'all' | 'active' | 'inactive' | 'error'>('all');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<'createdAt' | 'updatedAt' | 'name'>('createdAt');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);

  // Категории для фильтра
  const categories = useMemo(() => {
    const set = new Set<string>();
    sources.forEach(s => { if (s.category) set.add(s.category); });
    return Array.from(set);
  }, [sources]);

  // Фильтрация по табу
  const filteredByTab = useMemo(() => {
    if (tab === 'all') return sources;
    return sources.filter(s => s.status === tab);
  }, [sources, tab]);

  // Фильтрация по поиску и категории
  const filtered = useMemo(() => {
    let arr = filteredByTab;
    if (category !== 'all') arr = arr.filter(s => s.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      arr = arr.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          (s.url && s.url.toLowerCase().includes(q)) ||
          (s.category && s.category.toLowerCase().includes(q))
      );
    }
    return arr;
  }, [filteredByTab, search, category]);

  // Сортировка
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name, 'ru');
      if (sort === 'createdAt') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === 'updatedAt') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      return 0;
    });
  }, [filtered, sort]);

  // Пагинация
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE) || 1;
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  // Подсчёты для табов
  const tabCounts = useMemo(() => ({
    all: sources.length,
    active: sources.filter(s => s.status === 'active').length,
    inactive: sources.filter(s => s.status === 'inactive').length,
    error: sources.filter(s => s.status === 'error').length,
  }), [sources]);

  // Сброс страницы при изменении фильтров
  React.useEffect(() => { setPage(1); }, [tab, search, category, sort, view]);

  return (
    <div className="sources-list-container">
      <div className="sources-list-controls">
        <div className="tabs">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`tab-btn${tab === t.key ? ' active' : ''}`}
              onClick={() => setTab(t.key as 'all' | 'active' | 'inactive' | 'error')}
            >
              {t.label} <span className="tab-count">{tabCounts[t.key as keyof typeof tabCounts]}</span>
            </button>
          ))}
        </div>
        <div className="search-sort-row">
          <input
            type="text"
            className="sources-search"
            placeholder="Поиск по источникам..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {categories.length > 0 && (
            <select
              className="sources-category-filter"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="all">Все категории</option>
              {categories.map(cat => (
                <option value={cat} key={cat}>{cat}</option>
              ))}
            </select>
          )}
          <select
            className="sources-sort"
            value={sort}
            onChange={e => setSort(e.target.value as 'createdAt' | 'updatedAt' | 'name')}
          >
            <option value="createdAt">По дате добавления</option>
            <option value="updatedAt">По дате обновления</option>
            <option value="name">По алфавиту</option>
          </select>
          <div className="sources-view-toggle">
            <button
              className={view === 'grid' ? 'active' : ''}
              onClick={() => setView('grid')}
              title="Сетка"
              aria-label="Сетка"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </button>
            <button
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
              title="Список"
              aria-label="Список"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="14" height="2" rx="1" />
                <rect x="1" y="5" width="14" height="2" rx="1" />
                <rect x="1" y="9" width="14" height="2" rx="1" />
                <rect x="1" y="13" width="14" height="2" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {sorted.length === 0 ? (
        <div className="sources-empty">
          {search.trim()
            ? <p>Нет источников по запросу «{search}».</p>
            : <p>Источники не найдены. Добавьте первый источник!</p>
          }
        </div>
      ) : (
        <ul className={`sources-list ${view}`}>
          {paged.map(source => (
            view === 'list' ? (
              <SourceListItem
                key={source._id}
                source={source}
                onEdit={onEdit}
                onDelete={onDelete}
                onRefresh={onRefresh}
              />
            ) : (
              <li key={source._id} className="source-grid-item">
                <SourceContainer
                  source={source}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onRefresh={onRefresh}
                />
              </li>
            )
          ))}
        </ul>
      )}
      {totalPages > 1 && (
        <div className="sources-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? 'active' : ''}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
