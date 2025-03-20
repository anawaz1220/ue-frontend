import styled, { css } from 'styled-components';

const buttonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.orange}e0;
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary}e0;
    }
  `,
  outlined: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary}10;
    }
  `,
  text: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    padding: 8px 16px;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary}10;
    }
  `,
  social: css`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grey};
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.lightBackground};
    }
  `,
};

export const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.2s;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  ${({ variant }) => buttonVariants[variant]};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default { StyledButton };