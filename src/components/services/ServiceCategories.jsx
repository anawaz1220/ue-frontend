import React from 'react';
import styled from 'styled-components';
import Typography from '../common/Typography';

const ServiceCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  overflow: hidden;
  padding: ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.white};
`;

const CategoryTitle = styled.div`
  margin-bottom: ${props => props.theme.spacing.medium};
  padding-bottom: ${props => props.theme.spacing.small};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.medium};
  max-height: 75vh;
  overflow-y: auto;
  padding-right: ${props => props.theme.spacing.small};
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightBackground};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.lightGrey};
    border-radius: 4px;
  }
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
  
  ${props => props.isActive && `
    background-color: ${props.theme.colors.accent};
    border: 1px solid ${props.theme.colors.primary};
  `}
`;

const CategoryImage = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategoryLabel = styled(Typography)`
  font-size: ${props => props.theme.fontSizes.small};
  margin-top: ${props => props.theme.spacing.xs};
  line-height: 1.2;
`;

const ServiceCategories = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <ServiceCategoriesContainer>
      <CategoryTitle>
        <Typography variant="h3">Select a service</Typography>
      </CategoryTitle>
      
      <CategoryGrid>
        {categories.map(category => (
          <CategoryItem 
            key={category.id}
            isActive={activeCategory === category.id}
            onClick={() => onCategorySelect(category.id)}
          >
            <CategoryImage>
              <img src={category.image} alt={category.alt} />
            </CategoryImage>
            <CategoryLabel>{category.name}</CategoryLabel>
          </CategoryItem>
        ))}
      </CategoryGrid>
    </ServiceCategoriesContainer>
  );
};

export default ServiceCategories;