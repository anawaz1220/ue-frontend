// src/services/apiService.js - UPDATED VERSION
import axios from 'axios';
import authService from './authService';
import { API_CONFIG } from '../config/api';

// Create an axios instance with production URL
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = authService.getStoredToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Authorized API Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to refresh token if needed
api.interceptors.response.use(
  (response) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Authorized API Response:', response.status, response.config.url);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and it isn't already a retry request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        console.log('🔄 Attempting token refresh...');
        const refreshResult = await authService.refreshToken();
        
        // If refresh successful, retry the original request
        if (refreshResult && refreshResult.accessToken) {
          // Update the header with new token
          originalRequest.headers['Authorization'] = `Bearer ${refreshResult.accessToken}`;
          console.log('✅ Token refreshed, retrying request...');
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        console.error('❌ Token refresh failed:', refreshError);
        authService.clearTokens();
        
        // Only redirect if we're not already on login/register pages
        const currentPath = window.location.pathname;
        const authPaths = ['/login', '/register', '/verify-email', '/reset-password'];
        const isAuthPage = authPaths.some(path => currentPath.includes(path));
        
        if (!isAuthPage) {
          console.log('🔄 Redirecting to login...');
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // For other errors, pass them on with enhanced handling
    return Promise.reject(handleApiError(error));
  }
);

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
      method: error.config?.method?.toUpperCase()
    });
    
    // If the error has a message in the expected format, use it
    if (data && data.message) {
      const errorObj = new Error(data.message);
      errorObj.statusCode = status;
      return errorObj;
    }
    
    // Fallback error messages based on status code
    let message;
    switch (status) {
      case 400:
        message = 'Bad request. Please check your input and try again.';
        break;
      case 401:
        message = 'Authentication required. Please log in again.';
        break;
      case 403:
        message = 'Access forbidden. You do not have permission for this action.';
        break;
      case 404:
        message = 'Resource not found. Please try again.';
        break;
      case 422:
        message = 'Validation error. Please check your input.';
        break;
      case 429:
        message = 'Too many requests. Please wait a moment and try again.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      case 502:
        message = 'Service temporarily unavailable. Please try again later.';
        break;
      case 503:
        message = 'Service maintenance in progress. Please try again later.';
        break;
      default:
        message = `Unexpected error (${status}). Please try again.`;
    }
    
    const errorObj = new Error(message);
    errorObj.statusCode = status;
    return errorObj;
  } else if (error.request) {
    // The request was made but no response was received
    console.error('🔍 Network Error:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      baseURL: error.config?.baseURL
    });
    return new Error('Network error. Please check your internet connection and try again.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('🔍 Request Setup Error:', error.message);
    return new Error('Request failed to send. Please try again.');
  }
};

// Health check function for monitoring
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('❌ Health check failed:', error);
    throw error;
  }
};

// API status function
export const getApiStatus = () => {
  return {
    baseURL: API_CONFIG.BASE_URL,
    environment: process.env.NODE_ENV,
    timeout: API_CONFIG.TIMEOUT,
    timestamp: new Date().toISOString()
  };
};

export default api;