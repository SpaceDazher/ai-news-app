import React from 'react';
import { ISource } from '@/entities/source/model/types';
import {
  RssIcon,
  WebsiteIcon,
  ApiIcon,
  TelegramIcon,
  StatusActiveIcon,
  StatusInactiveIcon,
  StatusErrorIcon,
  EditIcon,
  TrashIcon,
  RefreshIcon,
} from '@/shared/icons/CustomIcons';
import styles from './SourceContainer.module.css';

interface SourceContainerProps {
  source: ISource;
  onEdit: (source: ISource) => void;
  onDelete: (sourceId: string) => void;
  onRefresh?: (sourceId: string) => void;
}

const SourceContainer: React.FC<SourceContainerProps> = ({ 
  source, 
  onEdit, 
  onDelete,
  onRefresh 
}) => {
  // Получаем иконку типа источника
  const getTypeIcon = () => {
    switch(source.type) {
      case 'rss': return <RssIcon size={24} />;
      case 'website': return <WebsiteIcon size={24} />;
      case 'api': return <ApiIcon size={24} />;
      case 'social': return <TelegramIcon size={24} />; // Можно заменить на универсальную social-иконку
      default: return <WebsiteIcon size={24} />;
    }
  };
  
  // Получаем иконку статуса
  const getStatusIcon = () => {
    switch(source.status) {
      case 'active': return <StatusActiveIcon />;
      case 'inactive': return <StatusInactiveIcon />;
      case 'error': return <StatusErrorIcon />;
      default: return <StatusInactiveIcon />;
    }
  };
  
  // Получаем текст статуса
  const getStatusText = () => {
    switch(source.status) {
      case 'active': return 'Активен';
      case 'inactive': return 'Неактивен';
      case 'error': return 'Ошибка';
      default: return 'Неактивен';
    }
  };
  
  // Форматируем дату последнего обновления
  const formatLastFetched = () => {
    if (!source.lastFetched) return 'Никогда';
    
    const date = new Date(source.lastFetched);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className={styles.sourceContainer}>
      <div className={styles.sourceHeader}>
        <div className={styles.sourceTypeIcon}>
          {getTypeIcon()}
        </div>
        <h3 className={styles.sourceName}>{source.name}</h3>
        <div className={styles.sourceStatus}>
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>
      </div>
      
      <div className={styles.sourceBody}>
        <p className={styles.sourceUrl}>
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            {source.url}
          </a>
        </p>
        
        {source.category && (
          <div className={styles.sourceCategory}>
            {source.category}
          </div>
        )}
        
        {source.lastFetched && (
          <p className={styles.lastFetched}>
            Последнее обновление: {formatLastFetched()}
          </p>
        )}
      </div>
      
      <div className={styles.sourceActions}>
        <button 
          className={`${styles.actionButton} ${styles.editButton}`} 
          onClick={() => onEdit(source)}
          title="Редактировать источник"
        >
          <EditIcon size={20} />
        </button>
        
        {onRefresh && (
          <button 
            className={`${styles.actionButton} ${styles.refreshButton}`} 
            onClick={() => onRefresh(source._id)}
            title="Обновить источник"
          >
            <RefreshIcon size={20} />
          </button>
        )}
        
        <button 
          className={`${styles.actionButton} ${styles.deleteButton}`} 
          onClick={() => onDelete(source._id)}
          title="Удалить источник"
        >
          <TrashIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default SourceContainer;