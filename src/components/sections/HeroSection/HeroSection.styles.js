import styled from 'styled-components';

export const HeroContainer = styled.section`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
  background-size: cover;
  background-position: center;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 2rem;
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

export const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  z-index: 1;
`;

export const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const CitySelectionContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const CityDropdown = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 1rem;
  width: 100%;
  text-align: left;
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f8f8f8;
  }
`;

export const DropdownIcon = styled.span`
  margin-left: 10px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  outline: none;
`;