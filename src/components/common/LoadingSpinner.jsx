import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.fullPage ? '60vh' : 'inherit'};
  padding: ${props => props.theme.spacing.medium};
`;

const Spinner = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${props => props.theme.colors.primary};
  animation: ${spin} 0.8s linear infinite;
  margin-bottom: ${props => props.label ? props.theme.spacing.medium : 0};
`;

const Label = styled.div`
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.medium};
  margin-top: ${props => props.theme.spacing.small};
`;

const LoadingSpinner = ({ 
  size, 
  label, 
  fullPage = false
}) => {
  return (
    <SpinnerContainer fullPage={fullPage}>
      <Spinner size={size} label={!!label} />
      {label && <Label>{label}</Label>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;