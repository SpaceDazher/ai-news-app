import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../../../shared/api';

const FolderContentPage: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!folderId) return;
    setLoading(true);
    apiFetch(`/folders/${folderId}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [folderId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Посты папки</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map((p) => (
          <li key={p._id}>
            <strong>{p.category}</strong> | {p.sentiment} | {new Date(p.createdAt).toLocaleString()}
            <p>{p.summary || p.cleanedText?.slice(0, 200)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderContentPage;
