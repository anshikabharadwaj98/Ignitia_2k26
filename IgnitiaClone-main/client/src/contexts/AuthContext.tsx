import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authAPI, authStorage } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuthData: (user: User, token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = authStorage.getToken();
        const storedUser = authStorage.getUser();

        if (storedToken && storedUser) {
          // Verify token is still valid by fetching profile
          try {
            const currentUser = await authAPI.getProfile(storedToken);
            setUser(currentUser);
            setToken(storedToken);
          } catch (error) {
            // Token is invalid, clear storage
            authStorage.clear();
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        authStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      setUser(response.user);
      setToken(response.token);
      authStorage.setToken(response.token);
      authStorage.setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await authAPI.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      authStorage.clear();
    }
  };

  const setAuthData = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    authStorage.setToken(userToken);
    authStorage.setUser(userData);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    setAuthData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};