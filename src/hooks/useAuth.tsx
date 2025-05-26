// Simple mock implementation of useAuth that doesn't require AuthProvider
export const useAuth = () => {
  return {
    user: { id: '1', name: 'User', email: 'user@example.com' },
    login: async () => console.log('Mock login'),
    logout: () => console.log('Mock logout'),
    isAuthenticated: true,
    isLoading: false
  };
};
