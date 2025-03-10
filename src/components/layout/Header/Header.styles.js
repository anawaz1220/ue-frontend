import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 60px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Logo = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.large};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const NavItem = styled.a`
  margin-left: 2rem;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: color 0.3s ease;
  color: ${({ theme }) => theme.colors.grey};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const MobileNavItem = styled.a`
  padding: 1rem 2rem;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: background-color 0.3s ease;
  color: ${({ theme }) => theme.colors.grey};

  &:hover {
    background-color: #f5f5f5;
    color: ${({ theme }) => theme.colors.primary};
  }
`;