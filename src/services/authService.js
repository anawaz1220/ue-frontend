// src/services/authService.js - Complete auth service preserving all existing functionality
import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Enhanced token management class
class AuthTokenManager {
  constructor() {
    this.tokenKey = 'urbanease_access_token';
    this.refreshKey = 'urbanease_refresh_token';
    this.expiryKey = 'urbanease_token_expiry';
  }

  storeTokens(accessToken, expiresIn, refreshToken = null) {
    localStorage.setItem(this.tokenKey, accessToken);
    
    // Calculate and store expiry time
    const expiryTime = new Date().getTime() + (expiresIn * 1000);
    localStorage.setItem(this.expiryKey, expiryTime.toString());
    
    if (refreshToken) {
      localStorage.setItem(this.refreshKey, refreshToken);
    }
    
    console.log('🔐 Auth tokens stored successfully');
  }

  getStoredToken() {
    const token = localStorage.getItem(this.tokenKey);
    const tokenExpiry = localStorage.getItem(this.expiryKey);
    
    if (!token || !tokenExpiry) return null;
    
    // Check if token is expired (with 60-second buffer)
    if (new Date().getTime() > (parseInt(tokenExpiry, 10) - 60000)) {
      this.clearTokens();
      return null;
    }
    
    return token;
  }

  clearTokens() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.expiryKey);
    console.log('🔐 Auth tokens cleared');
  }
}

const tokenManager = new AuthTokenManager();

// Create dedicated auth axios instance
const authAPI = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT || 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Set to false for JWT-based auth
});

// Request interceptor for auth API
authAPI.interceptors.request.use(
  (config) => {
    // Add auth token for authenticated endpoints
    const token = tokenManager.getStoredToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Enhanced logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Auth API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        baseURL: config.baseURL,
        hasToken: !!token
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Auth Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for auth API
authAPI.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Auth API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('❌ Auth API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

// Login function with enhanced error handling
const login = async (email, password) => {
  try {
    console.log('🔑 Attempting login for:', email);
    console.log('🔑 Login parameters received:', { email, password });
    
    const requestBody = { email, password };
    console.log('📦 Request body being sent:', requestBody);
    
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.LOGIN, requestBody);
    
    const { data } = response;
    console.log('🔍 Raw API response data:', data); // Add this debug log
    
    // Handle different response structures
    if (data.success === false) {
      throw new Error(data.message || 'Login failed');
    }
    
    // Check for required data
    if (data.success && data.data && data.data.accessToken) {
      const { user, accessToken, expiresIn, refreshToken } = data.data;
      
      // Store tokens
      tokenManager.storeTokens(accessToken, expiresIn, refreshToken);
      
      console.log('✅ Login successful');
      
      // THIS IS THE FIX - Return the complete response data
      return {
        success: true,
        data: {
          user,
          accessToken,
          expiresIn,
          refreshToken
        }
      };
    }
    
    // Handle direct response format (fallback)
    if (data.accessToken) {
      tokenManager.storeTokens(data.accessToken, data.expiresIn, data.refreshToken);
      console.log('✅ Login successful (direct format)');
      return data;
    }
    
    throw new Error('Invalid login response format');
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.message || error.message);
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

// Register customer function
const registerCustomer = async (userData) => {
  try {
    console.log('👤 Registering customer...');
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.REGISTER_CUSTOMER, userData);
    console.log('✅ Customer registered successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Customer registration failed:', error.response?.data?.message || error.message);
    const errorMessage = error.response?.data?.message || error.message || 'Customer registration failed';
    throw new Error(errorMessage);
  }
};

// Register business function
const registerBusiness = async (userData) => {
  try {
    console.log('🏢 Registering business...');
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.REGISTER_BUSINESS, userData);
    console.log('✅ Business registered successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Business registration failed:', error.response?.data?.message || error.message);
    const errorMessage = error.response?.data?.message || error.message || 'Business registration failed';
    throw new Error(errorMessage);
  }
};

// Logout function
const logout = async () => {
  try {
    console.log('🚪 Logging out...');
    await authAPI.post(API_CONFIG.ENDPOINTS.LOGOUT);
    tokenManager.clearTokens();
    console.log('✅ Logout successful');
  } catch (error) {
    // Clear tokens even if API call fails
    tokenManager.clearTokens();
    console.error('⚠️ Logout API failed, but tokens cleared:', error);
  }
};

// Email verification function
const verifyEmail = async (token) => {
  try {
    console.log('📧 Verifying email with token...');
    const response = await authAPI.get(`${API_CONFIG.ENDPOINTS.VERIFY_EMAIL.replace(':token', token)}`);
    console.log('✅ Email verification successful');
    return response.data;
  } catch (error) {
    console.error('❌ Email verification failed:', error.response?.data?.message || error.message);
    const errorMessage = error.response?.data?.message || error.message || 'Email verification failed';
    throw new Error(errorMessage);
  }
};

// Request password reset function
const requestPasswordReset = async (email) => {
  try {
    console.log('🔐 Requesting password reset for:', email);
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.REQUEST_PASSWORD_RESET, { email });
    console.log('✅ Password reset request sent');
    return response.data;
  } catch (error) {
    console.error('❌ Password reset request failed:', error.response?.data?.message || error.message);
    const errorMessage = error.response?.data?.message || error.message || 'Password reset request failed';
    throw new Error(errorMessage);
  }
};

// Reset password function
const resetPassword = async (token, newPassword) => {
  try {
    console.log('🔐 Resetting password with token...');
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.RESET_PASSWORD, {
      token,
      newPassword
    });
    console.log('✅ Password reset successful');
    return response.data;
  } catch (error) {
    console.error('❌ Password reset failed:', error.response?.data?.message || error.message);
    const errorMessage = error.response?.data?.message || error.message || 'Password reset failed';
    throw new Error(errorMessage);
  }
};

// Resend verification email function
const resendVerification = async (email) => {
  try {
    console.log('📧 Resending verification email for:', email);
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.RESEND_VERIFICATION, { email });
    console.log('✅ Verification email resent successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Resend verification failed:', error.response?.data?.message || error.message);
    const errorMessage = error.response?.data?.message || error.message || 'Failed to resend verification email';
    throw new Error(errorMessage);
  }
};

// Refresh token function
const refreshToken = async () => {
  try {
    console.log('🔄 Refreshing access token...');
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.REFRESH_TOKEN);
    
    const { data } = response;
    
    if (data.success && data.data && data.data.accessToken) {
      const { accessToken, expiresIn } = data.data;
      tokenManager.storeTokens(accessToken, expiresIn);
      console.log('✅ Token refresh successful');
      return { accessToken, expiresIn };
    }
    
    throw new Error('Invalid refresh response');
  } catch (error) {
    console.error('❌ Token refresh failed:', error.response?.data?.message || error.message);
    tokenManager.clearTokens();
    throw error;
  }
};

// Auth service object with all functions
const authService = {
  login,
  registerCustomer,
  registerBusiness,
  logout,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  resendVerification,
  refreshToken,
  
  // Token management utilities
  getStoredToken: () => tokenManager.getStoredToken(),
  clearTokens: () => tokenManager.clearTokens(),
  
  // Helper functions
  isLoggedIn: () => !!tokenManager.getStoredToken(),
  
  // Test connection function
  testConnection: async () => {
    try {
      const response = await authAPI.get('/health');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default authService;