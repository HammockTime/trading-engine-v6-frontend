// Global mocks for hooks that require providers

// Mock useAuth hook
export const useAuth = () => {
  return {
    user: { id: '1', name: 'User', email: 'user@example.com' },
    login: async () => console.log('Mock login'),
    logout: () => console.log('Mock logout'),
    isAuthenticated: true,
    isLoading: false
  };
};

// Mock useApi hook
export const useApi = () => {
  return {
    baseUrl: 'https://api.example.com',
    get: async (endpoint: string ) => {
      console.log(`Mock GET request to ${endpoint}`);
      // Return mock data based on endpoint
      if (endpoint.includes('assets')) {
        return { 
          success: true, 
          data: [
            { id: 1, symbol: 'BTC', name: 'Bitcoin', price: 50000, change24h: 2.5 },
            { id: 2, symbol: 'ETH', name: 'Ethereum', price: 3000, change24h: 1.8 },
            { id: 3, symbol: 'SOL', name: 'Solana', price: 100, change24h: 3.2 }
          ]
        };
      }
      return { success: true, data: { message: 'Mock data' } };
    },
    post: async (endpoint: string, data: any) => {
      console.log(`Mock POST request to ${endpoint}`, data);
      return { success: true, data: { message: 'Mock data created', id: 123 } };
    },
    put: async (endpoint: string, data: any) => {
      console.log(`Mock PUT request to ${endpoint}`, data);
      return { success: true, data: { message: 'Mock data updated' } };
    },
    delete: async (endpoint: string) => {
      console.log(`Mock DELETE request to ${endpoint}`);
      return { success: true, data: { message: 'Mock data deleted' } };
    },
    isLoading: false
  };
};
