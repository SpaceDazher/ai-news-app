import React, { useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { fetchDashboardData } from '@/entities/dashboard/model/dashboardSlice';

const MainDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Аналитический Дашборд</h2>
      {isLoading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <>
          <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div>Всего постов: {data.kpis.totalPosts}</div>
            <div>Средняя тональность: {data.kpis.averageSentiment}</div>
            <div>Топ тема: {data.kpis.topCategory}</div>
            <div>Новых сегодня: {data.kpis.newToday}</div>
          </div>

          <h3>Важные новости</h3>
          <ul>
            {data.importantNews.map((n) => (
              <li key={n.id}>
                <strong>{n.title}</strong> ({n.category}, {n.sentiment}, важность: {n.importanceScore})
                <p>{n.summary}</p>
              </li>
            ))}
          </ul>

          <h3>Распределение по категориям</h3>
          <ul>
            {data.categoryDistribution.map((c) => (
              <li key={c.category}>
                {c.category}: {c.count}
              </li>
            ))}
          </ul>

          <h3>Распределение тональности</h3>
          <ul>
            <li>Позитив: {data.sentimentDistribution.positive}</li>
            <li>Нейтраль: {data.sentimentDistribution.neutral}</li>
            <li>Негатив: {data.sentimentDistribution.negative}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default MainDashboardPage;
