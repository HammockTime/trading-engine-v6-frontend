import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth-context';
import { ApiProvider } from '@/lib/api-context';

// Layouts
import RootLayout from '@/layouts/RootLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

// Pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import AssetDetailPage from '@/pages/AssetDetailPage';
import LearningCenterPage from '@/pages/LearningCenterPage';
import SettingsPage from '@/pages/SettingsPage';
import PatternLibraryPage from '@/pages/PatternLibraryPage';
import StrategyGuidesPage from '@/pages/StrategyGuidesPage';
import MarketEducationPage from '@/pages/MarketEducationPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Components
import ProtectedRoute from '@/components/ProtectedRoute';
import ApiTest from '@/components/ApiTest';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/asset/:symbol" element={<AssetDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/learning" element={<LearningCenterPage />} />
        <Route path="/learning/patterns" element={<PatternLibraryPage />} />
        <Route path="/learning/strategies" element={<StrategyGuidesPage />} />
        <Route path="/learning/market" element={<MarketEducationPage />} />
        <Route path="/api-test" element={<ApiTest />} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ApiProvider>
        <RouterProvider router={router} />
      </ApiProvider>
    </AuthProvider>
  );
};

export default App;
