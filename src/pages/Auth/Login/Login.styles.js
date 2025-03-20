import styled from 'styled-components';
import { Button } from '../../../components/common';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px); /* Subtract header height */
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.lightBackground};
`;

export const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 100%;
  max-width: 450px;
`;

export const FormTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

export const ForgotPasswordLink = styled.a`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${({ theme }) => theme.spacing.large} 0;
  color: ${({ theme }) => theme.colors.grey};
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  }
  
  &::before {
    margin-right: ${({ theme }) => theme.spacing.medium};
  }
  
  &::after {
    margin-left: ${({ theme }) => theme.spacing.medium};
  }
`;

export const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const SocialLoginButton = styled(Button)`
  padding: 10px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const RegisterPrompt = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.grey};
`;

export const RegisterLink = styled.a`
  color: ${({ theme }) => theme.colors.orange};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const GoogleIcon = styled.span`
  &:before {
    content: "G";
    background-color: #4285F4;
    color: white;
    padding: 2px 6px;
    border-radius: 2px;
    font-weight: bold;
  }
`;


export default {
  LoginContainer,
  LoginForm,
  FormTitle,
  ForgotPasswordLink,
  Divider,
  SocialLoginContainer,
  SocialLoginButton,
  RegisterPrompt,
  RegisterLink,
  GoogleIcon
};