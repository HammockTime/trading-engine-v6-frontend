// Simple mock implementation of useApi that doesn't require ApiProvider
export const useApi = () => {
  return {
    baseUrl: 'https://api.example.com',
    get: async (endpoint: string ) => {
      console.log(`Mock GET request to ${endpoint}`);
      return { success: true, data: { message: 'Mock data' } };
    },
    post: async (endpoint: string, data: any) => {
      console.log(`Mock POST request to ${endpoint}`, data);
      return { success: true, data: { message: 'Mock data created' } };
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
