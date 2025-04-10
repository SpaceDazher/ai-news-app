import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { fetchModulesConfig, updateModuleConfig, ModuleConfig } from '@/entities/analysisModule/model/modulesConfigSlice';

const AnalysisModulesConfigPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, isLoading, error } = useAppSelector((state) => state.modulesConfig);
  const [editingModule, setEditingModule] = useState<ModuleConfig | null>(null);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    dispatch(fetchModulesConfig());
  }, [dispatch]);

  const handleToggle = (module: ModuleConfig) => {
    dispatch(updateModuleConfig({ moduleId: module.moduleId, data: { isEnabled: !module.isEnabled } }));
  };

  const handleEdit = (module: ModuleConfig) => {
    setEditingModule(module);
    setPrompt(module.prompt || '');
  };

  const handleSave = () => {
    if (editingModule) {
      dispatch(updateModuleConfig({ moduleId: editingModule.moduleId, data: { prompt } }));
      setEditingModule(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Конфигурация Модулей Анализа</h2>
      {isLoading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {list.map((m) => (
          <li key={m.moduleId} style={{ marginBottom: 10 }}>
            <strong>{m.name}</strong> — {m.description}
            <label style={{ marginLeft: 10 }}>
              <input
                type="checkbox"
                checked={m.isEnabled}
                onChange={() => handleToggle(m)}
              />
              Включен
            </label>
            <button onClick={() => handleEdit(m)} style={{ marginLeft: 10 }}>
              Редактировать промпт
            </button>
          </li>
        ))}
      </ul>

      {editingModule && (
        <div style={{ marginTop: 20 }}>
          <h3>Редактирование промпта для {editingModule.name}</h3>
          <textarea
            rows={6}
            cols={60}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <br />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={() => setEditingModule(null)} style={{ marginLeft: 10 }}>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisModulesConfigPage;
