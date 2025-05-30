const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_ROLE: '/register/role',
  REGISTER_BUSINESS: '/register/business',
  REGISTER_CUSTOMER: '/register/customer',
  REGISTER_SUCCESS: '/register/success',
  VERIFY_EMAIL: '/verify-email/:token',
  REQUEST_PASSWORD_RESET: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  SERVICES: '/services',
  SERVICE_DETAILS: '/services/:id',
  CUSTOMER_PROFILE: '/customer/profile',
  BUSINESS_PROFILE: '/business/profile',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_SERVICES: '/admin/services',
};

export default ROUTES;