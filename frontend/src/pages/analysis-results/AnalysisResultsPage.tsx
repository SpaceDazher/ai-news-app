import React, { useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { fetchAnalysisResults } from '@/entities/analysisResult/model/analysisResultSlice';

const AnalysisResultsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, isLoading, error } = useAppSelector((state) => state.analysisResult);

  useEffect(() => {
    dispatch(fetchAnalysisResults());
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Результаты анализа</h2>
      {isLoading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {list.map((r) => (
          <li key={r._id}>
            <strong>{r.category}</strong> | {r.sentiment} | {new Date(r.createdAt).toLocaleString()}
            <p>{r.summary || r.cleanedText.slice(0, 200)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisResultsPage;
