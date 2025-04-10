import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { fetchFolders, createFolder } from '@/entities/folder/model/foldersSlice';

const ClassificationDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, isLoading, error } = useAppSelector((state) => state.folders);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    dispatch(fetchFolders());
  }, [dispatch]);

  const handleAddFolder = () => {
    if (!newFolderName.trim()) return;
    dispatch(createFolder({ name: newFolderName.trim(), sourceIds: [] }));
    setNewFolderName('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Мои Темы (Папки)</h2>
      {isLoading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Название новой папки"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={handleAddFolder}>Добавить папку</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {list.map((folder) => (
          <div key={folder._id} style={{ border: '1px solid #ccc', padding: 10, width: 200 }}>
            <h4>{folder.name}</h4>
            <p>Источников: {folder.sourceIds.length}</p>
            <button>Открыть</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassificationDashboardPage;
