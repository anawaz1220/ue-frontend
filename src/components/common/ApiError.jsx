import React from 'react';
import styled from 'styled-components';
import Typography from './Typography';
import Button from './Button';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.large};
  text-align: center;
  min-height: 300px;
  max-width: 600px;
  margin: 0 auto;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ErrorDetails = styled.div`
  background-color: rgba(244, 67, 54, 0.05);
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin: ${({ theme }) => theme.spacing.medium} 0;
  text-align: left;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.9rem;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const ApiError = ({ 
  title = 'Oops! Something went wrong', 
  message = 'We encountered a problem while connecting to our servers. Please try again later.',
  error,
  onRetry,
  onBack
}) => {
  // Format error details if available
  const errorDetails = error && (
    typeof error === 'string' 
      ? error 
      : (error.message || JSON.stringify(error, null, 2))
  );

  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        {title}
      </Typography>
      
      <Typography variant="body1">
        {message}
      </Typography>
      
      {errorDetails && (
        <ErrorDetails>
          {errorDetails}
        </ErrorDetails>
      )}
      
      <ButtonGroup>
        {onBack && (
          <Button variant="outlined" onClick={onBack}>
            Go Back
          </Button>
        )}
        
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </ButtonGroup>
    </ErrorContainer>
  );
};

export default ApiError;