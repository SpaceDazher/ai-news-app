---
date: 2025-04-09
"@link": "[[web-app-ai-news-doks]]"
---
---
# News Analytics AI Dashboard 2025

I've created an advanced News Analytics AI Dashboard based on the code you provided. This dashboard features a modern glassmorphism design with AI-powered insights and data visualization.

## [View Live Dashboard Here](https://page.genspark.site/page/toolu_01Tx42otj2DsYkTiF12qagw1/news_analytics_ai_dashboard_2025.html)

## Key Features

### Modern Design Elements (2025 Trends)
- **Glassmorphism UI**: Transparent card elements with backdrop blur for a modern look
- **Dark Mode with Theme Options**: Four different color themes with gradient accents
- **3D Interactive Elements**: Cards with depth and perspective effects on hover
- **Animated Components**: Smooth transitions and micro-interactions throughout
- **Responsive Layout**: Adapts seamlessly to different screen sizes

### Advanced Analytics Components
- **Real-time Data Visualization**: Interactive charts showing trends over time
- **Sentiment Analysis**: Detailed positive/neutral/negative content breakdown
- **Topic Categorization**: Automatic content classification with coverage metrics
- **Entity Recognition**: Interactive network of people, organizations, and locations
- **Anomaly Detection**: Highlighting unusual patterns in the news data

### AI-Powered Features
- **Smart Insights Panel**: AI-generated analysis of news trends and patterns
- **Predictive Analytics**: Forecasting future news volume and topic distribution
- **Content Summarization**: Automatic extraction of key information from articles
- **Relationship Mapping**: AI-powered connections between entities and topics
- **Sentiment Prediction**: Forecasting potential sentiment shifts for topics

## Dashboard Sections

### KPI Cards
The top section features four key performance indicator cards that provide at-a-glance metrics:
- **Total Posts**: 1,543 articles with trend visualization
- **Average Sentiment**: +0.3 with historical sentiment tracking
- **Top Topic**: Economy (36% coverage) with AI-generated insight
- **New Posts Today**: 87 articles with predictions for the day

### Main Content Area
The dashboard includes several data visualization components:
- **Sentiment Trend Chart**: Tracks sentiment scores over time
- **Category Distribution**: Shows the breakdown of topics covered
- **Important News Feed**: Real-time list of significant articles with sentiment indicators
- **Entity Network Visualization**: Interactive graph showing relationships between entities
- **Sentiment Distribution**: Breakdown of positive/neutral/negative content

### AI Insights Panel
An expandable panel provides AI-powered analysis:
- **Trend Detection**: Identifies emerging topics and patterns
- **Anomaly Highlighting**: Flags unusual patterns or outliers
- **Predictive Analytics**: Forecasts future news volume and sentiment
- **Smart Recommendations**: Suggests content to monitor based on user interests

## Technologies Used
- **Chart.js**: For interactive data visualizations
- **Alpine.js**: For reactive interface components
- **Tailwind CSS**: For responsive styling
- **Force Graph**: For entity relationship visualization
- **Phosphor Icons**: For clean, modern iconography

The dashboard includes simulated data that dynamically updates when filtering options are changed. All visualizations are interactive, providing detailed information on hover and click.

You can view and interact with the full dashboard at the link above. The dashboard is also available for PDF export if needed.

---
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News Analytics AI Dashboard 2025</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Tailwind CSS from jsdelivr -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.0/dist/cdn.min.js"></script>
    <!-- Phosphor Icons -->
    <script src="https://cdn.jsdelivr.net/npm/phosphor-icons@1.4.2/src/index.min.js"></script>
    <!-- Force Graph -->
    <script src="https://cdn.jsdelivr.net/npm/force-graph@1.43.1/dist/force-graph.min.js"></script>
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
            --card-bg: rgba(30, 41, 59, 0.7);
            --accent: #8b5cf6;
            --glass-border: rgba(255, 255, 255, 0.1);
            --glass-highlight: rgba(255, 255, 255, 0.07);
            --backdrop-blur: 15px;
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

        /* Base Styles */
        body {
            background-color: var(--darker);
            color: var(--light);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            transition: background-color 0.3s, color 0.3s;
            min-height: 100vh;
            background-image: 
                radial-gradient(circle at 20% 35%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 75% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
            background-attachment: fixed;
        }

        /* Glassmorphism Card */
        .dashboard-card {
            background-color: var(--card-bg);
            border-radius: 1rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            transition: transform 0.3s, box-shadow 0.3s;
            overflow: hidden;
            backdrop-filter: blur(var(--backdrop-blur));
            -webkit-backdrop-filter: blur(var(--backdrop-blur));
            border: 1px solid var(--glass-border);
        }

        .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border-color: var(--glass-highlight);
        }

        .primary-gradient {
            background: linear-gradient(135deg, var(--primary), var(--accent));
        }

        .sentiment-positive { color: var(--positive); }
        .sentiment-neutral { color: var(--neutral); }
        .sentiment-negative { color: var(--negative); }

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
            background-color: rgba(255, 255, 255, 0.03);
            margin-bottom: 0.75rem;
            border-radius: 0.5rem;
        }

        .news-item:hover {
            background-color: rgba(255, 255, 255, 0.07);
            border-left-color: var(--primary);
        }

        .badge {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-weight: 500;
        }

        .badge-primary { background-color: rgba(99, 102, 241, 0.2); color: var(--primary-light); }
        .badge-positive { background-color: rgba(16, 185, 129, 0.2); color: #34d399; }
        .badge-neutral { background-color: rgba(107, 114, 128, 0.2); color: #9ca3af; }
        .badge-negative { background-color: rgba(239, 68, 68, 0.2); color: #f87171; }
        .badge-ai { background-color: rgba(139, 92, 246, 0.25); color: #c4b5fd; }

        .entity-tag {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            margin: 0.25rem;
            font-size: 0.875rem;
            background-color: rgba(99, 102, 241, 0.15);
            color: var(--primary-light);
            transition: background-color 0.2s, transform 0.2s;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .entity-tag:hover {
            background-color: rgba(99, 102, 241, 0.25);
            transform: scale(1.05);
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

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
            0% { transform: translateY(-50%) scale(1); opacity: 1; }
            50% { transform: translateY(-50%) scale(1.3); opacity: 0.7; }
            100% { transform: translateY(-50%) scale(1); opacity: 1; }
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

        .theme-violet-selector { background: linear-gradient(135deg, #8b5cf6, #ec4899); }
        .theme-blue-selector { background: linear-gradient(135deg, #3b82f6, #10b981); }
        .theme-green-selector { background: linear-gradient(135deg, #10b981, #6366f1); }
        .default-theme-selector { background: linear-gradient(135deg, #6366f1, #8b5cf6); }

        .chart-container {
            position: relative;
            height: 240px;
            width: 100%;
        }

        .small-chart-container {
            position: relative;
            height: 120px;
            width: 100%;
        }

        @media (max-width: 768px) {
            .chart-container { height: 200px; }
            .small-chart-container { height: 100px; }
        }

        .animate-in {
            animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .grid-layout {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 1rem;
        }

        @media (max-width: 1280px) {
            .grid-layout { grid-template-columns: repeat(6, 1fr); }
        }

        @media (max-width: 768px) {
            .grid-layout { grid-template-columns: 1fr; }
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

        /* AI Insights Panel */
        .ai-insights-panel {
            position: fixed;
            right: -400px;
            top: 0;
            height: 100vh;
            width: 400px;
            background-color: var(--card-bg);
            backdrop-filter: blur(var(--backdrop-blur));
            border-left: 1px solid var(--glass-border);
            z-index: 1000;
            transition: right 0.3s ease-in-out;
            overflow-y: auto;
        }

        .ai-insights-panel.open {
            right: 0;
        }

        .ai-toggle-button {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 1001;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .ai-toggle-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        /* AI Typing effect */
        .typing-effect::after {
            content: '|';
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        /* Range Slider */
        .importance-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 4px;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.1);
            outline: none;
            transition: background 0.2s;
        }

        .importance-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--primary);
            cursor: pointer;
            transition: transform 0.1s;
        }

        .importance-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
        }

        .importance-slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--primary);
            cursor: pointer;
            transition: transform 0.1s;
            border: none;
        }

        .importance-slider::-moz-range-thumb:hover {
            transform: scale(1.2);
        }

        /* Tooltip */
        .tooltip {
            position: relative;
        }

        .tooltip .tooltip-text {
            visibility: hidden;
            background-color: rgba(15, 23, 42, 0.95);
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 8px 12px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.3s;
            white-space: nowrap;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(var(--backdrop-blur));
            font-size: 0.75rem;
        }

        .tooltip:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
        }

        /* Tab Styles */
        .tab-button {
            padding: 0.5rem 1rem;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
        }

        .tab-button.active {
            border-bottom: 2px solid var(--primary);
            color: var(--primary-light);
        }

        /* Entity Network */
        #entity-network {
            width: 100%;
            height: 300px;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
        }

        /* AI Insight Card */
        .ai-insight-card {
            background-color: rgba(99, 102, 241, 0.1);
            border-radius: 0.5rem;
            padding: 1rem;
            border: 1px solid rgba(99, 102, 241, 0.2);
            margin-bottom: 1rem;
        }

        /* AI prediction confidence */
        .confidence-bar {
            height: 4px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
            margin-top: 0.5rem;
        }

        .confidence-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            border-radius: 2px;
        }

        /* Custom Dropdown */
        .custom-dropdown {
            position: relative;
        }

        .custom-dropdown-content {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--card-bg);
            border-radius: 0.5rem;
            border: 1px solid var(--glass-border);
            z-index: 10;
            max-height: 250px;
            overflow-y: auto;
            backdrop-filter: blur(var(--backdrop-blur));
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.2s;
        }

        .custom-dropdown.open .custom-dropdown-content {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .custom-dropdown-item {
            padding: 0.5rem 1rem;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .custom-dropdown-item:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }

        .custom-dropdown-item.selected {
            background-color: rgba(99, 102, 241, 0.2);
            color: var(--primary-light);
        }

        /* Anomaly pulse effect */
        .anomaly-pulse {
            position: relative;
        }

        .anomaly-pulse::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -12px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ef4444;
            transform: translateY(-50%);
            animation: anomalyPulse 2s infinite;
        }

        @keyframes anomalyPulse {
            0% { transform: translateY(-50%) scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { transform: translateY(-50%) scale(1.3); opacity: 0.7; box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
            100% { transform: translateY(-50%) scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
    </style>
</head>
<body class="pb-20" x-data="dashboard()">
    <div class="container mx-auto px-4 py-6">
        <!-- Header -->
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
                <h1 class="text-3xl font-bold mb-2">News Analytics <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI Dashboard</span></h1>
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
                    <!-- Date Range Dropdown -->
                    <div class="custom-dropdown" x-data="{ open: false }">
                        <button 
                            @click="open = !open" 
                            @click.away="open = false"
                            class="flex items-center justify-between w-full px-4 py-2 bg-transparent text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <span x-text="getDateRangeText()"></span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="custom-dropdown-content" :class="{ 'open': open }">
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedDateRange === 'today' }" @click="selectDateRange('today'); open = false;">Today</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedDateRange === 'yesterday' }" @click="selectDateRange('yesterday'); open = false;">Yesterday</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedDateRange === 'week' }" @click="selectDateRange('week'); open = false;">Last 7 days</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedDateRange === 'month' }" @click="selectDateRange('month'); open = false;">Last 30 days</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedDateRange === 'quarter' }" @click="selectDateRange('quarter'); open = false;">Last Quarter</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedDateRange === 'custom' }" @click="selectDateRange('custom'); open = false;">Custom Range</div>
                        </div>
                    </div>

                    <!-- Folder Dropdown -->
                    <div class="custom-dropdown" x-data="{ open: false }">
                        <button 
                            @click="open = !open" 
                            @click.away="open = false"
                            class="flex items-center justify-between w-full px-4 py-2 bg-transparent text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <span x-text="getFolderText()"></span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="custom-dropdown-content" :class="{ 'open': open }">
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedFolder === 'all' }" @click="selectFolder('all'); open = false;">All Folders</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedFolder === 'politics' }" @click="selectFolder('politics'); open = false;">Politics</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedFolder === 'economy' }" @click="selectFolder('economy'); open = false;">Economy</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedFolder === 'technology' }" @click="selectFolder('technology'); open = false;">Technology</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedFolder === 'health' }" @click="selectFolder('health'); open = false;">Health</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedFolder === 'environment' }" @click="selectFolder('environment'); open = false;">Environment</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedFolder === 'sports' }" @click="selectFolder('sports'); open = false;">Sports</div>
                            <div class="custom-dropdown-item" :class="{ 'selected': selectedFolder === 'saved' }" @click="selectFolder('saved'); open = false;">Saved Preferences</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <!-- Total Posts KPI -->
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
                    <div class="small-chart-container mt-2">
                        <canvas id="postsHistoryChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Average Sentiment KPI -->
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
                    <div class="small-chart-container mt-2">
                        <canvas id="sentimentHistoryChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Top Topic KPI -->
            <div class="dashboard-card kpi-card card-3d p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 300)">
                <div class="card-3d-inner" x-show="show" x-transition>
                    <div class="flex justify-between items-center mb-2">
                        <p class="text-gray-400 flex items-center">
                            <i class="ph-tag text-xl mr-2"></i>
                            Top Topic
                        </p>
                        <span class="badge badge-ai text-xs flex items-center">
                            <i class="ph-brain text-xs mr-1"></i>
                            AI Generated
                        </span>
                    </div>
                    <p class="kpi-value text-white" x-text="topTopic"></p>
                    <div class="flex items-center mt-2 text-sm">
                        <span class="text-gray-400">Coverage:</span>
                        <span class="text-primary-light ml-2" x-text="topTopicPercentage + '%'"></span>
                    </div>
                    <div class="mt-2 text-xs text-gray-400">
                        <span x-text="topTopicInsight"></span>
                    </div>
                </div>
            </div>

            <!-- New Posts Today KPI -->
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
                    <div class="mt-2 flex justify-between text-xs text-gray-400">
                        <span>Peak time: <span class="text-white">11:30 AM</span></span>
                        <span>Predicted today: <span class="text-white">~120</span></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- AI Insights Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="dashboard-card p-6 lg:col-span-3" x-data="{ show: false }" x-init="setTimeout(() => show = true, 450)">
                <div x-show="show" x-transition>
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center">
                            <i class="ph-lightbulb text-xl mr-2 text-primary-light"></i>
                            <h2 class="text-xl font-semibold">AI Insights & Predictions</h2>
                        </div>
                        <span class="badge badge-ai flex items-center">
                            <i class="ph-brain text-xs mr-1"></i>
                            AI Assistant
                        </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="ai-insight-card">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-medium text-primary-light">Trending Development</h3>
                                <span class="text-xs text-gray-400">5 min ago</span>
                            </div>
                            <p class="text-sm text-gray-200 mb-2">Significant increase in climate-related news coverage (+28%) suggests growing attention to environmental concerns ahead of the Climate Summit.</p>
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-400">Confidence:</span>
                                <span class="text-xs text-primary-light">92%</span>
                            </div>
                            <div class="confidence-bar">
                                <div class="confidence-fill" style="width: 92%"></div>
                            </div>
                        </div>
                        
                        <div class="ai-insight-card">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-medium text-primary-light anomaly-pulse">Anomaly Detected</h3>
                                <span class="text-xs text-gray-400">12 min ago</span>
                            </div>
                            <p class="text-sm text-gray-200 mb-2">Unusual spike in negative sentiment around technology sector news (137% above baseline) - possible reaction to recent data privacy concerns.</p>
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-400">Confidence:</span>
                                <span class="text-xs text-primary-light">87%</span>
                            </div>
                            <div class="confidence-bar">
                                <div class="confidence-fill" style="width: 87%"></div>
                            </div>
                        </div>
                        
                        <div class="ai-insight-card">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-medium text-primary-light">Prediction</h3>
                                <span class="text-xs text-gray-400">22 min ago</span>
                            </div>
                            <p class="text-sm text-gray-200 mb-2">Economic news volume expected to increase by 40-45% over next 48 hours following upcoming central bank announcement on interest rates.</p>
                            <div class="flex justify-between items-center">
                                <span class="text-xs text-gray-400">Confidence:</span>
                                <span class="text-xs text-primary-light">76%</span>
                            </div>
                            <div class="confidence-bar">
                                <div class="confidence-fill" style="width: 76%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="grid-layout">
            <!-- News Content & Sentiment Analysis -->
            <div class="dashboard-card col-span-12 xl:col-span-8 p-6" x-data="{ show: false, activeTab: 'important' }" x-init="setTimeout(() => show = true, 500)">
                <div x-show="show" x-transition>
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex space-x-4">
                            <button 
                                class="tab-button" 
                                :class="{ 'active': activeTab === 'important' }" 
                                @click="activeTab = 'important'"
                            >
                                Important News
                            </button>
                            <button 
                                class="tab-button" 
                                :class="{ 'active': activeTab === 'trending' }" 
                                @click="activeTab = 'trending'"
                            >
                                Trending
                            </button>
                            <button 
                                class="tab-button" 
                                :class="{ 'active': activeTab === 'saved' }" 
                                @click="activeTab = 'saved'"
                            >
                                Saved
                            </button>
                        </div>
                        <div class="flex items-center">
                            <div class="relative mr-2">
                                <input 
                                    type="text" 
                                    placeholder="Search news..."
                                    class="bg-transparent border border-gray-700 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                            </div>
                            <button class="text-gray-400 hover:text-white transition-colors">
                                <i class="ph-sliders-horizontal text-xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Important News List -->
                    <div x-show="activeTab === 'important'" class="custom-scrollbar" style="max-height: 450px; overflow-y: auto;">
                        <template x-for="(news, index) in importantNews" :key="index">
                            <div class="news-item p-3 animate-in" :style="`animation-delay: ${index * 0.1}s`">
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
                                    <template x-if="news.aiAnalyzed">
                                        <span class="badge badge-ai ml-2 flex items-center">
                                            <i class="ph-brain text-xs mr-1"></i>
                                            AI Analyzed
                                        </span>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                    
                    <!-- Trending News Tab Content -->
                    <div x-show="activeTab === 'trending'" class="custom-scrollbar" style="max-height: 450px; overflow-y: auto;">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-sm text-gray-400">Showing trending topics from last 24 hours</span>
                            <div class="flex items-center">
                                <span class="text-sm text-gray-400 mr-2">Filter by:</span>
                                <select class="bg-transparent text-gray-300 border border-gray-700 rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>Volume</option>
                                    <option>Growth Rate</option>
                                    <option>Social Impact</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="dashboard-card p-3 flex items-center">
                                <div class="flex-grow">
                                    <div class="text-sm text-primary-light font-medium">#ClimateAction</div>
                                    <div class="text-xs text-gray-400">1,245 mentions</div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-green-500 text-sm mr-1">+143%</span>
                                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="dashboard-card p-3 flex items-center">
                                <div class="flex-grow">
                                    <div class="text-sm text-primary-light font-medium">#TechRegulation</div>
                                    <div class="text-xs text-gray-400">987 mentions</div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-green-500 text-sm mr-1">+95%</span>
                                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="dashboard-card p-3 flex items-center">
                                <div class="flex-grow">
                                    <div class="text-sm text-primary-light font-medium">#InterestRates</div>
                                    <div class="text-xs text-gray-400">843 mentions</div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-green-500 text-sm mr-1">+72%</span>
                                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="dashboard-card p-3 flex items-center">
                                <div class="flex-grow">
                                    <div class="text-sm text-primary-light font-medium">#GlobalHealth</div>
                                    <div class="text-xs text-gray-400">765 mentions</div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-green-500 text-sm mr-1">+56%</span>
                                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="dashboard-card p-3 flex items-center">
                                <div class="flex-grow">
                                    <div class="text-sm text-primary-light font-medium">#ArtificialIntelligence</div>
                                    <div class="text-xs text-gray-400">682 mentions</div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-green-500 text-sm mr-1">+45%</span>
                                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                </div>
                            </div>
                            
                            <div class="dashboard-card p-3 flex items-center">
                                <div class="flex-grow">
                                    <div class="text-sm text-primary-light font-medium">#ElectricVehicles</div>
                                    <div class="text-xs text-gray-400">547 mentions</div>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-green-500 text-sm mr-1">+38%</span>
                                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Saved News Tab Content -->
                    <div x-show="activeTab === 'saved'" class="custom-scrollbar" style="max-height: 450px; overflow-y: auto;">
                        <div class="flex justify-center items-center py-12">
                            <div class="text-center">
                                <i class="ph-bookmark-simple text-6xl text-gray-700 mb-4"></i>
                                <h3 class="text-xl font-medium mb-2">No saved items yet</h3>
                                <p class="text-gray-400 mb-4">Start saving important news articles for quick access</p>
                                <button class="px-4 py-2 bg-primary-light bg-opacity-20 text-primary-light rounded-lg hover:bg-opacity-30 transition-colors">
                                    Browse Important News
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 text-center">
                        <button class="text-primary-light hover:text-primary transition-colors font-medium">
                            Show More
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Column - Analytics -->
            <div class="col-span-12 xl:col-span-4 space-y-6">
                <!-- Sentiment Distribution Widget -->
                <div class="dashboard-card p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 600)">
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

            <!-- Sentiment Trend Chart -->
            <div class="dashboard-card col-span-12 p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 800)">
                <div x-show="show" x-transition>
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold">Sentiment Trend</h2>
                        <div class="flex items-center">
                            <div class="tooltip mr-3">
                                <span class="badge badge-ai flex items-center">
                                    <i class="ph-graph text-xs mr-1"></i>
                                    AI Forecast
                                </span>
                                <span class="tooltip-text">AI-predicted sentiment for next 7 days</span>
                            </div>
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

            <!-- Entity Network -->
            <div class="dashboard-card col-span-12 lg:col-span-6 p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 900)">
                <div x-show="show" x-transition>
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold">Entity Relationship Network</h2>
                        <div class="flex items-center">
                            <div class="tooltip mr-2">
                                <span class="badge badge-ai flex items-center">
                                    <i class="ph-brain text-xs mr-1"></i>
                                    AI Generated
                                </span>
                                <span class="tooltip-text">Relationships detected by AI</span>
                            </div>
                            <button class="text-gray-400 hover:text-white transition-colors">
                                <i class="ph-dots-three-outline text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div id="entity-network"></div>
                    <div class="flex justify-between mt-3">
                        <div class="flex space-x-3 text-xs">
                            <div class="flex items-center">
                                <div class="w-3 h-3 rounded-full bg-primary mr-1"></div>
                                <span>People</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-3 h-3 rounded-full bg-accent mr-1"></div>
                                <span>Organizations</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-3 h-3 rounded-full bg-secondary mr-1"></div>
                                <span>Topics</span>
                            </div>
                        </div>
                        <div class="text-xs text-gray-400">
                            Showing top 25 entities and relationships
                        </div>
                    </div>
                </div>
            </div>

            <!-- Top Entities Widget -->
            <div class="dashboard-card col-span-12 lg:col-span-6 p-6" x-data="{ show: false }" x-init="setTimeout(() => show = true, 1000)">
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

    <!-- AI Insights Toggle Button -->
    <div class="ai-toggle-button" @click="toggleAiPanel()">
        <i class="ph-robot text-xl"></i>
    </div>

    <!-- AI Insights Panel -->
    <div class="ai-insights-panel custom-scrollbar" :class="{ 'open': aiPanelOpen }">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <div class="flex items-center">
                    <i class="ph-robot text-xl mr-2 text-primary-light"></i>
                    <h2 class="text-xl font-semibold">AI Assistant</h2>
                </div>
                <button @click="toggleAiPanel()" class="text-gray-400 hover:text-white transition-colors">
                    <i class="ph-x text-xl"></i>
                </button>
            </div>

            <div class="mb-6">
                <div class="dashboard-card p-4 mb-4">
                    <p class="text-sm text-gray-300 mb-2">
                        <span class="typing-effect" x-text="aiTypingMessage"></span>
                    </p>
                </div>

                <div class="dashboard-card p-4 bg-primary bg-opacity-10 border-primary border-opacity-30">
                    <h3 class="font-medium text-primary-light mb-2">Daily News Brief</h3>
                    <p class="text-sm text-gray-300 mb-3">
                        Based on your interests, here are the key developments from the last 24 hours:
                    </p>
                    <ul class="text-sm text-gray-300 space-y-2 mb-3">
                        <li class="flex items-start">
                            <i class="ph-dot text-primary-light mr-1 mt-0.5"></i>
                            <span>Central bank signals interest rate hold despite inflation concerns</span>
                        </li>
                        <li class="flex items-start">
                            <i class="ph-dot text-primary-light mr-1 mt-0.5"></i>
                            <span>Major tech companies facing new regulations in EU markets</span>
                        </li>
                        <li class="flex items-start">
                            <i class="ph-dot text-primary-light mr-1 mt-0.5"></i>
                            <span>Climate summit preparations reveal disagreements on carbon targets</span>
                        </li>
                    </ul>
                    <div class="text-xs text-gray-400">
                        Generated at 9:15 AM • Based on 1,245 recent articles
                    </div>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="font-medium mb-3 flex items-center">
                    <i class="ph-chart-line text-lg mr-2 text-primary-light"></i>
                    Anomaly Detection
                </h3>
                <div class="dashboard-card p-4 mb-3 border-red-500 border-opacity-30">
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="font-medium text-red-400">Sentiment Shift</h4>
                        <span class="badge badge-negative">High Priority</span>
                    </div>
                    <p class="text-sm text-gray-300 mb-2">
                        Significant negative shift in sentiment detected for technology sector news (-32% in 6 hours).
                    </p>
                    <p class="text-xs text-gray-400">
                        Possible cause: Recent data breach announcements from multiple tech companies.
                    </p>
                </div>

                <div class="dashboard-card p-4 border-yellow-500 border-opacity-30">
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="font-medium text-yellow-400">Volume Surge</h4>
                        <span class="badge" style="background-color: rgba(234, 179, 8, 0.2); color: #fbbf24;">Medium Priority</span>
                    </div>
                    <p class="text-sm text-gray-300 mb-2">
                        Unusual increase in news volume related to cryptocurrency regulation (+87% above baseline).
                    </p>
                    <p class="text-xs text-gray-400">
                        Coincides with statements from financial regulators in multiple regions.
                    </p>
                </div>
            </div>

            <div>
                <h3 class="font-medium mb-3 flex items-center">
                    <i class="ph-sliders-horizontal text-lg mr-2 text-primary-light"></i>
                    News Importance Filter
                </h3>
                <p class="text-sm text-gray-400 mb-3">
                    Adjust the minimum importance threshold for displayed news:
                </p>
                <div class="mb-4">
                    <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        step="0.1" 
                        x-model="importanceThreshold" 
                        @input="updateImportanceFilter()"
                        class="importance-slider w-full"
                    >
                    <div class="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm">Current threshold: <span class="text-primary-light" x-text="importanceThreshold"></span>/10</span>
                    <button class="text-xs px-3 py-1 bg-primary-light bg-opacity-20 text-primary-light rounded-lg hover:bg-opacity-30 transition-colors">
                        Apply
                    </button>
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
                topTopicInsight: "Economic news volume is up 28% compared to last month, driven by central bank policy discussions",
                newPostsToday: 87,
                newPostsChange: 12.4,
                selectedDateRange: 'week',
                selectedFolder: 'all',
                entityFilter: 'all',
                aiPanelOpen: false,
                importanceThreshold: 7.5,
                aiTypingMessage: "How can I assist you with news analytics today?",
                aiTypingIndex: 0,
                aiMessages: [
                    "How can I assist you with news analytics today?",
                    "I've detected some unusual patterns in technology sector news",
                    "Would you like me to prepare a detailed report on emerging trends?"
                ],
                aiMessageIndex: 0,

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
                        date: "Today, 09:45",
                        aiAnalyzed: true
                    },
                    {
                        title: "New AI Regulation Framework Announced by European Commission",
                        summary: "The European Commission unveiled a comprehensive framework for regulating artificial intelligence applications, focusing on transparency and ethical considerations.",
                        source: "Tech Chronicle",
                        category: "Technology",
                        sentiment: "Neutral",
                        importance: 8.7,
                        date: "Today, 11:30",
                        aiAnalyzed: true
                    },
                    {
                        title: "Global Semiconductor Shortage Expected to Continue Through 2026",
                        summary: "Industry experts predict the ongoing semiconductor shortage will persist for at least another year, affecting automotive and consumer electronics industries.",
                        source: "Reuters",
                        category: "Technology",
                        sentiment: "Negative",
                        importance: 8.5,
                        date: "Yesterday, 16:20",
                        aiAnalyzed: false
                    },
                    {
                        title: "Climate Summit Reaches Historic Agreement on Carbon Reduction",
                        summary: "World leaders at the Global Climate Summit have agreed to reduce carbon emissions by 45% by 2035, marking the most ambitious climate agreement to date.",
                        source: "Environmental Report",
                        category: "Environment",
                        sentiment: "Positive",
                        importance: 9.0,
                        date: "Yesterday, 14:15",
                        aiAnalyzed: true
                    },
                    {
                        title: "Healthcare Reform Bill Passes Senate with Bipartisan Support",
                        summary: "A comprehensive healthcare reform bill passed the Senate with a vote of 67-33, securing support from both parties after months of negotiations.",
                        source: "Political Insight",
                        category: "Politics",
                        sentiment: "Positive",
                        importance: 8.9,
                        date: "2 days ago, 22:10",
                        aiAnalyzed: false
                    },
                    {
                        title: "Central Bank Maintains Interest Rates Despite Inflation Concerns",
                        summary: "The Central Bank voted to maintain current interest rates at 3.25%, citing robust economic growth despite growing concerns about inflation.",
                        source: "Economic Observer",
                        category: "Economy",
                        sentiment: "Neutral",
                        importance: 8.4,
                        date: "2 days ago, 14:30",
                        aiAnalyzed: true
                    },
                    {
                        title: "Major Data Breach Affects 50 Million Users of Social Platform",
                        summary: "A significant security breach at a leading social media platform has exposed personal data of approximately 50 million users worldwide.",
                        source: "Cyber Security Today",
                        category: "Technology",
                        sentiment: "Negative",
                        importance: 9.1,
                        date: "3 days ago, 07:45",
                        aiAnalyzed: true
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
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon (Pred)', 'Tue (Pred)', 'Wed (Pred)'],
                    values: [0.2, 0.4, 0.1, -0.2, -0.1, 0.3, 0.5, 0.4, 0.3, 0.2],
                    realDataPoints: 7
                },

                categoryDistributionData: {
                    labels: ['Economy', 'Politics', 'Technology', 'Health', 'Environment', 'Sports'],
                    values: [36, 25, 18, 12, 6, 3]
                },

                // Entity network data
                entityNetworkData: {
                    nodes: [
                        { id: 1, name: "European Commission", group: 2, val: 28 },
                        { id: 2, name: "United States", group: 3, val: 26 },
                        { id: 3, name: "John Smith", group: 1, val: 24 },
                        { id: 4, name: "Tesla", group: 2, val: 23 },
                        { id: 5, name: "China", group: 3, val: 21 },
                        { id: 6, name: "Climate Change", group: 4, val: 20 },
                        { id: 7, name: "Bitcoin", group: 2, val: 19 },
                        { id: 8, name: "President Johnson", group: 1, val: 18 },
                        { id: 9, name: "Microsoft", group: 2, val: 17 },
                        { id: 10, name: "AI Regulation", group: 4, val: 16 },
                        { id: 11, name: "New York", group: 3, val: 16 },
                        { id: 12, name: "Federal Reserve", group: 2, val: 15 },
                        { id: 13, name: "Trade Policy", group: 4, val: 14 },
                        { id: 14, name: "Sarah Williams", group: 1, val: 14 },
                        { id: 15, name: "Inflation", group: 4, val: 13 }
                    ],
                    links: [
                        { source: 1, target: 10, value: 5 },
                        { source: 1, target: 2, value: 8 },
                        { source: 2, target: 5, value: 7 },
                        { source: 2, target: 8, value: 6 },
                        { source: 2, target: 13, value: 5 },
                        { source: 3, target: 9, value: 4 },
                        { source: 4, target: 9, value: 3 },
                        { source: 5, target: 13, value: 6 },
                        { source: 6, target: 1, value: 4 },
                        { source: 7, target: 12, value: 3 },
                        { source: 8, target: 3, value: 2 },
                        { source: 8, target: 14, value: 4 },
                        { source: 9, target: 10, value: 5 },
                        { source: 11, target: 12, value: 3 },
                        { source: 12, target: 15, value: 7 },
                        { source: 13, target: 5, value: 4 },
                        { source: 14, target: 1, value: 3 },
                        { source: 15, target: 12, value: 5 }
                    ]
                },

                // Initialize
                init() {
                    this.initCharts();
                    this.initEntityNetwork();
                    this.startAiTypingEffect();
                    
                    // Simulate real-time data updates
                    setInterval(() => {
                        this.cycleAiMessage();
                    }, 10000);
                },

                // Initialize all charts
                initCharts() {
                    this.initSentimentTrendChart();
                    this.initCategoryDistributionChart();
                    this.initSentimentDistributionChart();
                    this.initPostsHistoryChart();
                    this.initSentimentHistoryChart();
                },

                // Initialize entity network visualization
                initEntityNetwork() {
                    const Graph = ForceGraph()
                        .graphData(this.entityNetworkData)
                        .backgroundColor('rgba(0,0,0,0)')
                        .nodeId('id')
                        .nodeVal('val')
                        .nodeLabel('name')
                        .nodeColor(node => {
                            if (node.group === 1) return 'var(--primary)';
                            if (node.group === 2) return 'var(--accent)';
                            if (node.group === 3) return 'var(--secondary)';
                            return '#f59e0b';
                        })
                        .nodeRelSize(6)
                        .linkWidth(link => Math.sqrt(link.value))
                        .linkColor(() => 'rgba(255, 255, 255, 0.2)')
                        .width(document.getElementById('entity-network').offsetWidth)
                        .height(document.getElementById('entity-network').offsetHeight)
                        .d3AlphaDecay(0.05)
                        .d3VelocityDecay(0.1)
                        .cooldownTicks(100)
                        (document.getElementById('entity-network'));
                },

                // Initialize the sentiment trend chart
                initSentimentTrendChart() {
                    const ctx = document.getElementById('sentimentTrendChart').getContext('2d');
                    const gradientFill = ctx.createLinearGradient(0, 0, 0, 250);
                    gradientFill.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                    gradientFill.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

                    const data = this.sentimentTrendData;
                    const realDataPoints = data.realDataPoints;

                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.labels,
                            datasets: [
                                {
                                    label: 'Sentiment Score',
                                    data: data.values.slice(0, realDataPoints),
                                    borderColor: 'rgb(99, 102, 241)',
                                    backgroundColor: gradientFill,
                                    tension: 0.3,
                                    fill: true,
                                    pointBackgroundColor: 'rgb(99, 102, 241)',
                                    pointBorderColor: '#1e293b',
                                    pointBorderWidth: 2,
                                    pointRadius: 4,
                                    pointHoverRadius: 6,
                                },
                                {
                                    label: 'AI Forecast',
                                    data: [...Array(realDataPoints).fill(null), ...data.values.slice(realDataPoints)],
                                    borderColor: 'rgba(139, 92, 246, 0.8)',
                                    borderDash: [5, 5],
                                    backgroundColor: 'rgba(0, 0, 0, 0)',
                                    tension: 0.3,
                                    fill: false,
                                    pointBackgroundColor: 'rgba(139, 92, 246, 0.8)',
                                    pointBorderColor: '#1e293b',
                                    pointBorderWidth: 2,
                                    pointRadius: 4,
                                    pointHoverRadius: 6,
                                }
                            ]
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
                                    display: true,
                                    position: 'top',
                                    labels: {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        boxWidth: 12,
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

                // Initialize the category distribution chart
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

                // Initialize the sentiment distribution chart
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

                // Initialize posts history mini chart
                initPostsHistoryChart() {
                    const ctx = document.getElementById('postsHistoryChart').getContext('2d');
                    
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
                            datasets: [{
                                data: [65, 72, 68, 75, 82, 88, 94, 90, 97, 102, 105, 110],
                                borderColor: 'rgba(99, 102, 241, 0.8)',
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                tension: 0.4,
                                borderWidth: 2,
                                pointRadius: 0
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    display: false
                                },
                                x: {
                                    display: false
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    enabled: false
                                }
                            },
                            elements: {
                                line: {
                                    tension: 0.4
                                }
                            }
                        }
                    });
                },

                // Initialize sentiment history mini chart
                initSentimentHistoryChart() {
                    const ctx = document.getElementById('sentimentHistoryChart').getContext('2d');
                    
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
                            datasets: [{
                                data: [0.2, 0.3, 0.25, 0.4, 0.35, 0.45, 0.5, 0.4, 0.3, 0.35, 0.25, 0.3],
                                borderColor: 'rgba(16, 185, 129, 0.8)',
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                tension: 0.4,
                                borderWidth: 2,
                                pointRadius: 0
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    display: false,
                                    min: -0.5,
                                    max: 0.6
                                },
                                x: {
                                    display: false
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    enabled: false
                                }
                            },
                            elements: {
                                line: {
                                    tension: 0.4
                                }
                            }
                        }
                    });
                },

                // Filter entities based on selected type
                get filteredEntities() {
                    if (this.entityFilter === 'all') {
                        return this.entities;
                    }
                    return this.entities.filter(entity => entity.type === this.entityFilter);
                },

                // Toggle AI insights panel
                toggleAiPanel() {
                    this.aiPanelOpen = !this.aiPanelOpen;
                    if (this.aiPanelOpen) {
                        this.resetAiTypingEffect();
                    }
                },

                // Update importance filter
                updateImportanceFilter() {
                    console.log(`Importance threshold set to: ${this.importanceThreshold}`);
                    // In a real app, this would filter the news list
                },

                // Date range text
                getDateRangeText() {
                    switch(this.selectedDateRange) {
                        case 'today': return 'Today';
                        case 'yesterday': return 'Yesterday';
                        case 'week': return 'Last 7 days';
                        case 'month': return 'Last 30 days';
                        case 'quarter': return 'Last Quarter';
                        case 'custom': return 'Custom Range';
                        default: return 'Last 7 days';
                    }
                },

                // Folder text
                getFolderText() {
                    switch(this.selectedFolder) {
                        case 'all': return 'All Folders';
                        case 'politics': return 'Politics';
                        case 'economy': return 'Economy';
                        case 'technology': return 'Technology';
                        case 'health': return 'Health';
                        case 'environment': return 'Environment';
                        case 'sports': return 'Sports';
                        case 'saved': return 'Saved Preferences';
                        default: return 'All Folders';
                    }
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

                // Select date range
                selectDateRange(range) {
                    this.selectedDateRange = range;
                    this.updateData();
                },

                // Select folder
                selectFolder(folder) {
                    this.selectedFolder = folder;
                    this.updateData();
                },

                // AI typing effect
                startAiTypingEffect() {
                    this.aiTypingIndex = 0;
                    this.aiTypingMessage = "";
                    const currentMessage = this.aiMessages[this.aiMessageIndex];
                    
                    const typingInterval = setInterval(() => {
                        if (this.aiTypingIndex < currentMessage.length) {
                            this.aiTypingMessage += currentMessage.charAt(this.aiTypingIndex);
                            this.aiTypingIndex++;
                        } else {
                            clearInterval(typingInterval);
                        }
                    }, 50);
                },

                // Reset AI typing effect
                resetAiTypingEffect() {
                    this.startAiTypingEffect();
                },

                // Cycle through AI messages
                cycleAiMessage() {
                    this.aiMessageIndex = (this.aiMessageIndex + 1) % this.aiMessages.length;
                    this.startAiTypingEffect();
                },

                // Update data (simulate API call)
                updateData() {
                    console.log(`Fetching data for: ${this.selectedDateRange}, Folder: ${this.selectedFolder}`);
                    
                    // Simulate loading state and data update
                    setTimeout(() => {
                        // Update KPIs with random values to simulate real data changes
                        this.totalPosts = Math.floor(Math.random() * 1000) + 1000;
                        this.postsChange = (Math.random() * 20 - 10).toFixed(1);
                        this.averageSentiment = (Math.random() * 2 - 1).toFixed(1);
                        this.sentimentChange = (Math.random() * 10 - 5).toFixed(1);
                        this.newPostsToday = Math.floor(Math.random() * 100) + 50;
                        this.newPostsChange = (Math.random() * 30 - 15).toFixed(1);

                        // Update sentiment trend chart data
                        this.sentimentTrendData.values = [
                            ...Array(7).fill(0).map(() => (Math.random() * 2 - 1).toFixed(1) * 1),
                            ...Array(3).fill(0).map(() => (Math.random() * 1.6 - 0.8).toFixed(1) * 1)
                        ];
                        
                        // Update category distribution
                        const newCategoryValues = Array(6).fill(0).map(() => Math.floor(Math.random() * 30) + 5);
                        const total = newCategoryValues.reduce((a, b) => a + b, 0);
                        this.categoryDistributionData.values = newCategoryValues.map(v => Math.round(v / total * 100));
                        
                        // Update sentiment distribution
                        const positive = Math.floor(Math.random() * 60) + 20;
                        const negative = Math.floor(Math.random() * 40) + 10;
                        const neutral = 100 - positive - negative;
                        this.sentimentDistribution = { positive, neutral, negative };
                        
                        // Update top topic based on new category values
                        const maxIndex = this.categoryDistributionData.values.indexOf(Math.max(...this.categoryDistributionData.values));
                        this.topTopic = this.categoryDistributionData.labels[maxIndex];
                        this.topTopicPercentage = this.categoryDistributionData.values[maxIndex];
                        
                        // Re-initialize all charts with new data
                        this.initCharts();
                    }, 500);
                }
            };
        }
    </script>
</body>
</html>

```
