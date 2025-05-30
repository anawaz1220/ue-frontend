// src/config/api.js - UPDATED SMART VERSION
const getEnvironment = () => {
  // Check if we're in Vercel production
  if (process.env.VERCEL_ENV === 'production') return 'production';
  
  // Check if we're in Vercel preview
  if (process.env.VERCEL_ENV === 'preview') return 'preview';
  
  // Check React app environment
  if (process.env.REACT_APP_ENV) return process.env.REACT_APP_ENV;
  
  // Check Node environment
  if (process.env.NODE_ENV === 'production') return 'production';
  
  // Default to development
  return 'development';
};

const environment = getEnvironment();

// Smart API URL detection
const getApiUrl = () => {
  // Explicit environment variable takes priority
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Environment-based defaults
  switch (environment) {
    case 'production':
      return 'https://ue-backend-production.up.railway.app';
    case 'preview':
      return 'https://ue-backend-production.up.railway.app'; // Use prod backend for previews
    case 'development':
    default:
      return 'http://localhost:3000';
  }
};

export const API_CONFIG = {
  // Environment info
  ENVIRONMENT: environment,
  IS_PRODUCTION: environment === 'production',
  IS_DEVELOPMENT: environment === 'development',
  IS_PREVIEW: environment === 'preview',
  
  // API Configuration
  BASE_URL: getApiUrl(),
  TIMEOUT: environment === 'production' ? 10000 : 15000,
  
  // Debug settings
  DEBUG: process.env.REACT_APP_DEBUG === 'true' || environment === 'development',
  
  // API endpoints
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER_CUSTOMER: '/api/auth/register/customer',
    REGISTER_BUSINESS: '/api/auth/register/business',
    VERIFY_EMAIL: '/api/auth/verify-email',
    REFRESH_TOKEN: '/api/auth/refresh-token',
    LOGOUT: '/api/auth/logout',
    REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
    RESET_PASSWORD: '/api/auth/reset-password',
    RESEND_VERIFICATION: '/api/auth/resend-verification',
    
    // User endpoints
    USER_PROFILE: '/api/users/profile',
    CUSTOMER_PROFILE: '/api/users/customer/profile',
    CUSTOMER_ADDRESSES: '/api/users/customer/addresses',
    
    // Business endpoints
    BUSINESS_PROFILE: '/api/business/profile',
    BUSINESS_PHOTOS: '/api/business/photos',
    BUSINESS_SERVICES: '/api/business/services',
    SERVICE_TYPES: '/api/business/service-types',
    
    // Admin endpoints
    ADMIN_USERS: '/api/admin/users',
    ADMIN_SERVICE_TYPES: '/api/admin/service-types'
  }
};

// Environment validation and logging
const logEnvironmentInfo = () => {
  if (API_CONFIG.DEBUG) {
    console.group('🌍 Environment Configuration');
    console.log('📍 Environment:', API_CONFIG.ENVIRONMENT);
    console.log('🔗 API Base URL:', API_CONFIG.BASE_URL);
    console.log('⏱️ Timeout:', API_CONFIG.TIMEOUT + 'ms');
    console.log('🐛 Debug Mode:', API_CONFIG.DEBUG);
    console.log('🚀 Is Production:', API_CONFIG.IS_PRODUCTION);
    
    if (process.env.VERCEL_ENV) {
      console.log('☁️ Vercel Environment:', process.env.VERCEL_ENV);
      console.log('🌐 Vercel URL:', process.env.VERCEL_URL);
    }
    
    console.groupEnd();
  }
};

// Log environment info on import
logEnvironmentInfo();

// Health check function
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      timeout: 5000
    });
    return {
      status: 'healthy',
      environment: API_CONFIG.ENVIRONMENT,
      apiUrl: API_CONFIG.BASE_URL,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Health check failed:', error);
    return {
      status: 'unhealthy',
      error: error.message,
      environment: API_CONFIG.ENVIRONMENT,
      apiUrl: API_CONFIG.BASE_URL,
      timestamp: new Date().toISOString()
    };
  }
};

export default API_CONFIG;