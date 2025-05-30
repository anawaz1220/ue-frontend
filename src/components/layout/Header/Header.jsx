import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  NavLinks,
  NavLink,
  AuthButtons,
  ProfileButton,
  MobileMenuButton,
  MobileMenu,
  MobileNavLink,
  UserMenu,
  UserMenuItem,
  LogoutButton,
  CartIcon,
  CartBadge
} from './Header.styles';
import { useAuth } from '../../../contexts/AuthContext';
import ROUTES from '../../../constants/routes';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout, isCustomer, isBusiness } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getProfileRoute = () => {
    if (isCustomer) return ROUTES.CUSTOMER_PROFILE;
    if (isBusiness) return ROUTES.BUSINESS_PROFILE;
    if (user?.role === 'ADMIN') return ROUTES.ADMIN_DASHBOARD;
    return ROUTES.HOME;
  };

  // Determine if cart should be shown (only for customers)
  const showCart = isAuthenticated && isCustomer;

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <Logo as={Link} to="/">
          <img src="/images/ue.png" alt="Urban Ease" />
          <span>Urban Ease</span>
        </Logo>

        {/* Desktop Navigation */}
        <NavLinks>
          <NavLink as={Link} to={ROUTES.HOME} active={location.pathname === ROUTES.HOME}>
            Home
          </NavLink>
          <NavLink as={Link} to={ROUTES.SERVICES} active={location.pathname.startsWith(ROUTES.SERVICES)}>
            Services
          </NavLink>
          {/* Add more nav links as needed */}
        </NavLinks>

        {/* Authentication/Profile Section */}
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {showCart && (
              <Link to="/cart" style={{ marginRight: '1rem', position: 'relative' }}>
                <CartIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <CartBadge>0</CartBadge>
                </CartIcon>
              </Link>
            )}
            
            <div style={{ position: 'relative' }}>
              <ProfileButton onClick={toggleUserMenu}>
                {user?.customer_profile?.first_name || user?.business_profile?.business_name || 'Account'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </ProfileButton>
              
              {userMenuOpen && (
                <UserMenu>
                  <UserMenuItem as={Link} to={getProfileRoute()}>
                    My Profile
                  </UserMenuItem>
                  {isCustomer && (
                    <>
                      <UserMenuItem as={Link} to={`${ROUTES.CUSTOMER_PROFILE}?tab=bookings`}>
                        My Bookings
                      </UserMenuItem>
                    </>
                  )}
                  {isBusiness && (
                    <>
                      <UserMenuItem as={Link} to={`${ROUTES.BUSINESS_PROFILE}?tab=services`}>
                        My Services
                      </UserMenuItem>
                      <UserMenuItem as={Link} to={`${ROUTES.BUSINESS_PROFILE}?tab=orders`}>
                        Orders
                      </UserMenuItem>
                    </>
                  )}
                  <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </UserMenu>
              )}
            </div>
          </div>
        ) : (
          <AuthButtons>
            <NavLink as={Link} to={ROUTES.LOGIN}>
              Login
            </NavLink>
            <NavLink as={Link} to={ROUTES.REGISTER} highlight="true">
              Register
            </NavLink>
          </AuthButtons>
        )}

        {/* Mobile Menu Toggle */}
        <MobileMenuButton onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <g>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </g>
            ) : (
              <g>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </g>
            )}
          </svg>
        </MobileMenuButton>
      </HeaderContent>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu>
          <MobileNavLink as={Link} to={ROUTES.HOME} active={location.pathname === ROUTES.HOME}>
            Home
          </MobileNavLink>
          <MobileNavLink as={Link} to={ROUTES.SERVICES} active={location.pathname.startsWith(ROUTES.SERVICES)}>
            Services
          </MobileNavLink>
          
          {isAuthenticated ? (
            <>
              <MobileNavLink as={Link} to={getProfileRoute()}>
                My Profile
              </MobileNavLink>
              
              {isCustomer && (
                <MobileNavLink as={Link} to={`${ROUTES.CUSTOMER_PROFILE}?tab=bookings`}>
                  My Bookings
                </MobileNavLink>
              )}
              
              {isBusiness && (
                <>
                  <MobileNavLink as={Link} to={`${ROUTES.BUSINESS_PROFILE}?tab=services`}>
                    My Services
                  </MobileNavLink>
                  <MobileNavLink as={Link} to={`${ROUTES.BUSINESS_PROFILE}?tab=orders`}>
                    Orders
                  </MobileNavLink>
                </>
              )}
              {user?.role === 'ADMIN' && (
                <>
                  <MobileNavLink as={Link} to={`${ROUTES.ADMIN_DASHBOARD}`}>
                    Dashboard
                  </MobileNavLink>
                  <MobileNavLink as={Link} to={`${ROUTES.ADMIN_USERS}`}>
                    Manage Users
                  </MobileNavLink>
                </>
              )}
              
              <MobileNavLink as="button" onClick={handleLogout}>
                Logout
              </MobileNavLink>
            </>
          ) : (
            <>
              <MobileNavLink as={Link} to={ROUTES.LOGIN}>
                Login
              </MobileNavLink>
              <MobileNavLink as={Link} to={ROUTES.REGISTER}>
                Register
              </MobileNavLink>
            </>
          )}
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;