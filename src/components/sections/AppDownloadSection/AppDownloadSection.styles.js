import styled from 'styled-components';

export const AppDownloadContainer = styled.section`
  padding: 4rem 2rem;
  background-color: #f5f5f5;
`;

export const AppDownloadWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const AppInfoContainer = styled.div`
  flex: 1;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
`;

export const AppTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const AppSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 2rem;
`;

export const PhoneInputContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const CountryCodeSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  background-color: #f8f8f8;
`;

export const PhoneInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0;
`;

export const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0 4px 4px 0;
  font-weight: bold;

  &:hover {
    background-color: #333;
  }
`;

export const StoreButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StoreButton = styled.a`
  display: block;
  max-width: 150px;

  img {
    width: 100%;
    height: auto;
  }
`;

export const AppScreenshotContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const AppScreenshot = styled.div`
  position: relative;
  width: 220px;
  height: 440px;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 -20px;

  &:first-child {
    transform: translateY(20px) rotate(-5deg);
  }

  &:last-child {
    transform: translateY(20px) rotate(5deg);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;