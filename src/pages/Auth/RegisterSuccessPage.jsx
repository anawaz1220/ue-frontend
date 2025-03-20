import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ROUTES from '../../constants/routes';

const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.grey};
`;

const ActionButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #5e5eff;
  }
`;

const RegisterSuccessPage = () => {
  return (
    <SuccessContainer>
      <Logo src="/assets/images/logo.svg" alt="Urban Ease Logo" />
      <Title>Registration Successful!</Title>
      <Message>
        Your account has been created successfully. You can now log in to access your account.
      </Message>
      <ActionButton to={ROUTES.LOGIN}>Log In to Your Account</ActionButton>
    </SuccessContainer>
  );
};

export default RegisterSuccessPage;