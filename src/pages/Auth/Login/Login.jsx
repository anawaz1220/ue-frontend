import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // This is where you would integrate with your API
      console.log('Login data:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>
          <Typography variant="h2" component="h1">
            Sign In
          </Typography>
        </FormTitle>

        <Input
          label="Username or Email Address:"
          id="email"
          name="email"
          type="email"
          placeholder="johnsmith@abccompany.com"
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
          <Typography variant="body1">Password:</Typography>
          <ForgotPasswordLink as={Link} to={ROUTES.FORGOT_PASSWORD}>
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
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
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
          

          <SocialLoginButton variant="social">
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