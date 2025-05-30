import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
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
} from './Login.styles';
import { Button, Input, Checkbox, Typography } from '../../../components/common';
import ROUTES from '../../../constants/routes';
import { useAuth } from '../../../contexts/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
  setLoading(true);
  setLoginError('');
  
  try {
    console.log('Submitting login with:', { email: data.email });
    const loginResult = await login(data.email, data.password);
    console.log('Login successful, result:', loginResult);
    
    // Determine redirect path based on user role
    let redirectPath = '/';
    
    if (loginResult.user && loginResult.user.role) {
      console.log('User role detected:', loginResult.user.role);
      if (loginResult.user.role === 'CUSTOMER') {
        redirectPath = ROUTES.CUSTOMER_PROFILE;
      } else if (loginResult.user.role === 'BUSINESS') {
        redirectPath = ROUTES.BUSINESS_PROFILE;
      } else if (loginResult.user.role === 'ADMIN') {
        redirectPath = ROUTES.ADMIN_DASHBOARD;
      }
    }
    
    console.log('Redirecting to:', redirectPath);
    navigate(redirectPath, { replace: true });
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.message === 'Email not verified. Please verify your email to login.') {
      setLoginError('Your email is not verified. Please check your inbox for verification email.');
    } else {
      setLoginError(error.message || 'Login failed. Please check your credentials and try again.');
    }
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = () => {
    // This will be implemented when social authentication is available
    alert('Google login is not available yet.');
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>
          <Typography variant="h2" component="h1">
            Sign In
          </Typography>
        </FormTitle>

        {loginError && (
          <div style={{ 
            color: 'red', 
            textAlign: 'center', 
            marginBottom: '16px',
            backgroundColor: 'rgba(255, 0, 0, 0.05)',
            padding: '8px',
            borderRadius: '4px'
          }}>
            {loginError}
          </div>
        )}

        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          placeholder="johnsmith@example.com"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">Password</Typography>
          <ForgotPasswordLink as={Link} to={ROUTES.REQUEST_PASSWORD_RESET}>
            Reset Password?
          </ForgotPasswordLink>
        </div>

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register('password', { 
            required: 'Password is required',
          })}
        />

        <Checkbox
          id="rememberMe"
          name="rememberMe"
          label="Stay Signed In - Do not use stayed signed in on shared devices"
          {...register('rememberMe')}
        />

        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </Button>

        <Divider>or</Divider>

        <SocialLoginContainer>
          <SocialLoginButton 
            variant="social"
            type="button"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Sign in with Google
          </SocialLoginButton>
        </SocialLoginContainer>

        <RegisterPrompt>
          Don't have an account?{' '}
          <RegisterLink as={Link} to={ROUTES.REGISTER}>
            Register
          </RegisterLink>
        </RegisterPrompt>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;