import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { connectAnalysisSocket } from '@/entities/analysisResult/api/analysisSocket';
import { StoreProvider } from '@/app/providers/StoreProvider';
import AuthPage from '@/pages/auth/AuthPage';
import ManageSourcesPage from '@/pages/manage-sources/ManageSourcesPage';
import DataViewerPage from '@/pages/data-viewer/DataViewerPage';
import AnalysisResultsPage from '@/pages/analysis-results/AnalysisResultsPage';
import ClassificationDashboardPage from '@/pages/classification-dashboard/ClassificationDashboardPage';
import FolderContentPage from '@/pages/folders/[folderId]/FolderContentPage';
import MainDashboardPage from '@/pages/dashboard/MainDashboardPage';
import AnalysisModulesConfigPage from '@/pages/admin/modules/AnalysisModulesConfigPage';
import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth/ui/ProtectedRoute';
import { Header } from '@/widgets/Header/Header';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import './App.css';

// Компонент основного макета с Header и Sidebar
const MainLayout = () => (
  <div className="app-layout">
    <Header />
    <div className="app-body">
      <Sidebar />
      <main className="app-content">
        <Outlet /> {/* Здесь будут рендериться дочерние маршруты */}
      </main>
    </div>
  </div>
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    connectAnalysisSocket(dispatch);
  }, [dispatch]);

  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          {/* Маршрут для страницы аутентификации (без основного макета) */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Основной макет для защищенных маршрутов */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
             {/* Основной маршрут теперь ведет на /manage-sources (пока /dashboard не готов) */}
            <Route path="/" element={<ManageSourcesPage />} />
            <Route path="/manage-sources" element={<ManageSourcesPage />} />
            <Route path="/dashboard" element={<MainDashboardPage />} />
            <Route path="/data-viewer" element={<DataViewerPage />} />
            <Route path="/analysis-results" element={<AnalysisResultsPage />} />
            <Route path="/folders" element={<ClassificationDashboardPage />} />
            <Route path="/folders/:folderId" element={<FolderContentPage />} />
            <Route path="/admin/modules" element={<AnalysisModulesConfigPage />} />
          </Route>

          {/* Можно добавить маршрут 404 Not Found */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
