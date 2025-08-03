import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api.service';
import { User, LoginFormData, RegisterFormData } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  refreshToken: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          // Verify token and get user data
          const userData = await authAPI.verifyToken();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Token invalid, clear it
          localStorage.removeItem('auth_token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Set up token refresh interval
  useEffect(() => {
    if (isAuthenticated) {
      const refreshInterval = setInterval(() => {
        refreshToken();
      }, 15 * 60 * 1000); // Refresh every 15 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [isAuthenticated]);

  const login = useCallback(async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(data.email, data.password);
      
      // Store token
      localStorage.setItem('auth_token', response.token);
      if (data.rememberMe) {
        localStorage.setItem('remember_email', data.email);
      } else {
        localStorage.removeItem('remember_email');
      }
      
      // Set user data
      setUser(response.user);
      setIsAuthenticated(true);
      
      // Navigate to dashboard
      navigate('/');
      toast.success(`Welcome back, ${response.user.name}!`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(data);
      
      // Store token
      localStorage.setItem('auth_token', response.token);
      
      // Set user data
      setUser(response.user);
      setIsAuthenticated(true);
      
      // Navigate to onboarding or dashboard
      navigate('/onboarding');
      toast.success('Welcome to NeuroPrep! Let\'s get started.');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Clear local data
      localStorage.removeItem('auth_token');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
      toast.success('Logged out successfully');
    }
  }, [navigate]);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await authAPI.refreshToken();
      localStorage.setItem('auth_token', response.token);
    } catch (error) {
      // If refresh fails, logout user
      console.error('Token refresh failed:', error);
      logout();
    }
  }, [logout]);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      await authAPI.forgotPassword(email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send reset email.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    try {
      setIsLoading(true);
      await authAPI.resetPassword(token, password);
      toast.success('Password reset successfully! You can now login.');
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to reset password.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const verifyEmail = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      await authAPI.verifyEmail(token);
      toast.success('Email verified successfully!');
      navigate('/');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to verify email.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// HOC for protecting routes
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: string
): React.FC<P> => {
  return (props: P) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate('/login');
      } else if (requiredRole && user?.role !== requiredRole) {
        toast.error('You do not have permission to access this page');
        navigate('/');
      }
    }, [isAuthenticated, user, isLoading, navigate]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="loading-spinner" />
        </div>
      );
    }

    if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
      return null;
    }

    return <Component {...props} />;
  };
};
