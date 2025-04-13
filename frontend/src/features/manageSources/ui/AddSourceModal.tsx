import React from "react";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import type { SourceDataPayload, ISource, SourceType } from "@/entities/source/model/types";
import { CloseIcon } from "@/shared/icons/NotionSidebarIcons";
import "./AddEditSourceForm.css";

interface AddSourceModalProps {
  source?: ISource | null;
  onClose: () => void;
  onSubmit: (data: SourceDataPayload, id?: string) => Promise<void>;
}

const SOURCE_TYPE_OPTIONS: { value: SourceType; label: string }[] = [
  { value: "rss", label: "RSS-лента" },
  { value: "website", label: "Сайт" },
  { value: "api", label: "API" },
  { value: "social", label: "Соцсеть" },
];

export const AddSourceModal: React.FC<AddSourceModalProps> = ({ source, onClose, onSubmit }) => {
  const isEditing = !!source;
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SourceDataPayload>({
    defaultValues: {
      name: source?.name || "",
      type: source?.type || "rss",
      url: source?.url || "",
      description: source?.description || "",
      category: source?.category || "",
      updateFrequency: source?.updateFrequency || 60,
      requiresAuth: source?.requiresAuth || false,
      username: source?.username || "",
      password: source?.password || "",
      tags: source?.tags || [],
      autoFetch: source?.autoFetch ?? true,
    },
  });

  const type = watch("type");
  const requiresAuth = watch("requiresAuth");

  const handleFormSubmit = async (data: SourceDataPayload) => {
    try {
      await onSubmit(data, source?._id);
      reset();
      onClose();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError("name", { message: e.message || "Ошибка сохранения" });
      } else {
        setError("name", { message: "Ошибка сохранения" });
      }
    }
  };

  return (
    <div className="add-edit-source-form-overlay">
      <div className="add-edit-source-form-card">
        <div className="modal-header">
          <h3>{isEditing ? "Редактировать источник" : "Добавить источник"}</h3>
          <button className="close-button" onClick={onClose} type="button" aria-label="Закрыть">
            <CloseIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="source-form">
          <div className="form-group">
            <label htmlFor="name">Название источника*</label>
            <input
              id="name"
              {...register("name", { required: "Название обязательно" })}
              className={errors.name ? "error" : ""}
              autoFocus
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="type">Тип источника*</label>
            <select
              id="type"
              {...register("type", { required: true })}
              disabled={isEditing}
            >
              {SOURCE_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {(type === "rss" || type === "website" || type === "api") && (
            <div className="form-group">
              <label htmlFor="url">URL*</label>
              <input
                id="url"
                type="url"
                placeholder="https://example.com/feed"
                {...register("url", {
                  required: "URL обязателен",
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Введите корректный URL (http/https)",
                  },
                })}
                className={errors.url ? "error" : ""}
              />
              {errors.url && <p className="error-message">{errors.url.message}</p>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Краткое описание источника"
              rows={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <input
              id="category"
              {...register("category")}
              placeholder="Например: Технологии"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Теги (через запятую)</label>
            <Controller
              control={control}
              name="tags"
              render={({
                field,
              }: {
                field: ControllerRenderProps<SourceDataPayload, "tags">;
              }) => (
                <input
                  id="tags"
                  value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="AI, Tech, Новости"
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="updateFrequency">Частота обновления (мин.)</label>
            <select id="updateFrequency" {...register("updateFrequency", { valueAsNumber: true })}>
              <option value={15}>15 минут</option>
              <option value={30}>30 минут</option>
              <option value={60}>1 час</option>
              <option value={360}>6 часов</option>
              <option value={720}>12 часов</option>
              <option value={1440}>24 часа</option>
            </select>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="autoFetch"
              {...register("autoFetch")}
            />
            <label htmlFor="autoFetch">Автоматически собирать данные</label>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="requiresAuth"
              {...register("requiresAuth")}
            />
            <label htmlFor="requiresAuth">Требуется аутентификация</label>
          </div>

          {requiresAuth && (
            <>
              <div className="form-group">
                <label htmlFor="username">Имя пользователя*</label>
                <input
                  id="username"
                  {...register("username", { required: "Имя пользователя обязательно" })}
                  className={errors.username ? "error" : ""}
                />
                {errors.username && <p className="error-message">{errors.username.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль*</label>
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: "Пароль обязателен" })}
                  className={errors.password ? "error" : ""}
                />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
              </div>
            </>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose} disabled={isSubmitting}>
              Отмена
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isEditing ? "Сохранить изменения" : "Добавить источник"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
