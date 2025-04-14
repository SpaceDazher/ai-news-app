import React, { useEffect, useState } from 'react';
import { CollectionStatus } from '@/entities/collection/model/types';

interface SourceCollectionStatusProps {
  sourceId: string;
}

export const SourceCollectionStatus: React.FC<SourceCollectionStatusProps> = ({
  sourceId
}) => {
  const [collections, setCollections] = useState<CollectionStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/sources/${sourceId}/collections`);
      if (!response.ok) {
        throw new Error('Ошибка загрузки истории сборов');
      }
      const data = await response.json();
      setCollections(data);
    } catch {
      setError('Не удалось получить историю сборов');
    } finally {
      setLoading(false);
    }
  }, [sourceId]);

  useEffect(() => {
    fetchCollections();
    const interval = setInterval(fetchCollections, 30000);
    return () => clearInterval(interval);
  }, [fetchCollections]);

  if (loading && collections.length === 0) {
    return <div>Загрузка истории...</div>;
  }

  if (error && collections.length === 0) {
    return <div className="error">{error}</div>;
  }

  if (collections.length === 0) {
    return <div className="empty-state">История сборов отсутствует</div>;
  }

  return (
    <div className="collection-history">
      <h4>История сборов</h4>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Статус</th>
            <th>Постов собрано</th>
            <th>Детали</th>
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
                    Ошибка
                  </span>
                )}
                {collection.status === 'running' && <span>⏳</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={fetchCollections} disabled={loading}>
        {loading ? 'Обновление...' : 'Обновить'}
      </button>
    </div>
  );
};
