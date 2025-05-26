import React, { createContext, useContext, useState } from 'react';

// Define the shape of our API context
interface ApiContextType {
  baseUrl: string;
  get: (endpoint: string) => Promise<any>;
  post: (endpoint: string, data: any) => Promise<any>;
  put: (endpoint: string, data: any) => Promise<any>;
  delete: (endpoint: string) => Promise<any>;
  isLoading: boolean;
}

// Create a default implementation
const defaultApiContext: ApiContextType = {
  baseUrl: 'https://api.example.com',
  get: async (endpoint ) => {
    console.log(`Mock GET request to ${endpoint}`);
    return { success: true, data: { message: 'Mock data' } };
  },
  post: async (endpoint, data) => {
    console.log(`Mock POST request to ${endpoint}`, data);
    return { success: true, data: { message: 'Mock data created' } };
  },
  put: async (endpoint, data) => {
    console.log(`Mock PUT request to ${endpoint}`, data);
    return { success: true, data: { message: 'Mock data updated' } };
  },
  delete: async (endpoint) => {
    console.log(`Mock DELETE request to ${endpoint}`);
    return { success: true, data: { message: 'Mock data deleted' } };
  },
  isLoading: false
};

// Create the context with our default implementation
const ApiContext = createContext<ApiContextType>(defaultApiContext);

// Custom hook to use the API context
export const useApi = () => {
  return useContext(ApiContext);
};

// Provider component
export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://api.example.com';
  
  const get = async (endpoint: string ) => {
    setIsLoading(true);
    try {
      console.log(`Mock GET request to ${endpoint}`);
      return { success: true, data: { message: 'Mock data' } };
    } catch (error) {
      console.error('API error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const post = async (endpoint: string, data: any) => {
    setIsLoading(true);
    try {
      console.log(`Mock POST request to ${endpoint}`, data);
      return { success: true, data: { message: 'Mock data created' } };
    } catch (error) {
      console.error('API error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const put = async (endpoint: string, data: any) => {
    setIsLoading(true);
    try {
      console.log(`Mock PUT request to ${endpoint}`, data);
      return { success: true, data: { message: 'Mock data updated' } };
    } catch (error) {
      console.error('API error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteRequest = async (endpoint: string) => {
    setIsLoading(true);
    try {
      console.log(`Mock DELETE request to ${endpoint}`);
      return { success: true, data: { message: 'Mock data deleted' } };
    } catch (error) {
      console.error('API error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    baseUrl: apiBaseUrl,
    get,
    post,
    put,
    delete: deleteRequest,
    isLoading
  };
  
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
