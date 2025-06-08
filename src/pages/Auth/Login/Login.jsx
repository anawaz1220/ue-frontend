// components/LoginForm.js
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
  try {
    setSubmitError('');
    clearErrors();
    
    const { email, password } = data;
    console.log('🔑 Login form data:', { email, password });
    
    const result = await login(email, password);
    console.log('🔍 Login result:', result);
    
    // Fix: Check result.success instead of result.success !== false
    if (result && result.success) {
      // Get user role for redirect
      const userRole = result.data?.user?.role;
      console.log('👤 User role:', userRole);
      
      // Redirect based on user role
      let redirectPath = '/';
      if (userRole === 'ADMIN') {
        redirectPath = '/admin/dashboard';
      } else if (userRole === 'BUSINESS') {
        redirectPath = '/business/profile';
      } else if (userRole === 'CUSTOMER') {
        redirectPath = '/customer/profile';
      }
      
      console.log('🔄 Redirecting to:', redirectPath);
      navigate(redirectPath);
    } else {
      setSubmitError('Login failed. Please try again.');
    }
  } catch (error) {
    console.error('Login form error:', error);
    setSubmitError(error.message || 'An unexpected error occurred. Please try again.');
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className={errors.email ? 'error' : ''}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="error-message" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          className={errors.password ? 'error' : ''}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <span className="error-message" role="alert">
            {errors.password.message}
          </span>
        )}
      </div>

      {submitError && (
        <div className="server-error" role="alert">
          {submitError}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;