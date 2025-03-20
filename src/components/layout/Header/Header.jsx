import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/routes';
import {
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  MobileMenuButton,
  MobileMenu,
  MobileNavItem
} from './Header.styles';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <Logo as={Link} to={ROUTES.HOME} aria-label="Urban Ease Home">
        <img src="/assets/images/logo.svg" alt="Glam Ease Logo" height="70" />
      </Logo>
      
      <Nav role="navigation">
        <NavItem as={Link} to={ROUTES.REGISTER_ROLE}>
          Register As A Professional
        </NavItem>
        
        <NavItem as={Link} to={ROUTES.HELP}>
          Help
        </NavItem>
        
        <NavItem as={Link} to={ROUTES.LOGIN} role="button" aria-label="Login or Sign Up">
          Login / Sign Up
        </NavItem>
      </Nav>

      <MobileMenuButton 
        onClick={toggleMobileMenu} 
        aria-label="Toggle mobile menu"
      >
        ☰
      </MobileMenuButton>

      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavItem as={Link} to={ROUTES.REGISTER_ROLE}>
          Register As A Professional
        </MobileNavItem>
        <MobileNavItem as={Link} to={ROUTES.HELP}>
          Help
        </MobileNavItem>
        <MobileNavItem as={Link} to={ROUTES.LOGIN}>
          Login / Sign Up
        </MobileNavItem>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;