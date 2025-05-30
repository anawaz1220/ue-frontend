import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Typography, Button, Input } from '../../components/common';
import ROUTES from '../../constants/routes';
import authService from '../../services/authService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: ${({ theme }) => theme.spacing.large};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Form = styled.form`
  width: 100%;
`;

const FormTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const RequestPasswordReset = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      await authService.requestPasswordReset(data.email);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to request password reset. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Container>
        <Card>
          <FormTitle>
            <Typography variant="h2">Check Your Email</Typography>
          </FormTitle>
          
          <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            If your email is registered, you will receive instructions to reset your password.
            Please check your inbox and follow the link provided.
          </Typography>
          
          <Typography variant="body2" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            If you don't receive an email within a few minutes, check your spam folder or try again.
          </Typography>
          
          <ButtonGroup>
            <Button 
              variant="outlined" 
              as={Link} 
              to={ROUTES.LOGIN}
            >
              Back to Login
            </Button>
            
            <Button 
              variant="primary"
              onClick={() => setSubmitted(false)}
            >
              Try Again
            </Button>
          </ButtonGroup>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <FormTitle>
          <Typography variant="h2">Reset Your Password</Typography>
        </FormTitle>
        
        <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Enter the email address associated with your account, and we'll send you
          instructions to reset your password.
        </Typography>
        
        {errorMessage && (
          <Typography 
            variant="body2" 
            style={{ 
              color: 'red', 
              textAlign: 'center', 
              marginBottom: '1rem' 
            }}
          >
            {errorMessage}
          </Typography>
        )}
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            error={errors.email?.message}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          
          <ButtonGroup>
            <Button 
              variant="outlined"
              as={Link} 
              to={ROUTES.LOGIN}
              disabled={loading}
            >
              Back to Login
            </Button>
            
            <Button 
              type="submit" 
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </ButtonGroup>
        </Form>
      </Card>
    </Container>
  );
};

export default RequestPasswordReset;