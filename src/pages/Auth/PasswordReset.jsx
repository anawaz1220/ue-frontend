import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const PasswordRequirements = styled.ul`
  margin: ${({ theme }) => theme.spacing.medium} 0;
  padding-left: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.grey};
`;

const PasswordReset = () => {
  const { token } = useParams();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!token) {
      setErrorMessage('Reset token is missing. Please check your email link.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    
    try {
      await authService.resetPassword(token, data.password);
      setSuccess(true);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container>
        <Card>
          <FormTitle>
            <Typography variant="h2">Password Reset Successful!</Typography>
          </FormTitle>
          
          <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Your password has been successfully reset. You can now log in with your new password.
          </Typography>
          
          <ButtonGroup>
            <Button 
              variant="primary"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Proceed to Login
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
          <Typography variant="h2">Create New Password</Typography>
        </FormTitle>
        
        <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Please create a new password for your account.
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
            label="New Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your new password"
            error={errors.password?.message}
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must meet all requirements'
              }
            })}
          />
          
          <PasswordRequirements>
            <li>At least 8 characters long</li>
            <li>Contains at least one uppercase letter</li>
            <li>Contains at least one lowercase letter</li>
            <li>Contains at least one number</li>
            <li>Contains at least one special character</li>
          </PasswordRequirements>
          
          <Input
            label="Confirm New Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === watch('password') || 'Passwords do not match'
            })}
          />
          
          <ButtonGroup>
            <Button 
              type="submit" 
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </ButtonGroup>
        </Form>
      </Card>
    </Container>
  );
};

export default PasswordReset;