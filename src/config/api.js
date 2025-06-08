// src/config/api.js - Simplified for single environment
export const API_CONFIG = {
  // Always use Railway production URL
  BASE_URL: 'https://ue-backend-production.up.railway.app',
  
  TIMEOUT: 30000,
  
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER_CUSTOMER: '/api/auth/register/customer',
    REGISTER_BUSINESS: '/api/auth/register/business',
    VERIFY_EMAIL: '/api/auth/verify-email/:token',
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
    ADMIN_SERVICE_TYPES: '/api/admin/service-types',
    
    // Health check
    HEALTH: '/health'
  }
};

console.log('🔧 API Configuration loaded:', {
  baseURL: API_CONFIG.BASE_URL,
  environment: process.env.REACT_APP_ENVIRONMENT || 'development'
});

export default API_CONFIG;