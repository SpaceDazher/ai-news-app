import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { fetchSourcesThunk, selectAllSources, selectIsSourcesLoading, selectSourcesError } from '@/entities/source/model/sourceSlice';
import {
  fetchPostsBySourceThunk,
  fetchPostRawTextThunk,
  selectPostsForSource,
  selectCurrentRawText,
  selectIsPostsLoading,
  selectIsRawTextLoading,
  selectPostsError,
  postActions
} from '@/entities/post/model/postSlice';
import styles from './DataViewerFeature.module.css';

const DataViewerFeature: React.FC = () => {
  const dispatch = useAppDispatch();

  const sources = useAppSelector(selectAllSources);
  const isSourcesLoading = useAppSelector(selectIsSourcesLoading);
  const sourcesError = useAppSelector(selectSourcesError);

  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const posts = useAppSelector(selectedSourceId ? selectPostsForSource(selectedSourceId) : () => []);
  const currentRawText = useAppSelector(selectCurrentRawText);
  const isPostsLoading = useAppSelector(selectIsPostsLoading);
  const isRawTextLoading = useAppSelector(selectIsRawTextLoading);
  const postsError = useAppSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchSourcesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSourceId) {
      dispatch(postActions.clearCurrentRawText());
      setExpandedPostId(null);
      dispatch(fetchPostsBySourceThunk({ sourceId: selectedSourceId }));
    }
  }, [dispatch, selectedSourceId]);

  const handleSourceSelect = (sourceId: string) => {
    setSelectedSourceId(sourceId);
  };

  const handleToggleText = (postId: string) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
      dispatch(postActions.clearCurrentRawText());
    } else {
      setExpandedPostId(postId);
      dispatch(fetchPostRawTextThunk(postId));
    }
  };

  return (
    <div className={styles.dataViewerLayout}>
      <div className={styles.leftPanel}>
        <h3>Источники</h3>
        {isSourcesLoading && <p>Загрузка источников...</p>}
        {sourcesError && <p style={{ color: 'red' }}>{sourcesError}</p>}
        <ul>
          {sources.map((s) => (
            <li
              key={s._id}
              onClick={() => handleSourceSelect(s._id)}
              style={{
                cursor: 'pointer',
                fontWeight: selectedSourceId === s._id ? 'bold' : 'normal',
              }}
            >
              {s.name || s.url || s.identifier}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.rightPanel}>
        <h3>Посты</h3>
        {isPostsLoading && <p>Загрузка постов...</p>}
        {postsError && <p style={{ color: 'red' }}>{postsError}</p>}
        {selectedSourceId && posts.length === 0 && !isPostsLoading && <p>Нет постов</p>}
        <ul>
          {posts.map((p: import('@/entities/post/model/types').IPost) => (
            <li key={p.id}>
              <div>
                <strong>{p.title || `Пост от ${new Date(p.publicationDate).toLocaleString()}`}</strong>
                <button onClick={() => handleToggleText(p.id)}>
                  {expandedPostId === p.id ? 'Свернуть' : 'Раскрыть текст'}
                </button>
              </div>
              {expandedPostId === p.id && (
                <div>
                  {isRawTextLoading && <p>Загрузка текста...</p>}
                  {!isRawTextLoading && currentRawText && (
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{currentRawText}</pre>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataViewerFeature;
