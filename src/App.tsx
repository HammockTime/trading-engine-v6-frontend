import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './lib/auth-context';
import { ApiProvider } from './lib/api-context';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AssetDetailPage = lazy(() => import('./pages/AssetDetailPage'));
const LearningCenterPage = lazy(() => import('./pages/LearningCenterPage'));
const PatternLibraryPage = lazy(() => import('./pages/PatternLibraryPage'));
const StrategyGuidesPage = lazy(() => import('./pages/StrategyGuidesPage'));
const MarketEducationPage = lazy(() => import('./pages/MarketEducationPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: 'register',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <RegisterPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: 'asset/:assetId',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AssetDetailPage />
              </Suspense>
            ),
          },
          {
            path: 'learning',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <LearningCenterPage />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: <Navigate to="/dashboard/learning/patterns" replace />,
              },
              {
                path: 'patterns',
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <PatternLibraryPage />
                  </Suspense>
                ),
              },
              {
                path: 'strategies',
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <StrategyGuidesPage />
                  </Suspense>
                ),
              },
              {
                path: 'education',
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <MarketEducationPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <SettingsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;
