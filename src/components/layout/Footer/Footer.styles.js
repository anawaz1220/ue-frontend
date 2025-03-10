import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.grey};
  padding: 1rem 0;
  width: 100%;
  border-top: 1px solid #eee;
`;

export const FooterNav = styled.nav`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FooterLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  color: ${({ theme }) => theme.colors.grey};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.75rem 1rem;
  }
`;