import styled from 'styled-components';

export const CustomerRegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Logo = styled.img`
  height: 40px;
  margin-right: 1rem;
`;

export const FormTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

export const Form = styled.form`
  width: 100%;
`;

export const FormContainer = styled.div`
  width: 100%;
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const FormSubtitle = styled.p`
  color: ${props => props.theme.colors.grey};
  margin-bottom: 1rem;
`;

export const FormContent = styled.form`
  width: 100%;
`;

export const FormSection = styled.div`
  margin-bottom: 2rem;
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  flex: 1;
  min-width: 250px;
  padding: 0 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const FormInputWrapper = styled.div`
  position: relative;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const FormError = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

export const FormDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.lightGrey};
  margin: 2rem 0;
`;

export const FormActions = styled.div`
  margin-top: 2rem;
`;

export const FormButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const FormButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' && `
    background-color: ${props.theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props.theme.colors.primary};
      opacity: 0.9;
    }
  `}
  
  ${props => props.variant === 'outline' && `
    background-color: transparent;
    color: ${props.theme.colors.primary};
    border: 1px solid ${props.theme.colors.primary};
    
    &:hover {
      background-color: ${props.theme.colors.accent};
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LoginPrompt = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.grey};
`;

export const LoginLink = styled.a`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
  padding: 0;
  margin: 0;
  
  &:hover {
    opacity: 0.8;
  }
`;

export default {
  CustomerRegistrationContainer,
  LogoContainer,
  Logo,
  FormTitle,
  SectionTitle,
  Form,
  FormContainer,
  FormHeader,
  FormSubtitle,
  FormContent,
  FormSection,
  FormRow,
  FormGroup,
  FormLabel,
  FormInputWrapper,
  FormInput,
  FormError,
  FormDivider,
  FormActions,
  FormButtonGroup,
  FormButton,
  LoginPrompt,
  LoginLink,
  ActionButton
};