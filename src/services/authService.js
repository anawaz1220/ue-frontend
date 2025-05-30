// src/services/authService.js - UPDATED VERSION
import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Create axios instance with production URL
const authAPI = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
authAPI.interceptors.request.use(
  (config) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
authAPI.interceptors.response.use(
  (response) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    // Enhanced error logging for production debugging
    console.error('❌ API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

// Helper to store tokens
const storeTokens = (accessToken, expiresIn) => {
  try {
    localStorage.setItem('accessToken', accessToken);
    
    // Store expiry time by adding seconds to current time
    const expiryTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    
    console.log('🔐 Tokens stored successfully');
  } catch (error) {
    console.error('❌ Error storing tokens:', error);
  }
};

// Helper to get stored token and check if it's valid
const getStoredToken = () => {
  try {
    const token = localStorage.getItem('accessToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (!token || !tokenExpiry) {
      return null;
    }
    
    // Check if token is expired
    if (new Date().getTime() > parseInt(tokenExpiry, 10)) {
      console.log('🔐 Token expired, clearing storage');
      clearTokens();
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('❌ Error getting stored token:', error);
    return null;
  }
};

// Clear tokens on logout
const clearTokens = () => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiry');
    console.log('🔐 Tokens cleared');
  } catch (error) {
    console.error('❌ Error clearing tokens:', error);
  }
};

// Register a customer
const registerCustomer = async (userData) => {
  try {
    console.log('👤 Registering customer...');
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.REGISTER_CUSTOMER, userData);
    console.log('✅ Customer registered successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Customer registration error:', error.response?.data || error.message);
    throw handleApiError(error);
  }
};

// Register a business
const registerBusiness = async (userData) => {
  try {
    console.log('🏢 Registering business...');
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.REGISTER_BUSINESS, userData);
    console.log('✅ Business registered successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Business registration error:', error.response?.data || error.message);
    throw handleApiError(error);
  }
};

// Login user (customer, business, or admin)
const login = async (email, password) => {
  try {
    console.log('🔑 Logging in user:', email);
    
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.LOGIN, { 
      email, 
      password 
    });
    
    const { data } = response;
    
    if (data.success && data.data.accessToken) {
      storeTokens(data.data.accessToken, data.data.expiresIn);
      console.log('✅ Login successful for:', data.data.user.email);
      return data.data;
    }
    
    throw new Error('Login response did not contain required authentication data');
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
    throw handleApiError(error);
  }
};

// Logout user
const logout = async () => {
  try {
    console.log('👋 Logging out user...');
    // Call logout endpoint to clear refresh token cookie
    await authAPI.post(API_CONFIG.ENDPOINTS.LOGOUT);
    clearTokens();
    console.log('✅ Logout successful');
    return { success: true };
  } catch (error) {
    console.error('❌ Logout error:', error);
    // Still clear local tokens even if API call fails
    clearTokens();
    throw handleApiError(error);
  }
};

// Refresh the access token using refresh token cookie
const refreshToken = async () => {
  try {
    console.log('🔄 Refreshing token...');
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.REFRESH_TOKEN);
    const { data } = response;
    
    if (data.success && data.data.accessToken) {
      storeTokens(data.data.accessToken, data.data.expiresIn);
      console.log('✅ Token refreshed successfully');
      return data.data;
    }
    
    throw new Error('Refresh token response did not contain required data');
  } catch (error) {
    console.error('❌ Token refresh error:', error);
    clearTokens(); // Clear tokens if refresh fails
    throw handleApiError(error);
  }
};

// Verify email
const verifyEmail = async (token) => {
  try {
    console.log('📧 Verifying email...');
    const response = await authAPI.get(`${API_CONFIG.ENDPOINTS.VERIFY_EMAIL}/${token}`);
    console.log('✅ Email verified successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Email verification error:', error);
    throw handleApiError(error);
  }
};

// Request password reset
const requestPasswordReset = async (email) => {
  try {
    console.log('🔐 Requesting password reset for:', email);
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.REQUEST_PASSWORD_RESET, { email });
    console.log('✅ Password reset request sent');
    return response.data;
  } catch (error) {
    console.error('❌ Password reset request error:', error);
    throw handleApiError(error);
  }
};

// Reset password
const resetPassword = async (token, newPassword) => {
  try {
    console.log('🔐 Resetting password...');
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.RESET_PASSWORD, {
      token,
      newPassword
    });
    console.log('✅ Password reset successful');
    return response.data;
  } catch (error) {
    console.error('❌ Password reset error:', error);
    throw handleApiError(error);
  }
};

// Resend verification email
const resendVerification = async (email) => {
  try {
    console.log('📧 Resending verification email for:', email);
    const response = await authAPI.post(API_CONFIG.ENDPOINTS.RESEND_VERIFICATION, { email });
    console.log('✅ Verification email resent');
    return response.data;
  } catch (error) {
    console.error('❌ Resend verification error:', error);
    throw handleApiError(error);
  }
};

// Enhanced error handler
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    const { data, status } = error.response;
    
    // Log error details for debugging
    console.error('🔍 API Error Details:', { 
      status, 
      message: data?.message,
      url: error.config?.url,
      method: error.config?.method 
    });
    
    // Return user-friendly error message
    if (data && data.message) {
      const errorObj = new Error(data.message);
      errorObj.statusCode = status;
      return errorObj;
    }
    
    // Fallback error messages based on status code
    let message;
    switch (status) {
      case 400:
        message = 'Invalid request. Please check your input.';
        break;
      case 401:
        message = 'Authentication failed. Please check your credentials.';
        break;
      case 403:
        message = 'Access denied. You do not have permission.';
        break;
      case 404:
        message = 'Service not found. Please try again later.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      default:
        message = `Error: ${status}`;
    }
    
    const errorObj = new Error(message);
    errorObj.statusCode = status;
    return errorObj;
  } else if (error.request) {
    // The request was made but no response was received
    console.error('🔍 Network Error:', error.request);
    return new Error('Network error. Please check your internet connection and try again.');
  } else {
    // Something happened in setting up the request
    console.error('🔍 Request Setup Error:', error.message);
    return new Error('Request failed. Please try again.');
  }
};

const authService = {
  registerCustomer,
  registerBusiness,
  login,
  logout,
  refreshToken,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  resendVerification,
  getStoredToken,
  clearTokens
};

export default authService;