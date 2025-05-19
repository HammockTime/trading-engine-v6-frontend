import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for API responses and requests
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

interface ApiContextType {
  baseUrl: string;
  get: <T>(endpoint: string) => Promise<ApiResponse<T>>;
  post: <T>(endpoint: string, data: any) => Promise<ApiResponse<T>>;
  put: <T>(endpoint: string, data: any) => Promise<ApiResponse<T>>;
  delete: <T>(endpoint: string) => Promise<ApiResponse<T>>;
}

// Create the context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Create the provider component
export const ApiProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Use the environment variable, with a fallback
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Generic fetch function with error handling
  const fetchApi = async <T,>(
    endpoint: string, 
    options: RequestInit = {}
  ) : Promise<ApiResponse<T>> => {
    try {
      const url = `${baseUrl}/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;
      console.log(`Fetching from: ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return { data, error: null, loading: false };
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error', 
        loading: false 
      };
    }
  };

  // Define HTTP method functions
  const get = <T,>(endpoint: string) => 
    fetchApi<T>(endpoint, { method: 'GET' });
  
  const post = <T,>(endpoint: string, data: any) => 
    fetchApi<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    });
  
  const put = <T,>(endpoint: string, data: any) => 
    fetchApi<T>(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    });
  
  const deleteRequest = <T,>(endpoint: string) => 
    fetchApi<T>(endpoint, { method: 'DELETE' });

  // Provide the API functions to children
  return (
    <ApiContext.Provider value={{ 
      baseUrl, 
      get, 
      post, 
      put, 
      delete: deleteRequest 
    }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook for using the API context
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiContext;

