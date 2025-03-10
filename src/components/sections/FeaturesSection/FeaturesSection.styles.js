import styled from 'styled-components';

export const FeaturesContainer = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const FeaturesWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const FeaturesList = styled.div`
  flex: 2;
  margin-right: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  margin-bottom: 2rem;
  align-items: flex-start;
`;

export const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const FeatureContent = styled.div`
  flex: 1;
`;

export const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.grey};
`;

export const QualityAssurance = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.accent};
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const QualityIcon = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const QualityTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const QualityDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.grey};
`;