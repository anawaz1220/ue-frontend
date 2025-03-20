import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RoleSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

export const LogoContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 120px;
  height: auto;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const RoleOption = styled.div`
  border: 1px solid rgb(164, 157, 81);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  transition: all 0.2s ease-in-out;
  background-color: ${({ selected }) => 
    selected ? '#f0f7ff' : 'white'};
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${({ selected, theme }) => 
      selected ? theme.colors.primary : '#e0e0e0'};
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${({ selected, theme }) => 
      selected ? theme.colors.primary : 'white'};
    transition: all 0.2s ease-in-out;
  }

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    opacity: ${({ selected }) => (selected ? 1 : 0)};
    transition: all 0.2s ease-in-out;
  }
`;

export const RoleIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  margin-left: 30px;
`;

export const RoleTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-left: 30px;
`;

export const RoleDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey};
  margin-left: 30px;
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme, disabled }) => 
    disabled ? '#e0e0e0' : theme.colors.primary};
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease-in-out;
  margin-bottom: 1.5rem;

  &:hover {
    background-color: ${({ theme, disabled }) => 
      disabled ? '#e0e0e0' : '#5e5eff'};
  }
`;

export const LoginPrompt = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  gap: 0.5rem;
`;

export const LoginLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;