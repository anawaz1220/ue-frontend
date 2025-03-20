import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CustomerRegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const LogoContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 120px;
  height: auto;
`;

export const FormTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  margin-bottom: 2rem;
`;

export const FormSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #eee;
`;

export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0;
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme, disabled }) => 
    disabled ? '#e0e0e0' : theme.colors.primary};
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease-in-out;
  margin-top: 1.5rem;

  &:hover {
    background-color: ${({ theme, disabled }) => 
      disabled ? '#e0e0e0' : '#5e5eff'};
  }
`;

export const LoginPrompt = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const LoginLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;