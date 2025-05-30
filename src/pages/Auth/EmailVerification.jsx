import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Button } from '../../components/common';
import ROUTES from '../../constants/routes';
import authService from '../../services/authService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: ${({ theme }) => theme.spacing.large};
  text-align: center;
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

const StatusIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ success, theme }) => 
    success ? theme.colors.success : theme.colors.error};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const EmailVerification = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState({
    loading: true,
    success: false,
    message: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setVerificationStatus({
            loading: false,
            success: false,
            message: 'Verification token is missing. Please check your email link.',
          });
          return;
        }

        const response = await authService.verifyEmail(token);
        
        setVerificationStatus({
          loading: false,
          success: true,
          message: response.message || 'Email verified successfully. You can now login.',
        });
      } catch (error) {
        setVerificationStatus({
          loading: false,
          success: false,
          message: error.message || 'Email verification failed. Please try again.',
        });
      }
    };

    verifyEmail();
  }, [token]);

  const handleResendVerification = async () => {
    try {
      const email = prompt('Please enter your email address:');
      if (!email) return;

      await authService.resendVerification(email);
      alert('If your email is registered and not verified, a new verification email has been sent.');
    } catch (error) {
      alert(error.message || 'Failed to resend verification email. Please try again.');
    }
  };

  if (verificationStatus.loading) {
    return (
      <Container>
        <Card>
          <Typography variant="h2">Verifying Your Email</Typography>
          <Typography variant="body1">Please wait while we verify your email address...</Typography>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <StatusIcon success={verificationStatus.success}>
          {verificationStatus.success ? '✓' : '✕'}
        </StatusIcon>
        
        <Typography variant="h2">
          {verificationStatus.success ? 'Email Verified!' : 'Verification Failed'}
        </Typography>
        
        <Typography variant="body1" style={{ marginTop: '1rem' }}>
          {verificationStatus.message}
        </Typography>
        
        <ActionButtons>
          {verificationStatus.success ? (
            <Button 
              variant="primary" 
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Proceed to Login
            </Button>
          ) : (
            <>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={handleResendVerification}
              >
                Resend Verification Email
              </Button>
              <Button 
                variant="outlined"
                as={Link} 
                to={ROUTES.HOME}
              >
                Return to Home
              </Button>
            </>
          )}
        </ActionButtons>
      </Card>
    </Container>
  );
};

export default EmailVerification;