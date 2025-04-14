import React from "react";
import { ISource } from "@/entities/source/model/types";
import {
  RssIcon,
  WebsiteIcon,
  ApiIcon,
  TelegramIcon,
  StatusActiveIcon,
  StatusInactiveIcon,
  StatusErrorIcon,
  StatusWarningIcon,
  EditIcon,
  TrashIcon,
  RefreshIcon,
} from "@/shared/icons/CustomIcons";
import { CollectNowButton } from "./CollectNowButton";
import { SourceCollectionStatus } from "./SourceCollectionStatus";
import styles from "./SourceContainer.module.css";

// TODO: добавить StatusWarningIcon в CustomIcons

interface SourceContainerProps {
  source: ISource;
  onEdit: (source: ISource) => void;
  onDelete: (sourceId: string) => void;
  onRefresh?: (sourceId: string) => void;
  onToggleAutoFetch?: (sourceId: string, value: boolean) => void;
}

const SourceContainer: React.FC<SourceContainerProps> = ({
  source,
  onEdit,
  onDelete,
  onRefresh,
  onToggleAutoFetch,
}) => {
  // Иконка типа источника
  const getTypeIcon = () => {
    switch (source.type) {
      case "rss":
        return <RssIcon size={24} />;
      case "website":
        return <WebsiteIcon size={24} />;
      case "api":
        return <ApiIcon size={24} />;
      case "social":
        return <TelegramIcon size={24} />; // TODO: заменить на универсальную social-иконку
      default:
        return <WebsiteIcon size={24} />;
    }
  };

  // Иконка статуса
  const getStatusIcon = () => {
    switch (source.status) {
      case "active":
        return <StatusActiveIcon />;
      case "inactive":
        return <StatusInactiveIcon />;
      case "error":
        return <StatusErrorIcon />;
      case "warning":
        return <StatusWarningIcon />;
      default:
        return <StatusInactiveIcon />;
    }
  };

  // Текст статуса
  const getStatusText = () => {
    switch (source.status) {
      case "active":
        return "Активен";
      case "inactive":
        return "Неактивен";
      case "error":
        return "Ошибка";
      case "warning":
        return "Внимание";
      default:
        return "Неактивен";
    }
  };

  // Формат даты последнего обновления
  const formatLastFetched = () => {
    if (!source.lastFetched) return "Никогда";
    const date = new Date(source.lastFetched);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Формат расписания
  const formatUpdateFrequency = () => {
    if (!source.updateFrequency) return "—";
    if (source.updateFrequency < 60) return `${source.updateFrequency} мин.`;
    if (source.updateFrequency === 60) return "1 час";
    if (source.updateFrequency % 60 === 0)
      return `${source.updateFrequency / 60} ч.`;
    return `${source.updateFrequency} мин.`;
  };

  // Обработчик переключения автообновления
  const handleAutoFetchToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleAutoFetch) {
      onToggleAutoFetch(source._id, e.target.checked);
    }
  };

  return (
    <div className={`${styles.sourceContainer} animated-card glow-effect`} tabIndex={0} aria-label={`Источник: ${source.name}`}>
      <div className={styles.sourceHeader}>
        <div className={styles.sourceTypeIcon}>{getTypeIcon()}</div>
        <h3 className={styles.sourceName}>{source.name}</h3>
        <div className={styles.sourceStatus} title={getStatusText()}>
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>
      </div>

      <div className={styles.sourceBody}>
        {source.description && (
          <div className={styles.sourceDescription}>{source.description}</div>
        )}

        <p className={styles.sourceUrl}>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
            aria-label={`Ссылка на источник: ${source.url}`}
          >
            {source.url}
          </a>
        </p>

        {source.category && (
          <div className={styles.sourceCategory}>
            <span className="source-badge">{source.category}</span>
          </div>
        )}

        {source.tags && source.tags.length > 0 && (
          <div className={styles.sourceTags}>
            {source.tags.map((tag) => (
              <span className="source-badge" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.sourceMetaRow}>
          <span className={styles.lastFetched}>
            Последнее обновление: {formatLastFetched()}
          </span>
          <span className={styles.updateFrequency}>
            Обновление: {formatUpdateFrequency()}
          </span>
        </div>

        <div className={styles.autoFetchRow}>
          <span className={styles.autoFetchLabel}>Автообновление</span>
          <label className="toggle-switch" aria-label="Включить/выключить автообновление">
            <input
              type="checkbox"
              checked={!!source.autoFetch}
              onChange={handleAutoFetchToggle}
              disabled={!onToggleAutoFetch}
              tabIndex={0}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className={styles.sourceActions}>
        <button
          className={`${styles.actionButton} ${styles.editButton}`}
          onClick={() => onEdit(source)}
          title="Редактировать источник"
          aria-label="Редактировать источник"
        >
          <EditIcon size={20} />
        </button>

        {onRefresh && (
          <button
            className={`${styles.actionButton} ${styles.refreshButton}`}
            onClick={() => onRefresh(source._id)}
            title="Обновить источник"
            aria-label="Обновить источник"
          >
            <RefreshIcon size={20} />
          </button>
        )}

        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => onDelete(source._id)}
          title="Удалить источник"
          aria-label="Удалить источник"
        >
          <TrashIcon size={20} />
        </button>
      </div>
      {/* Кнопка ручного сбора и история сборов */}
      <div className={styles.collectionControls}>
        <CollectNowButton sourceId={source._id} />
        <SourceCollectionStatus sourceId={source._id} />
      </div>
    </div>
  );
};

export default SourceContainer;
