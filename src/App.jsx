// src/App.jsx - ADD ADMIN IMPORT AND ROUTE
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { Header, Footer } from './components/layout';
import { Home } from './pages';
import BusinessProfile from './pages/BusinessProfile';
import { CustomerProfile } from './pages/Customer';

import { 
  RoleSelectionPage, 
  BusinessRegisterPage, 
  CustomerRegisterPage,
  RegisterSuccessPage 
} from './pages/Auth';
import Login from './pages/Auth/Login';
import ServicesPage, { ServiceDetailPage } from './pages/Services';
import ROUTES from './constants/routes';

// Import our authentication provider and protected routes
import { AuthProvider } from './contexts/AuthContext';
import { 
  ProtectedRoute, 
  RoleProtectedRoute, 
  UnauthenticatedRoute 
} from './components/auth/ProtectedRoute';

// Import additional components for auth flows
import EmailVerification from './pages/Auth/EmailVerification';
import PasswordReset from './pages/Auth/PasswordReset';
import RequestPasswordReset from './pages/Auth/RequestPasswordReset';

// Import Error Boundary for production stability
import ErrorBoundary from './components/common/ErrorBoundary';

// Import Admin Dashboard - ADD THIS
import AdminDashboard from './pages/Admin/AdminDashboard';



function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <Router>
            <Header />
            <main>
              <ErrorBoundary>
                <Routes>
                  {/* Public routes */}
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
                  <Route path={`${ROUTES.SERVICES}/:serviceId`} element={<ServiceDetailPage />} />
                  
                  {/* Routes that should only be accessible when not logged in */}
                  <Route element={<UnauthenticatedRoute />}>
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.REGISTER} element={<RoleSelectionPage />} />
                    <Route path={ROUTES.REGISTER_ROLE} element={<RoleSelectionPage />} />
                    <Route path={ROUTES.REGISTER_BUSINESS} element={<BusinessRegisterPage />} />
                    <Route path={ROUTES.REGISTER_CUSTOMER} element={<CustomerRegisterPage />} />
                    <Route path={ROUTES.REGISTER_SUCCESS} element={<RegisterSuccessPage />} />
                  </Route>
                  
                  {/* Auth-related but non-protected routes */}
                  <Route path={ROUTES.VERIFY_EMAIL} element={<EmailVerification />} />
                  <Route path={ROUTES.REQUEST_PASSWORD_RESET} element={<RequestPasswordReset />} />
                  <Route path={ROUTES.RESET_PASSWORD} element={<PasswordReset />} />
                  
                  {/* Protected routes - requires authentication */}
                  <Route element={<ProtectedRoute />}>
                    {/* Routes protected by role */}
                    <Route element={<RoleProtectedRoute allowedRoles={['BUSINESS']} />}>
                      <Route path={ROUTES.BUSINESS_PROFILE} element={<BusinessProfile />} />
                    </Route>
                    
                    <Route element={<RoleProtectedRoute allowedRoles={['CUSTOMER']} />}>
                      <Route path={ROUTES.CUSTOMER_PROFILE} element={<CustomerProfile />} />
                    </Route>
                    
                    {/* Admin routes - ADD THIS SECTION */}
                    <Route element={<RoleProtectedRoute allowedRoles={['ADMIN']} />}>
                      <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
                    </Route>
                  </Route>
                  
                  {/* Fallback route - 404 */}
                  <Route path="*" element={
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '4rem 2rem',
                      minHeight: '60vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
                      <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
                      <p style={{ marginBottom: '2rem', color: '#666' }}>
                        The page you're looking for doesn't exist.
                      </p>
                      <a href="/" style={{ 
                        color: '#007bff', 
                        textDecoration: 'none',
                        padding: '0.75rem 1.5rem',
                        border: '1px solid #007bff',
                        borderRadius: '4px'
                      }}>
                        Go Home
                      </a>
                    </div>
                  } />
                </Routes>
              </ErrorBoundary>
            </main>
            <Footer />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;