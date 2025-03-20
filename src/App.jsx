import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import { Header, Footer } from './components/layout';
import { Home } from './pages';
import { 
  RoleSelectionPage, 
  BusinessRegisterPage, 
  CustomerRegisterPage,
  RegisterSuccessPage 
} from './pages/Auth';
import Login from './pages/Auth/Login';
import ServicesPage, { ServiceDetailPage } from './pages/Services';
import ROUTES from './constants/routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<RoleSelectionPage />} />
            <Route path={ROUTES.REGISTER_ROLE} element={<RoleSelectionPage />} />
            <Route path={ROUTES.REGISTER_BUSINESS} element={<BusinessRegisterPage />} />
            <Route path={ROUTES.REGISTER_CUSTOMER} element={<CustomerRegisterPage />} />
            <Route path={ROUTES.REGISTER_SUCCESS} element={<RegisterSuccessPage />} />
            
            {/* Service related routes */}
            <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
            <Route path={`${ROUTES.SERVICES}/:serviceId`} element={<ServiceDetailPage />} />
            
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;