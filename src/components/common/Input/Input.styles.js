import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.grey};
`;

export const StyledInput = styled.input`
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.error : theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  width: 100%;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.error : theme.colors.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.lightGrey};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightBackground};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const IconButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const PasswordVisibilityIcon = styled.span`
  &:before {
    content: ${({ showPassword }) => (showPassword ? '"🔓"' : '"🔒"')};
  }
`;

export default { InputContainer, StyledInput, Label, ErrorMessage, IconButton, PasswordVisibilityIcon };