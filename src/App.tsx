import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth-context';
import { ApiProvider } from '@/lib/api-context';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<div>Home Page</div>}>
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
