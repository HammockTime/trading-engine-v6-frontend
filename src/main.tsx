import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// For debugging - log when the app starts to render
console.log('Initializing Trading Engine v6 Frontend');

// Make sure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
} else {
  try {
    // Mock any global hooks that might be used before providers are set up
    window.useAuth = () => ({
      user: { id: '1', name: 'User', email: 'user@example.com' },
      login: async () => console.log('Mock login'),
      logout: () => console.log('Mock logout'),
      isAuthenticated: true,
      isLoading: false
    });
    
    window.useApi = () => ({
      baseUrl: 'https://api.example.com',
      get: async ( ) => ({ success: true, data: { message: 'Mock data' } }),
      post: async () => ({ success: true, data: { message: 'Mock data created' } }),
      put: async () => ({ success: true, data: { message: 'Mock data updated' } }),
      delete: async () => ({ success: true, data: { message: 'Mock data deleted' } }),
      isLoading: false
    });
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
  }
}
