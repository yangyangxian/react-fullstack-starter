import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ApiErrorResponse, LoginReqDto, UserResDto } from '@fullstack/common';
import { apiClient } from '../utils/APIClient';
import logger from '../utils/logger';

interface IAuthContext {
  isAuthenticated: boolean;
  user: UserResDto | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserResDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    apiClient.get<UserResDto>('/api/auth/me')
      .then((userData: UserResDto) => {
        setUser(userData);
        setIsAuthenticated(true);
        logger.info('User authenticated:', userData);
      })
      .catch((error) => {
        setUser(null);
        setIsAuthenticated(false);
        logger.info('User not authenticated');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    return apiClient.post<LoginReqDto, UserResDto>(
      '/api/auth/login',
      { email, password }
      )
      .then((userData: UserResDto) => {
        setUser(userData);
        setIsAuthenticated(true);
        logger.info('Login successful:', userData);
      })
      .catch((error : ApiErrorResponse) => {
        logger.error('Login failed:', error);
        throw error; // Re-throw so LoginPage can handle it
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    return apiClient.post('/api/auth/logout', {})
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
        logger.info('Logout successful');
      })
      .catch((error : ApiErrorResponse) => {
        logger.error('Logout failed:', error);
        // Even if logout fails on server, clear local state
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
