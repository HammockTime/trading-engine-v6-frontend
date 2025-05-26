import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './contexts/ApiContext';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AssetDetailPage from './pages/AssetDetailPage';
import SettingsPage from './pages/SettingsPage';
import StrategyGuidesPage from './pages/StrategyGuidesPage';
import NotFoundPage from './pages/NotFoundPage';

// For debugging
console.log('App component loaded');

const App: React.FC = () => {
  console.log('App component rendering');
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="asset/:symbol" element={<AssetDetailPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="guides" element={<StrategyGuidesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
};

export default App;
