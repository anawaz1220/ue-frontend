import styled from 'styled-components';

export const ServiceSelectionContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const ServiceSelectionTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.grey};

  .required {
    color: ${({ theme }) => theme.colors.error || 'red'};
    margin-left: 0.25rem;
  }
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;

export const ServiceItem = styled.div`
  border: 2px solid ${({ selected }) => selected ? '#F5A623' : '#e0e0e0'};
  border-radius: 8px;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${({ selected }) => selected ? 'rgba(245, 166, 35, 0.1)' : 'white'};
  position: relative;
  
  &:hover {
    border-color: #F5A623;
    background-color: ${({ selected }) => selected ? 'rgba(245, 166, 35, 0.1)' : 'rgba(245, 166, 35, 0.05)'};
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 8px;
    right: 8px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid ${({ selected }) => selected ? '#F5A623' : '#e0e0e0'};
    background-color: ${({ selected }) => selected ? '#F5A623' : 'white'};
    transition: all 0.2s ease-in-out;
  }
  
  &::after {
    content: "✓";
    position: absolute;
    top: 8px;
    right: 8px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    opacity: ${({ selected }) => selected ? 1 : 0};
    transition: all 0.2s ease-in-out;
  }
`;

export const ServiceIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ selected }) => selected ? '#F5A623' : '#666'};
  transition: color 0.2s ease-in-out;
  
  svg {
    width: 36px;
    height: 36px;
  }
`;

export const ServiceName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.grey};
`;

export const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.error || 'red'};
`;