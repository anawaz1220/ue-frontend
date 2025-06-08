// src/contexts/AuthContext.jsx - Complete implementation preserving all existing features
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';
import userService from '../services/userService';

// Create context
const AuthContext = createContext();

// Enhanced token management class
class TokenManager {
  constructor() {
    this.tokenKey = 'urbanease_access_token';
    this.refreshKey = 'urbanease_refresh_token';
    this.expiryKey = 'urbanease_token_expiry';
  }

  getAccessToken() {
    const token = localStorage.getItem(this.tokenKey);
    const expiry = localStorage.getItem(this.expiryKey);
    
    if (!token || !expiry) return null;
    
    // Check if token is expired (with 60-second buffer)
    if (new Date().getTime() > (parseInt(expiry, 10) - 60000)) {
      this.clearTokens();
      return null;
    }
    
    return token;
  }

  setTokens(accessToken, expiresIn, refreshToken = null) {
    localStorage.setItem(this.tokenKey, accessToken);
    
    // Calculate expiry time
    const expiryTime = new Date().getTime() + (expiresIn * 1000);
    localStorage.setItem(this.expiryKey, expiryTime.toString());
    
    if (refreshToken) {
      localStorage.setItem(this.refreshKey, refreshToken);
    }
    
    console.log('🔐 Tokens stored successfully');
  }

  clearTokens() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.expiryKey);
    console.log('🔐 Tokens cleared');
  }

  getUserFromToken(token) {
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.sub || decoded.id,
        email: decoded.email,
        role: decoded.role,
        exp: decoded.exp,
        iat: decoded.iat
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isTokenExpired(token) {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < (currentTime + 60); // 60-second buffer
    } catch (error) {
      return true;
    }
  }
}

const tokenManager = new TokenManager();

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
        const token = tokenManager.getAccessToken();
        
        if (token) {
          // Decode token to get basic user info
          const tokenUser = tokenManager.getUserFromToken(token);
          
          if (tokenUser) {
            try {
              // Fetch complete user profile from API
              const userProfile = await userService.getCurrentProfile();
              if (userProfile.success) {
                setUser(userProfile.data);
              } else {
                // If profile fetch fails, use token data as fallback
                setUser(tokenUser);
              }
            } catch (profileError) {
              console.warn('Failed to fetch user profile, using token data:', profileError);
              // Use token data as fallback
              setUser(tokenUser);
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        tokenManager.clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email, password) => {
  setLoading(true);
  setError(null);
  try {
    console.log('🔑 Attempting login for:', email);
    
    const authData = await authService.login(email, password);
    console.log('🔍 AuthService returned:', authData);
    
    // Fix: authData already contains the full response with success property
    if (authData.success === false) {
      throw new Error(authData.message || 'Login failed');
    }
    
    // Handle the response structure from your API
    const { user: userData, accessToken, expiresIn } = authData.data; // Note: authData.data not authData
    
    // Store tokens using the new token manager
    tokenManager.setTokens(accessToken, expiresIn);
    
    // Set user data
    setUser(userData);
    
    console.log('✅ Login successful');
    return authData;
  } catch (error) {
    const errorMessage = error.message || 'Login failed';
    setError(errorMessage);
    console.error('❌ Login error:', errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
}, []);

  // Register customer function preserving existing structure
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

  // Register business function preserving existing structure
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
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with logout even if API call fails
    } finally {
      tokenManager.clearTokens();
      setUser(null);
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

  // Enhanced role checking functions
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  const hasAnyRole = useCallback((roles) => {
    return roles.includes(user?.role);
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
    hasRole,
    hasAnyRole,
    // Convenience getters
    isAuthenticated: !!user,
    isCustomer: user?.role === 'CUSTOMER',
    isBusiness: user?.role === 'BUSINESS',
    isAdmin: user?.role === 'ADMIN',
    // Token management utilities
    getToken: () => tokenManager.getAccessToken(),
    clearSession: () => {
      tokenManager.clearTokens();
      setUser(null);
    }
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