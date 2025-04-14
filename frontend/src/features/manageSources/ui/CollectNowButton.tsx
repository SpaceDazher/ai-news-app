import React, { useState } from 'react';

interface CollectNowButtonProps {
  sourceId: string;
  onCollected?: () => void;
}

export const CollectNowButton: React.FC<CollectNowButtonProps> = ({
  sourceId,
  onCollected
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCollect = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/sources/${sourceId}/collect`, {
        method: 'POST'
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Ошибка запуска сбора');
      }
      if (onCollected) onCollected();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Ошибка запуска сбора');
      } else {
        setError('Ошибка запуска сбора');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCollect} disabled={loading}>
        {loading ? 'Сбор...' : 'Собрать сейчас'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
