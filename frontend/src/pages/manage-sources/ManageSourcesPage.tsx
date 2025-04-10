// src/pages/manage-sources/ManageSourcesPage.tsx
import React from 'react';
import { ManageSourcesFeature } from '@/features/manageSources'; // Импортируем фичу
import './ManageSourcesPage.css';

const ManageSourcesPage: React.FC = () => {
  return (
    <div className="manage-sources-page-container">
      <h1>Управление Источниками</h1>
      <ManageSourcesFeature /> {/* Используем реальную фичу */}
    </div>
  );
};

export default ManageSourcesPage;
