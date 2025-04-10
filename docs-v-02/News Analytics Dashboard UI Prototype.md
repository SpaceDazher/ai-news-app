---
date: 2025-04-07
---
---
# News Analytics Dashboard UI Prototype

## [View Live Dashboard Prototype](https://page.genspark.site/page/toolu_01TQ6EreXSkZ5u3551eooZ9r/news_analytics_dashboard.html)

## Ключевые особенности приборной панели

### 1. Современные элементы дизайна (тенденции 2025 года)
- **Темный режим с опциями темы**: Гладкий темный интерфейс с опциями акцентных цветов
- **Чистый, минималистичный пользовательский интерфейс**: Сосредоточенность на данных с минимальным количеством отвлекающих факторов
- **Интерактивные диаграммы**: Динамические визуализации с эффектом наведения
- **Картографический макет**: Модульный дизайн с отдельными областями контента
- **Микро-взаимодействие**: Тонкие анимации и переходы для лучшего вовлечения
- **3D-элементы**: Современные эффекты глубины на карточках и интерактивных элементах
- **Mobile-Responsive**: Полностью адаптируется к различным размерам экрана

### 2. Компоненты приборной панели
Приборная панель включает все необходимые элементы из спецификации MainDashboardPage:

#### Верхний раздел
- **Область фильтров**: Выбор диапазона дат и папок
- **Карточки KPI**: Четыре карточки с ключевыми метриками:
  - Всего проанализированных сообщений (150)
 - Средний балл настроения (+0.1)
 - Топ трендовых тем (Экономика)
 - Новые сообщения сегодня (25)

#### Область основного содержания
- **Виджет последних важных новостей**: Список важных новостей с:
  - Название новости и источник
 - Оценка важности
 - Индикатор настроения
 - Тег категории
 - Краткое резюме

- **Тренд настроения**: Линейная диаграмма, показывающая тенденции настроений с течением времени с:
  - Плавная анимация
 - Интерактивные точки данных
 - Понятная маркировка
 - Динамические всплывающие подсказки

#### Боковая область содержимого
- **Распределение по категориям**: Гистограмма, показывающая распределение новостей по категориям
- **Распределение настроений**: Диаграмма в виде пончика, показывающая соотношение позитивных/нейтральных/негативных настроений
- **Топовые субъекты**: Список наиболее часто упоминаемых организаций

### 3. Техническая реализация
- **Chart.js**: Для всех визуализаций данных
- **Tailwind CSS**: Для современной, основанной на утилитах стилизации
- **Alpine.js**: Для реактивных компонентов пользовательского интерфейса
- **Phosphor Icons**: Для четких, современных иконок

## Как приборная панель удовлетворяет требованиям

1. **Следует архитектуре FSD**: В реализации соблюдена архитектура Feature-Sliced Design, упомянутая в файле frontend.pdf.

2. **Готовность к интеграции с бэкендом**: Структурирована для работы с конечной точкой API `/api/dashboard`, описанной в файле backend.pdf.

3. **Современные техники визуализации**: Воплощает лучшие практики из scrapper-research-04.pdf, включая:
   - Четкая визуальная иерархия
 - Доступные цветовые схемы
 - Нарративные элементы визуализации
 - Контекстные всплывающие подсказки

4. **Мобильно-ориентированный подход**: Отзывчивый дизайн, работающий на устройствах любого размера.

5. **Интерактивные элементы**: Все графики и точки данных оснащены интерактивными элементами для более глубокого изучения.

## Будущие улучшения

Основываясь на разделе "Подходит для MVP" в MainDashboardPage.pdf, будущие улучшения могут включать:

1. Более сложные KPI с аналитикой на основе искусственного интеллекта
2. Расширенная фильтрация по важности в списке новостей
3. Анализ трендов настроений с элементами прогнозирования
4. Визуализация отношений между сущностями
5. Обнаружение закономерностей/аномалий с помощью ИИ
6. Расширенная фильтрация папок с сохранением предпочтений

## Параметры настройки

Приборная панель включает в себя несколько вариантов настройки:

- **Выбор темы**: Переключение между цветовыми темами
- **Настройка макета**: Карточки можно переставлять (не реализовано в прототипе, но UI предполагает это)
- **Выбор временного диапазона**: Быстрые опции и пользовательский выбор даты
- **Фильтрация папок**: Выбор источников контента для включения в анализ


---

```<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News Analytics Dashboard</title>
    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.0/dist/cdn.min.js"></script>
    <!-- Phosphor Icons -->
    <script src="https://cdn.jsdelivr.net/npm/phosphor-icons@1.4.2/src/index.min.js"></script>
    <style>
        :root {
            --primary: #6366f1;
            --primary-light: #818cf8;
            --secondary: #10b981;
            --dark: #111827;
            --darker: #0d1117;
            --light: #f3f4f6;
            --positive: #10b981;
            --neutral: #6b7280;
            --negative: #ef4444;
            --card-bg: #1e293b;
            --accent: #8b5cf6;
        }

        .theme-violet {
            --primary: #8b5cf6;
            --primary-light: #a78bfa;
            --accent: #ec4899;
        }

        .theme-blue {
            --primary: #3b82f6;
            --primary-light: #60a5fa;
            --accent: #10b981;
        }

        .theme-green {
            --primary: #10b981;
            --primary-light: #34d399;
            --accent: #6366f1;
        }

        body {
            background-color: var(--darker);
            color: var(--light);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            transition: background-color 0.3s, color 0.3s;
        }

        .dashboard-card {
            background-color: var(--card-bg);
            border-radius: 1rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            transition: transform 0.3s, box-shadow 0.3s;
            overflow: hidden;
        }

        .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .primary-gradient {
            background: linear-gradient(135deg, var(--primary), var(--accent));
        }

        .sentiment-positive {
            color: var(--positive);
        }

        .sentiment-neutral {
            color: var(--neutral);
        }

        .sentiment-negative {
            color: var(--negative);
        }

        .kpi-card {
            position: relative;
            overflow: hidden;
        }

        .kpi-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 0;
        }

        .kpi-card:hover::before {
            opacity: 1;
        }

        .kpi-value {
            font-size: 2rem;
            font-weight: 700;
        }

        .news-item {
            border-left: 3px solid transparent;
            transition: background-color 0.2s, border-color 0.2s;
        }

        .news-item:hover {
            background-color: rgba(255, 255, 255, 0.05);
            border-left-color: var(--primary);
        }

        .badge {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-weight: 500;
        }

        .badge-primary {
            background-color: rgba(99, 102, 241, 0.2);
            color: var(--primary-light);
        }

        .badge-positive {
            background-color: rgba(16, 185, 129, 0.2);
            color: #34d399;
        }

        .badge-neutral {
            background-color: rgba(107, 114, 128, 0.2);
            color: #9ca3af;
        }

        .badge-negative {
            background-color: rgba(239, 68, 68, 0.2);
            color: #f87171;
        }

        .entity-tag {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            margin: 0.25rem;
            font-size: 0.875rem;
            background-color: rgba(99, 102, 241, 0.1);
            color: var(--primary-light);
            transition: background-color 0.2s, transform 0.2s;
        }

        .entity-tag:hover {
            background-color: rgba(99, 102, 241, 0.2);
            transform: scale(1.05);
        }

        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .live-indicator {
            position: relative;
            padding-left: 1.25rem;
        }

        .live-indicator::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.5rem;
            height: 0.5rem;
            background-color: var(--secondary);
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% {
                transform: translateY(-50%) scale(1);
                opacity: 1;
            }
            50% {
                transform: translateY(-50%) scale(1.3);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-50%) scale(1);
                opacity: 1;
            }
        }

        .theme-selector {
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin: 0 0.25rem;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .theme-selector:hover {
            transform: scale(1.2);
        }

        .theme-violet-selector {
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
        }

        .theme-blue-selector {
            background: linear-gradient(135deg, #3b82f6, #10b981);
        }

        .theme-green-selector {
            background: linear-gradient(135deg, #10b981, #6366f1);
        }

        .default-theme-selector {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .chart-container {
            position: relative;
            height: 240px;
            width: 100%;
        }

        @media (max-width: 768px) {
            .chart-container {
                height: 200px;
            }
        }

        .animate-in {
            animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .grid-layout {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 1rem;
        }

        @media (max-width: 1280px) {
            .grid-layout {
                grid-template-columns: repeat(6, 1fr);
            }
        }

        @media (max-width: 768px) {
            .grid-layout {
                grid-template-columns: 1fr;
            }
        }

        /* 3D card effect */
        .card-3d {
            perspective: 1000px;
        }

        .card-3d-inner {
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }

        .card-3d:hover .card-3d-inner {
            transform: rotateY(5deg) rotateX(5deg);
        }
    </style>
</head>
<body class="min-h-screen" x-data="dashboard()">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold mb-2">News Analytics Dashboard</h1>
                <p class="text-gray-400 flex items-center">
                    <span class="live-indicator mr-2">Real-time data</span>
                    <span class="mx-2">•</span>
                    <span>Last updated: <span x-text="getCurrentDateTime()"></span></span>
                </p>
            </div>
            <div class="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-4">
                <div class="flex items-center">
                    <span class="text-gray-400 mr-2">Theme:</span>
                    <div class="theme-selector default-theme-selector" @click="setTheme('default')"></div>
                    <div class="theme-selector theme-violet-selector" @click="setTheme('violet')"></div>
                    <div class="theme-selector theme-blue-selector" @click="setTheme('blue')"></div>
                    <div class="theme-selector theme-green-selector" @click="setTheme('green')"></div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <select x-model="selectedDateRange" @change="updateData()" class="appearance-none bg-transparent text-gray-300 border border-gray-700 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="week">Last 7 days</option>
                            <option value="month">Last 30 days</option>
                            <option value="custom">Custom Range</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="relative">
                        <select x-model="selectedFolder" @change="updateData()" class="appearance-none bg-transparent text-gray-300 border border-gray-700 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option value="all">All Folders</option>
                            <option value="politics">Politics</option>
                            <option value="economy">Economy</option>
                            <option value="technology">Technology</option>
                            <option value="health">Health</option>
                            <option value="sports">Sports</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="dashboard-card kpi-card card-3d p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 100)">
                <div class="card-3d-inner" x-show="show" x-transition>
                    <p class="text-gray-400 mb-2 flex items-center">
                        <i class="ph-article text-xl mr-2"></i>
                        Total Posts
                    </p>
                    <p class="kpi-value text-white" x-text="totalPosts"></p>
                    <div class="flex items-center mt-2 text-sm">
                        <span :class="postsChange > 0 ? 'text-green-500' : 'text-red-500'" x-text="postsChange > 0 ? '+' + postsChange + '%' : postsChange + '%'"></span>
                        <span class="text-gray-400 ml-2">vs previous period</span>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card kpi-card card-3d p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 200)">
                <div class="card-3d-inner" x-show="show" x-transition>
                    <p class="text-gray-400 mb-2 flex items-center">
                        <i class="ph-trend-up text-xl mr-2"></i>
                        Average Sentiment
                    </p>
                    <p class="kpi-value" :class="getColorClass(averageSentiment)" x-text="formatSentiment(averageSentiment)"></p>
                    <div class="flex items-center mt-2 text-sm">
                        <span :class="sentimentChange > 0 ? 'text-green-500' : 'text-red-500'" x-text="sentimentChange > 0 ? '+' + sentimentChange + '%' : sentimentChange + '%'"></span>
                        <span class="text-gray-400 ml-2">vs previous period</span>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card kpi-card card-3d p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 300)">
                <div class="card-3d-inner" x-show="show" x-transition>
                    <p class="text-gray-400 mb-2 flex items-center">
                        <i class="ph-tag text-xl mr-2"></i>
                        Top Topic
                    </p>
                    <p class="kpi-value text-white" x-text="topTopic"></p>
                    <div class="flex items-center mt-2 text-sm">
                        <span class="text-gray-400">Coverage:</span>
                        <span class="text-primary-light ml-2" x-text="topTopicPercentage + '%'"></span>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-card kpi-card card-3d p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 400)">
                <div class="card-3d-inner" x-show="show" x-transition>
                    <p class="text-gray-400 mb-2 flex items-center">
                        <i class="ph-newspaper text-xl mr-2"></i>
                        New Posts Today
                    </p>
                    <p class="kpi-value text-white" x-text="newPostsToday"></p>
                    <div class="flex items-center mt-2 text-sm">
                        <span :class="newPostsChange > 0 ? 'text-green-500' : 'text-red-500'" x-text="newPostsChange > 0 ? '+' + newPostsChange + '%' : newPostsChange + '%'"></span>
                        <span class="text-gray-400 ml-2">vs yesterday</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="grid-layout">
            <!-- Important News Widget -->
            <div class="dashboard-card col-span-12 xl:col-span-6 p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 500)">
                <div x-show="show" x-transition>
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold">Important News</h2>
                        <button class="text-gray-400 hover:text-white transition-colors">
                            <i class="ph-dots-three-outline text-xl"></i>
                        </button>
                    </div>
                    <div class="custom-scrollbar overflow-y-auto" style="max-height: 450px;">
                        <template x-for="(news, index) in importantNews" :key="index">
                            <div class="news-item p-3 mb-3 animate-in" :style="`animation-delay: ${index * 0.1}s`">
                                <div class="flex justify-between mb-2">
                                    <div class="flex items-center">
                                        <span class="badge badge-primary mr-2" x-text="news.source"></span>
                                        <span class="text-sm text-gray-400" x-text="news.date"></span>
                                    </div>
                                    <div class="flex items-center">
                                        <span class="text-sm mr-2">Importance:</span>
                                        <span class="font-semibold" x-text="news.importance"></span>
                                    </div>
                                </div>
                                <h3 class="font-medium mb-2" x-text="news.title"></h3>
                                <p class="text-gray-400 text-sm mb-2" x-text="news.summary"></p>
                                <div class="flex flex-wrap items-center">
                                    <span :class="`badge ${getSentimentBadgeClass(news.sentiment)} mr-2`" x-text="news.sentiment"></span>
                                    <span class="badge badge-primary" x-text="news.category"></span>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="mt-4 text-center">
                        <button class="text-primary-light hover:text-primary transition-colors font-medium">
                            Show More
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="col-span-12 xl:col-span-6 space-y-6">
                <!-- Sentiment Trend Widget -->
                <div class="dashboard-card p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 600)">
                    <div x-show="show" x-transition>
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-semibold">Sentiment Trend</h2>
                            <div class="flex items-center">
                                <button class="text-gray-400 hover:text-white transition-colors mr-2">
                                    <i class="ph-calendar text-xl"></i>
                                </button>
                                <button class="text-gray-400 hover:text-white transition-colors">
                                    <i class="ph-dots-three-outline text-xl"></i>
                                </button>
                            </div>
                        </div>
                        <div class="chart-container">
                            <canvas id="sentimentTrendChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Category Distribution Widget -->
                <div class="dashboard-card p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 700)">
                    <div x-show="show" x-transition>
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-semibold">Category Distribution</h2>
                            <button class="text-gray-400 hover:text-white transition-colors">
                                <i class="ph-dots-three-outline text-xl"></i>
                            </button>
                        </div>
                        <div class="chart-container">
                            <canvas id="categoryDistributionChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Row -->
            <div class="col-span-12 xl:col-span-4">
                <!-- Sentiment Distribution Widget -->
                <div class="dashboard-card p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 800)">
                    <div x-show="show" x-transition>
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-semibold">Sentiment Distribution</h2>
                            <button class="text-gray-400 hover:text-white transition-colors">
                                <i class="ph-dots-three-outline text-xl"></i>
                            </button>
                        </div>
                        <div class="chart-container">
                            <canvas id="sentimentDistributionChart"></canvas>
                        </div>
                        <div class="flex justify-between mt-4">
                            <div class="text-center">
                                <p class="text-sm text-gray-400">Positive</p>
                                <p class="font-semibold text-green-500" x-text="sentimentDistribution.positive + '%'"></p>
                            </div>
                            <div class="text-center">
                                <p class="text-sm text-gray-400">Neutral</p>
                                <p class="font-semibold text-gray-300" x-text="sentimentDistribution.neutral + '%'"></p>
                            </div>
                            <div class="text-center">
                                <p class="text-sm text-gray-400">Negative</p>
                                <p class="font-semibold text-red-500" x-text="sentimentDistribution.negative + '%'"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-8">
                <!-- Top Entities Widget -->
                <div class="dashboard-card p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 900)">
                    <div x-show="show" x-transition>
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-semibold">Top Entities</h2>
                            <div class="flex items-center space-x-2">
                                <button class="px-3 py-1 text-sm rounded-full bg-transparent border border-gray-700 text-gray-300 hover:border-primary hover:text-primary transition-colors" :class="{'bg-primary/10 border-primary text-primary': entityFilter === 'all'}" @click="entityFilter = 'all'">
                                    All
                                </button>
                                <button class="px-3 py-1 text-sm rounded-full bg-transparent border border-gray-700 text-gray-300 hover:border-primary hover:text-primary transition-colors" :class="{'bg-primary/10 border-primary text-primary': entityFilter === 'people'}" @click="entityFilter = 'people'">
                                    People
                                </button>
                                <button class="px-3 py-1 text-sm rounded-full bg-transparent border border-gray-700 text-gray-300 hover:border-primary hover:text-primary transition-colors" :class="{'bg-primary/10 border-primary text-primary': entityFilter === 'organizations'}" @click="entityFilter = 'organizations'">
                                    Organizations
                                </button>
                                <button class="px-3 py-1 text-sm rounded-full bg-transparent border border-gray-700 text-gray-300 hover:border-primary hover:text-primary transition-colors" :class="{'bg-primary/10 border-primary text-primary': entityFilter === 'locations'}" @click="entityFilter = 'locations'">
                                    Locations
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-wrap">
                            <template x-for="(entity, index) in filteredEntities" :key="index">
                                <div class="entity-tag animate-in" :style="`animation-delay: ${index * 0.05}s`">
                                    <span x-text="entity.name"></span>
                                    <span class="ml-1 text-gray-400" x-text="entity.count"></span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function dashboard() {
            return {
                // State
                totalPosts: 1543,
                postsChange: 7.2,
                averageSentiment: 0.3,
                sentimentChange: -2.5,
                topTopic: "Economy",
                topTopicPercentage: 36,
                newPostsToday: 87,
                newPostsChange: 12.4,
                selectedDateRange: 'week',
                selectedFolder: 'all',
                entityFilter: 'all',
                
                // Sentiment Distribution
                sentimentDistribution: {
                    positive: 42,
                    neutral: 35,
                    negative: 23
                },
                
                // Important News
                importantNews: [
                    {
                        title: "Economic Growth Surpasses Expectations in Q3 2025",
                        summary: "Latest economic data shows a 3.7% growth in GDP, beating analysts' forecasts of 2.9% growth for the third quarter of 2025.",
                        source: "Financial Times",
                        category: "Economy",
                        sentiment: "Positive",
                        importance: 9.2,
                        date: "Today, 09:45"
                    },
                    {
                        title: "New AI Regulation Framework Announced by European Commission",
                        summary: "The European Commission unveiled a comprehensive framework for regulating artificial intelligence applications, focusing on transparency and ethical considerations.",
                        source: "Tech Chronicle",
                        category: "Technology",
                        sentiment: "Neutral",
                        importance: 8.7,
                        date: "Today, 11:30"
                    },
                    {
                        title: "Global Semiconductor Shortage Expected to Continue Through 2026",
                        summary: "Industry experts predict the ongoing semiconductor shortage will persist for at least another year, affecting automotive and consumer electronics industries.",
                        source: "Reuters",
                        category: "Technology",
                        sentiment: "Negative",
                        importance: 8.5,
                        date: "Yesterday, 16:20"
                    },
                    {
                        title: "Climate Summit Reaches Historic Agreement on Carbon Reduction",
                        summary: "World leaders at the Global Climate Summit have agreed to reduce carbon emissions by 45% by 2035, marking the most ambitious climate agreement to date.",
                        source: "Environmental Report",
                        category: "Environment",
                        sentiment: "Positive",
                        importance: 9.0,
                        date: "Yesterday, 14:15"
                    },
                    {
                        title: "Healthcare Reform Bill Passes Senate with Bipartisan Support",
                        summary: "A comprehensive healthcare reform bill passed the Senate with a vote of 67-33, securing support from both parties after months of negotiations.",
                        source: "Political Insight",
                        category: "Politics",
                        sentiment: "Positive",
                        importance: 8.9,
                        date: "2 days ago, 22:10"
                    },
                    {
                        title: "Central Bank Maintains Interest Rates Despite Inflation Concerns",
                        summary: "The Central Bank voted to maintain current interest rates at 3.25%, citing robust economic growth despite growing concerns about inflation.",
                        source: "Economic Observer",
                        category: "Economy",
                        sentiment: "Neutral",
                        importance: 8.4,
                        date: "2 days ago, 14:30"
                    },
                    {
                        title: "Major Data Breach Affects 50 Million Users of Social Platform",
                        summary: "A significant security breach at a leading social media platform has exposed personal data of approximately 50 million users worldwide.",
                        source: "Cyber Security Today",
                        category: "Technology",
                        sentiment: "Negative",
                        importance: 9.1,
                        date: "3 days ago, 07:45"
                    }
                ],
                
                // Top Entities
                entities: [
                    { name: "European Commission", count: 28, type: "organizations" },
                    { name: "United States", count: 26, type: "locations" },
                    { name: "John Smith", count: 24, type: "people" },
                    { name: "Tesla", count: 23, type: "organizations" },
                    { name: "China", count: 21, type: "locations" },
                    { name: "Bitcoin", count: 19, type: "organizations" },
                    { name: "President Johnson", count: 18, type: "people" },
                    { name: "Microsoft", count: 17, type: "organizations" },
                    { name: "New York", count: 16, type: "locations" },
                    { name: "Federal Reserve", count: 15, type: "organizations" },
                    { name: "Sarah Williams", count: 14, type: "people" },
                    { name: "Amazon", count: 14, type: "organizations" },
                    { name: "Tokyo", count: 13, type: "locations" },
                    { name: "WHO", count: 12, type: "organizations" },
                    { name: "Dr. Emma Chen", count: 12, type: "people" },
                    { name: "Apple", count: 11, type: "organizations" },
                    { name: "Berlin", count: 10, type: "locations" },
                    { name: "NASA", count: 9, type: "organizations" },
                    { name: "Mark Davies", count: 9, type: "people" },
                    { name: "Paris", count: 8, type: "locations" }
                ],
                
                // Chart Data
                sentimentTrendData: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    values: [0.2, 0.4, 0.1, -0.2, -0.1, 0.3, 0.5]
                },
                
                categoryDistributionData: {
                    labels: ['Economy', 'Politics', 'Technology', 'Health', 'Environment', 'Sports'],
                    values: [36, 25, 18, 12, 6, 3]
                },
                
                // Initialize charts
                init() {
                    this.initSentimentTrendChart();
                    this.initCategoryDistributionChart();
                    this.initSentimentDistributionChart();
                },
                
                // Filter entities based on selected type
                get filteredEntities() {
                    if (this.entityFilter === 'all') {
                        return this.entities;
                    }
                    return this.entities.filter(entity => entity.type === this.entityFilter);
                },
                
                // Initialize sentiment trend chart
                initSentimentTrendChart() {
                    const ctx = document.getElementById('sentimentTrendChart').getContext('2d');
                    
                    const gradientFill = ctx.createLinearGradient(0, 0, 0, 250);
                    gradientFill.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                    gradientFill.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
                    
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: this.sentimentTrendData.labels,
                            datasets: [{
                                label: 'Sentiment Score',
                                data: this.sentimentTrendData.values,
                                borderColor: 'rgb(99, 102, 241)',
                                backgroundColor: gradientFill,
                                tension: 0.3,
                                fill: true,
                                pointBackgroundColor: 'rgb(99, 102, 241)',
                                pointBorderColor: '#1e293b',
                                pointBorderWidth: 2,
                                pointRadius: 4,
                                pointHoverRadius: 6
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.05)',
                                        drawBorder: false
                                    },
                                    ticks: {
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    },
                                    min: -1,
                                    max: 1
                                },
                                x: {
                                    grid: {
                                        display: false,
                                        drawBorder: false
                                    },
                                    ticks: {
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    backgroundColor: '#1e293b',
                                    titleColor: 'white',
                                    bodyColor: 'rgba(255, 255, 255, 0.8)',
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                    borderWidth: 1,
                                    displayColors: false,
                                    callbacks: {
                                        label: function(context) {
                                            let value = context.raw;
                                            if (value > 0) return `Sentiment: +${value.toFixed(2)} (Positive)`;
                                            if (value < 0) return `Sentiment: ${value.toFixed(2)} (Negative)`;
                                            return `Sentiment: ${value.toFixed(2)} (Neutral)`;
                                        }
                                    }
                                }
                            }
                        }
                    });
                },
                
                // Initialize category distribution chart
                initCategoryDistributionChart() {
                    const ctx = document.getElementById('categoryDistributionChart').getContext('2d');
                    
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: this.categoryDistributionData.labels,
                            datasets: [{
                                label: 'Percentage',
                                data: this.categoryDistributionData.values,
                                backgroundColor: [
                                    'rgba(99, 102, 241, 0.8)',
                                    'rgba(139, 92, 246, 0.8)',
                                    'rgba(16, 185, 129, 0.8)',
                                    'rgba(236, 72, 153, 0.8)',
                                    'rgba(59, 130, 246, 0.8)',
                                    'rgba(249, 115, 22, 0.8)'
                                ],
                                borderRadius: 6,
                                borderWidth: 0
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.05)',
                                        drawBorder: false
                                    },
                                    ticks: {
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    },
                                    beginAtZero: true
                                },
                                x: {
                                    grid: {
                                        display: false,
                                        drawBorder: false
                                    },
                                    ticks: {
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    backgroundColor: '#1e293b',
                                    titleColor: 'white',
                                    bodyColor: 'rgba(255, 255, 255, 0.8)',
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                    borderWidth: 1,
                                    displayColors: false,
                                    callbacks: {
                                        label: function(context) {
                                            let value = context.raw;
                                            return `Percentage: ${value}%`;
                                        }
                                    }
                                }
                            }
                        }
                    });
                },
                
                // Initialize sentiment distribution chart
                initSentimentDistributionChart() {
                    const ctx = document.getElementById('sentimentDistributionChart').getContext('2d');
                    
                    new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: ['Positive', 'Neutral', 'Negative'],
                            datasets: [{
                                data: [
                                    this.sentimentDistribution.positive,
                                    this.sentimentDistribution.neutral,
                                    this.sentimentDistribution.negative
                                ],
                                backgroundColor: [
                                    'rgba(16, 185, 129, 0.8)',
                                    'rgba(107, 114, 128, 0.8)',
                                    'rgba(239, 68, 68, 0.8)'
                                ],
                                borderWidth: 0
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: '70%',
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        font: {
                                            size: 12
                                        },
                                        padding: 20
                                    }
                                },
                                tooltip: {
                                    backgroundColor: '#1e293b',
                                    titleColor: 'white',
                                    bodyColor: 'rgba(255, 255, 255, 0.8)',
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                    borderWidth: 1,
                                    displayColors: false,
                                    callbacks: {
                                        label: function(context) {
                                            let value = context.raw;
                                            return `${context.label}: ${value}%`;
                                        }
                                    }
                                }
                            }
                        }
                    });
                },
                
                // Helper methods
                getCurrentDateTime() {
                    const now = new Date();
                    return now.toLocaleString('en-US', { 
                        hour: 'numeric', 
                        minute: 'numeric',
                        hour12: true,
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                },
                
                formatSentiment(value) {
                    if (value > 0) return `+${value.toFixed(1)}`;
                    return value.toFixed(1);
                },
                
                getColorClass(value) {
                    if (value > 0.2) return 'sentiment-positive';
                    if (value < -0.2) return 'sentiment-negative';
                    return 'sentiment-neutral';
                },
                
                getSentimentBadgeClass(sentiment) {
                    if (sentiment === 'Positive') return 'badge-positive';
                    if (sentiment === 'Negative') return 'badge-negative';
                    return 'badge-neutral';
                },
                
                // Set theme
                setTheme(theme) {
                    document.body.className = '';
                    if (theme !== 'default') {
                        document.body.classList.add(`theme-${theme}`);
                    }
                },
                
                // Update data (simulate API call)
                updateData() {
                    console.log(`Fetching data for: ${this.selectedDateRange}, Folder: ${this.selectedFolder}`);
                    // In a real app, this would make an API call to fetch new data
                    // For this demo, we'll just simulate a loading state
                    
                    this.totalPosts = Math.floor(Math.random() * 1000) + 1000;
                    this.postsChange = (Math.random() * 20 - 10).toFixed(1);
                    this.averageSentiment = (Math.random() * 2 - 1).toFixed(1);
                    this.sentimentChange = (Math.random() * 10 - 5).toFixed(1);
                    this.newPostsToday = Math.floor(Math.random() * 100) + 50;
                    this.newPostsChange = (Math.random() * 30 - 15).toFixed(1);
                    
                    // Update charts (would be based on new data in a real app)
                    this.sentimentTrendData.values = Array(7).fill(0).map(() => (Math.random() * 2 - 1).toFixed(1));
                    this.initSentimentTrendChart();
                    
                    const newCategoryValues = Array(6).fill(0).map(() => Math.floor(Math.random() * 30) + 5);
                    const total = newCategoryValues.reduce((a, b) => a + b, 0);
                    this.categoryDistributionData.values = newCategoryValues.map(v => Math.round(v / total * 100));
                    this.initCategoryDistributionChart();
                    
                    const positive = Math.floor(Math.random() * 60) + 20;
                    const negative = Math.floor(Math.random() * 40) + 10;
                    const neutral = 100 - positive - negative;
                    
                    this.sentimentDistribution = {
                        positive,
                        neutral,
                        negative
                    };
                    this.initSentimentDistributionChart();
                    
                    // Update top topic based on the new category values
                    const maxIndex = this.categoryDistributionData.values.indexOf(Math.max(...this.categoryDistributionData.values));
                    this.topTopic = this.categoryDistributionData.labels[maxIndex];
                    this.topTopicPercentage = this.categoryDistributionData.values[maxIndex];
                }
            };
        }
    </script>
</body>
</html>
```

