import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth-context';
import { ApiProvider } from '@/lib/api-context';
import ApiTest from '@/components/ApiTest';

const HomePage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Trading Prediction Engine v6</h1>
    <ApiTest />
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
      <Route path="*" element={<div>Not Found</div>} />
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
