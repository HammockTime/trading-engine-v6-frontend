import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../lib/types';

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
  handleGoogleCallback: (response: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // In a real implementation, we would validate the token with the backend
          // For now, we'll simulate a successful authentication
          
          // Simulate fetching user data
          const userData: User = {
            id: 'user_123',
            email: 'user@example.com',
            name: 'Demo User',
            picture: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
            createdAt: new Date().toISOString(),
          };
          
          setAuthState({
            isAuthenticated: true,
            user: userData,
            loading: false,
            error: null,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Failed to authenticate',
        });
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async () => {
    // In a real implementation, this would trigger the Google OAuth flow
    // For now, we'll simulate a successful login
    
    try {
      setAuthState({
        ...authState,
        loading: true,
        error: null,
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      const userData: User = {
        id: 'user_123',
        email: 'user@example.com',
        name: 'Demo User',
        picture: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
        createdAt: new Date().toISOString(),
      };
      
      // Store token in localStorage
      localStorage.setItem('token', 'demo_token');
      
      setAuthState({
        isAuthenticated: true,
        user: userData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Failed to login',
      });
    }
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Update auth state
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      setAuthState({
        ...authState,
        loading: true,
        error: null,
      });
      
      // In a real implementation, we would send the token to the backend for verification
      // For now, we'll simulate a successful authentication
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract user data from Google response
      const userData: User = {
        id: 'google_user_123',
        email: response.email || 'google_user@example.com',
        name: response.name || 'Google User',
        picture: response.picture || 'https://ui-avatars.com/api/?name=Google+User&background=0D8ABC&color=fff',
        createdAt: new Date().toISOString(),
      };
      
      // Store token in localStorage
      localStorage.setItem('token', response.credential || 'google_token');
      
      setAuthState({
        isAuthenticated: true,
        user: userData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Failed to authenticate with Google',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        handleGoogleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
