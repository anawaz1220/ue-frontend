import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RoleSelectionContainer,
  LogoContainer,
  Logo,
  Title,
  OptionsContainer,
  RoleOption,
  RoleIcon,
  RoleTitle,
  RoleDescription,
  ActionButton,
  LoginPrompt,
  LoginLink
} from './RoleSelection.styles';
import ROUTES from '../../../constants/routes';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === 'business') {
      navigate(ROUTES.REGISTER_BUSINESS);
    } else if (selectedRole === 'customer') {
      navigate(ROUTES.REGISTER_CUSTOMER);
    }
  };

  return (
    <RoleSelectionContainer>
      <LogoContainer>
        <Logo src="/assets/images/logo.svg" alt="Urban Ease Logo" />
      </LogoContainer>
      
      <Title>Are you?</Title>
      
      <OptionsContainer>
        <RoleOption 
          selected={selectedRole === 'business'} 
          onClick={() => handleRoleSelect('business')}
        >
          <RoleIcon>👔</RoleIcon>
          <RoleTitle>Business Owner</RoleTitle>
          <RoleDescription>Create a new business account to manage your team</RoleDescription>
        </RoleOption>
        
        <RoleOption 
          selected={selectedRole === 'customer'} 
          onClick={() => handleRoleSelect('customer')}
        >
          <RoleIcon>👤</RoleIcon>
          <RoleTitle>Customer</RoleTitle>
          <RoleDescription>Join to receive services instantly</RoleDescription>
        </RoleOption>
      </OptionsContainer>
      
      <ActionButton 
        disabled={!selectedRole} 
        onClick={handleContinue}
      >
        Get started
      </ActionButton>
      
      <LoginPrompt>
        Already have account? 
        <LoginLink to={ROUTES.LOGIN}>Sign in</LoginLink>
      </LoginPrompt>
    </RoleSelectionContainer>
  );
};

export default RoleSelection;