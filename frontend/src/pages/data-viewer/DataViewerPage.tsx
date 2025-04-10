import React from 'react';
import DataViewerFeature from '@/features/dataViewer/DataViewerFeature';
import styles from './DataViewerPage.module.css';

const DataViewerPage: React.FC = () => {
  return (
    <div className={styles.dataViewerPage}>
      <DataViewerFeature />
    </div>
  );
};

export default DataViewerPage;
