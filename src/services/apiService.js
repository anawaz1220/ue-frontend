// src/services/apiService.js - Complete API service with enhanced error handling
import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Enhanced token management for API service
class APITokenManager {
  getToken() {
    return localStorage.getItem('urbanease_access_token');
  }

  clearTokens() {
    localStorage.removeItem('urbanease_access_token');
    localStorage.removeItem('urbanease_refresh_token');
    localStorage.removeItem('urbanease_token_expiry');
  }

  isTokenExpired() {
    const expiry = localStorage.getItem('urbanease_token_expiry');
    if (!expiry) return true;
    return new Date().getTime() > (parseInt(expiry, 10) - 60000); // 60-second buffer
  }
}

const tokenManager = new APITokenManager();

// Create axios instance with enhanced configuration
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT || 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Set to false for JWT-based auth
});

// Request interceptor to add the auth token and enhanced logging
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    
    if (token && !tokenManager.isTokenExpired()) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Enhanced logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor with comprehensive error handling
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`, {
        data: response.data,
        headers: response.headers
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Enhanced error logging
    console.error('❌ API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      data: error.response?.data
    });

    // Handle 401 unauthorized errors
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      console.log('🔄 Token expired, clearing session...');
      tokenManager.clearTokens();
      
      // Only redirect if we're not already on auth pages
      const currentPath = window.location.pathname;
      const authPaths = ['/login', '/register', '/verify-email', '/reset-password'];
      const isAuthPage = authPaths.some(path => currentPath.includes(path));
      
      if (!isAuthPage) {
        console.log('🔄 Redirecting to login...');
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }

    // Handle specific error types
    return Promise.reject(handleApiError(error));
  }
);

// Enhanced error handler with detailed error categorization
const handleApiError = (error) => {
  // Network errors (CORS, connection issues)
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return {
        ...error,
        message: 'Request timeout. Please check your connection and try again.',
        type: 'TIMEOUT_ERROR'
      };
    }
    
    if (error.message.includes('Network Error')) {
      return {
        ...error,
        message: 'Unable to connect to server. Please check your internet connection.',
        type: 'NETWORK_ERROR'
      };
    }
    
    return {
      ...error,
      message: 'Connection failed. Please try again.',
      type: 'CONNECTION_ERROR'
    };
  }

  // Server responded with error status
  const { data, status } = error.response;
  
  // Use server-provided error message if available
  if (data && data.message) {
    return {
      ...error,
      message: data.message,
      type: 'SERVER_ERROR',
      statusCode: status,
      serverData: data
    };
  }
  
  // Fallback error messages based on status code
  const statusMessages = {
    400: 'Invalid request. Please check your input and try again.',
    401: 'Authentication required. Please log in again.',
    403: 'Access forbidden. You do not have permission for this action.',
    404: 'Resource not found. Please check the URL and try again.',
    422: 'Validation error. Please check your input.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'Server error. Please try again later.',
    502: 'Service temporarily unavailable. Please try again later.',
    503: 'Service maintenance in progress. Please try again later.',
  };
  
  const message = statusMessages[status] || `Unexpected error (${status}). Please try again.`;
  
  return {
    ...error,
    message,
    type: 'HTTP_ERROR',
    statusCode: status
  };
};

// Health check function for monitoring
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return {
      success: true,
      data: response.data,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Health check failed:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

// API status function for debugging
export const getApiStatus = () => {
  return {
    baseURL: API_CONFIG.BASE_URL,
    environment: process.env.NODE_ENV,
    timeout: API_CONFIG.TIMEOUT,
    hasToken: !!tokenManager.getToken(),
    tokenExpired: tokenManager.isTokenExpired(),
    timestamp: new Date().toISOString()
  };
};

// Connection test function
export const testConnection = async () => {
  try {
    console.log('🔍 Testing API connection...');
    const startTime = Date.now();
    
    const response = await axios.get(`${API_CONFIG.BASE_URL}/health`, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const duration = Date.now() - startTime;
    
    console.log('✅ Connection test successful:', {
      status: response.status,
      duration: `${duration}ms`,
      url: `${API_CONFIG.BASE_URL}/health`
    });
    
    return {
      success: true,
      duration,
      status: response.status,
      message: 'Connection successful'
    };
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Connection failed'
    };
  }
};

// Utility function to make authenticated requests
export const makeAuthenticatedRequest = async (config) => {
  const token = tokenManager.getToken();
  
  if (!token || tokenManager.isTokenExpired()) {
    throw new Error('No valid authentication token available');
  }
  
  return api(config);
};

// Export the configured axios instance as default
export default api;