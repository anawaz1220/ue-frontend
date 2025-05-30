import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state - check if user is already logged in
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Check if there's a valid token
        const token = authService.getStoredToken();
        
        if (token) {
          // If token exists, fetch user profile
          const userProfile = await userService.getCurrentProfile();
          if (userProfile.success) {
            setUser(userProfile.data);
          } else {
            // If user profile fetch fails, clear tokens
            authService.clearTokens();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.clearTokens();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const authData = await authService.login(email, password);
      
      // After successful login, fetch user profile
      setUser(authData.user);
      return authData;
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Register customer function
  const registerCustomer = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.registerCustomer(userData);
      return result;
    } catch (error) {
      setError(error.message || 'Customer registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Register business function
  const registerBusiness = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.registerBusiness(userData);
      return result;
    } catch (error) {
      setError(error.message || 'Business registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user even if API call fails
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify email function
  const verifyEmail = useCallback(async (token) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.verifyEmail(token);
      return result;
    } catch (error) {
      setError(error.message || 'Email verification failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Password reset request function
  const requestPasswordReset = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.requestPasswordReset(email);
      return result;
    } catch (error) {
      setError(error.message || 'Password reset request failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Password reset function
  const resetPassword = useCallback(async (token, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.resetPassword(token, newPassword);
      return result;
    } catch (error) {
      setError(error.message || 'Password reset failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user data after profile changes
  const updateUserData = useCallback(async () => {
    if (!user) return;
    
    try {
      const userProfile = await userService.getCurrentProfile();
      if (userProfile.success) {
        setUser(userProfile.data);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }, [user]);

  // Value object to be provided by the context
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    registerCustomer,
    registerBusiness,
    verifyEmail,
    requestPasswordReset,
    resetPassword,
    updateUserData,
    isAuthenticated: !!user,
    isCustomer: user?.role === 'CUSTOMER',
    isBusiness: user?.role === 'BUSINESS',
    isAdmin: user?.role === 'ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;