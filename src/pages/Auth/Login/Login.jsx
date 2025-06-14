import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Typography, Button, Input } from '../../../components/common';
import { useAuth } from '../../../contexts/AuthContext';
import ROUTES from '../../../constants/routes';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.lightBackground};
`;

const LoginCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Logo = styled.img`
  height: 60px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Form = styled.form`
  width: 100%;
`;

const FormTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ErrorMessage = styled.div`
  background-color: rgba(244, 67, 54, 0.1);
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.error};
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const SecondaryActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.small};
  }
`;

const LinkButton = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

const DebugInfo = styled.div`
  background-color: #f0f0f0;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #666;
  max-height: 100px;
  overflow-y: auto;
  
  ${({ show }) => !show && 'display: none;'}
`;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setDebugInfo('');
    
    try {
      console.log('🔑 Login form data:', data);
      setDebugInfo(`Attempting login with: ${data.email}`);
      
      const result = await login(data.email, data.password);
      console.log('🔍 Login result:', result);
      
      // Check for successful login
      if (result && result.success && result.data && result.data.user) {
        const { user } = result.data;
        console.log('👤 User role:', user.role);
        
        // Get the intended destination from location state
        const from = location.state?.from?.pathname || '/';
        
        let redirectPath = from;
        if (from === '/') {
          // Only use role-based redirect if coming from root
          if (user.role === 'ADMIN') {
            redirectPath = ROUTES.ADMIN_DASHBOARD;
          } else if (user.role === 'BUSINESS') {
            redirectPath = ROUTES.BUSINESS_PROFILE;
          } else if (user.role === 'CUSTOMER') {
            redirectPath = ROUTES.CUSTOMER_PROFILE;
          }
        }
        
        console.log('🔄 Redirecting to:', redirectPath);
        navigate(redirectPath, { replace: true });
      } else {
        setError('Login failed. Please check your credentials and try again.');
        setDebugInfo(`Response: ${JSON.stringify(result, null, 2)}`);
      }
    } catch (error) {
      console.error('Login form error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
      setDebugInfo(`Error: ${error.message || error.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <Logo src="/images/ue.png" alt="Urban Ease" />
        </LogoContainer>
        
        <FormTitle>
          <Typography variant="h2">Welcome Back</Typography>
          <Typography variant="body1" style={{ marginTop: '8px', color: '#666' }}>
            Sign in to your account
          </Typography>
        </FormTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
            />
          </FormGroup>
          
          <FormGroup>
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
          </FormGroup>
          
          <ActionButtons>
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </ActionButtons>
        </Form>
        
        <SecondaryActions>
          <LinkButton to={ROUTES.REQUEST_PASSWORD_RESET}>
            Forgot Password?
          </LinkButton>
          <LinkButton to={ROUTES.REGISTER}>
            Create Account
          </LinkButton>
        </SecondaryActions>
        
        {/* Debug info for development */}
        <DebugInfo show={!!debugInfo && process.env.NODE_ENV === 'development'}>
          <strong>Debug Info:</strong><br />
          <pre>{debugInfo}</pre>
        </DebugInfo>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;