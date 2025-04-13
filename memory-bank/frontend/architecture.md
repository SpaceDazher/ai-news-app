# Frontend Architecture

## Overview
The frontend of AI News App is built as a Single Page Application (SPA) using React and TypeScript. It follows the Feature-Sliced Design (FSD) architecture pattern for better modularity, scalability, and maintainability.

## Core Responsibilities
- Rendering the user interface (UI)
- Handling user interactions
- Managing application state
- Communicating with the Backend API
- Displaying real-time updates via WebSocket
- Routing between different application pages

## Technology Stack
- **UI Framework**: React (v18+)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router (v6+)
- **API Communication**: Axios/Fetch API
- **Real-time**: Socket.IO Client
- **Visualization**: Chart.js/Recharts
- **Build Tool**: Vite or Create React App
- **Styling**: CSS Modules, Styled Components, or Tailwind CSS

## Feature-Sliced Design Architecture
The project follows Feature-Sliced Design principles with the following layers:

src/ ├── app/ # Application initialization │ ├── providers/ # Global providers (Redux, Router, Auth) │ ├── routes/ # Route configuration │ └── App.tsx # Main component ├── pages/ # Page components (route entry points) │ ├── auth/ │ ├── manage-sources/ │ ├── data-viewer/ │ ├── classification-dashboard/ │ ├── folders/ │ ├── dashboard/ │ └── admin/ ├── widgets/ # Complex UI blocks │ ├── Header/ │ ├── Sidebar/ │ ├── FolderCardWidget/ │ ├── AggregatedPostWidget/ │ └── ChartWidget/ ├── features/ # Business features │ ├── auth/ │ ├── manageSources/ │ ├── dataViewer/ │ ├── manageFolders/ │ └── mainDashboard/ ├── entities/ # Business entities │ ├── user/ │ ├── source/ │ ├── post/ │ ├── analysisResult/ │ ├── folder/ │ └── dashboard/ ├── shared/ # Shared infrastructure │ ├── ui/ # UI components │ ├── lib/ # Utilities and hooks │ ├── config/ # Configuration │ └── api/ # API client └── index.tsx # Entry point


## State Management (Redux Toolkit)
- **Store**: Centralized application state in the Redux store
- **Slices**: Modular state management with Redux Toolkit slices:
  - `authSlice`
  - `sourcesSlice`
  - `postsSlice`
  - `foldersSlice`
  - `dashboardSlice`
  - `modulesConfigSlice`
- **Async Thunks**: API calls and async operations handled with createAsyncThunk
- **Selectors**: Optimized state selection with createSelector

## Routing (React Router)
**Main Routes**:
- `/auth`: Authentication pages
- `/manage-sources`: Source management
- `/data-viewer`: Content viewing
- `/dashboard`: Main dashboard
- `/folders`: Classification dashboard
- `/folders/:folderId`: Folder content
- `/admin/modules`: Analysis module configuration

Protected routes ensure authenticated access to application features.

## API Integration
- Centralized API client in `shared/api`
- API methods organized by entity in `entities/*/api`
- Integration with Redux Toolkit's createAsyncThunk for async operations
- Authentication header management and token refresh logic

## WebSocket Integration (Socket.IO)
- Connection management with proper connection/disconnection handling
- Event listeners for real-time updates (e.g., `analysis-update`)
- Integration with Redux for updating application state
- Error handling and reconnection logic

## Authentication Flow
- JWT token storage and management
- Protected route implementation
- Login, registration, and logout functionality
- Automatic token refresh mechanism
- 401 error handling with redirect to login