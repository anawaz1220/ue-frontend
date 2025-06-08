import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${({ scrolled, theme }) => 
    scrolled ? theme.colors.white : 'transparent'};
  box-shadow: ${({ scrolled, theme }) => 
    scrolled ? theme.shadows.small : 'none'};
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1.5rem;
  
  img {
    height: 40px;
    margin-right: 0.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
    
    img {
      height: 30px;
    }
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: ${props => 
    props.$active 
      ? props.theme.colors.primary 
      : props.theme.colors.grey};
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: color 0.2s ease;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  ${props => props.$active && css`
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background-color: ${props.theme.colors.primary};
    }
  `}
  
  ${props => props.$highlight && css`
    background-color: ${props.theme.colors.primary};
    color: ${props.theme.colors.white};
    border-radius: ${props.theme.borderRadius.small};
    
    &:hover {
      background-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.white};
      opacity: 0.9;
    }
  `}
`;

export const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: none;
  cursor: pointer;
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all 0.2s ease;
  
  svg {
    margin-left: 0.5rem;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const MobileNavLink = styled.a`
  color: ${props => 
    props.$active 
      ? props.theme.colors.primary 
      : props.theme.colors.grey};
  text-decoration: none;
  padding: 0.75rem 1rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  transition: color 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  /* For button elements */
  background: none;
  border: none;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  z-index: 1001;
  margin-top: 0.5rem;
`;

export const UserMenuItem = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.grey};
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.lightBackground};
    color: ${props => props.theme.colors.primary};
  }
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  border-top: 1px solid ${props => props.theme.colors.lightGrey};
  color: ${props => props.theme.colors.error};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.lightBackground};
  }
`;

export const CartIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.grey};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;