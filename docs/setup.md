---
date: 2025-03-17
"@link": "[[web-app-ai-news-doks]]"
tags:
  - 3-ранг
  - база_знаний
  - проекты
  - доки
  - веб-приложение
progress:
---
---
# Руководство по Настройке и Установке

## Предварительные Требования

Перед началом работы убедитесь, что у вас установлено следующее программное обеспечение:

*   **Node.js:** Версия 18 или выше ([https://nodejs.org/](https://nodejs.org/))
*   **npm** (Node Package Manager) или **yarn** (менеджер пакетов, обычно устанавливается вместе с Node.js)
*   **Аккаунт MongoDB Atlas:**  Для облачной базы данных MongoDB ([https://www.mongodb.com/atlas](https://www.mongodb.com/atlas))
*   **OpenAI API Key:**  Для доступа к OpenAI LLM ([https://platform.openai.com/](https://platform.openai.com/))

## Шаги по Установке

1.  **Клонирование Репозитория Git:**

    ```bash
    git clone <your-repository-url>
    cd <your-project-folder>
    ```

2.  **Установка Зависимостей Frontend:**

    Перейдите в папку `frontend` и установите зависимости:

    ```bash
    cd frontend
    npm install  # или yarn install
    ```

3.  **Установка Зависимостей Backend:**

    Перейдите в папку `backend` и установите зависимости:

    ```bash
    cd ../backend
    npm install  # или yarn install
    ```

4.  **Настройка Переменных Окружения:**

    Вам потребуется настроить переменные окружения для Frontend и Backend.  Создайте файлы `.env.local` в корневых папках `frontend` и `backend`, если их еще нет.

    *   **Backend (`backend/.env.local`):**

        ```
        MONGODB_URI=<your-mongodb-atlas-connection-string>
        OPENAI_API_KEY=<your-openai-api-key>
        # (Другие переменные окружения backend, если потребуются)
        ```

        *   Замените `<your-mongodb-atlas-connection-string>` на вашу строку подключения MongoDB Atlas.  Вы можете получить ее в веб-интерфейсе MongoDB Atlas после создания кластера.
        *   Замените `<your-openai-api-key>` на ваш OpenAI API key. Вы можете получить его на сайте OpenAI platform.

    *   **Frontend (`frontend/.env.local`):**

        ```
        # (Переменные окружения frontend, если потребуются.  На MVP, скорее всего, не нужны)
        ```

        *   В SPA frontend обычно не хранят секретные ключи, но если потребуются переменные окружения для frontend (например, URL backend API, если он будет другим, чем localhost в разработке), их можно добавить здесь.  Обычно переменные окружения frontend начинаются с `REACT_APP_`.


5.  **Запуск Приложения:**

    *   **Запуск Backend:**

        Перейдите в папку `backend` и запустите сервер разработки Next.js:

        ```bash
        cd backend
        npm run dev # или yarn dev
        ```

        Backend сервер должен запуститься на [http://localhost:3001](http://localhost:3001) (порт может отличаться, смотрите логи запуска).

    *   **Запуск Frontend:**

        В другом терминале перейдите в папку `frontend` и запустите сервер разработки React:

        ```bash
        cd frontend
        npm run start # или yarn start
        ```

        Frontend приложение должно запуститься на [http://localhost:3000](http://localhost:3000) (порт может отличаться, смотрите логи запуска).



---



