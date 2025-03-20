import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ServiceCategories from '../../components/services/ServiceCategories';
import ServiceList from '../../components/services/ServiceList';
import Cart from '../../components/services/Cart';
import { CartProvider } from '../../contexts/CartContext';
import { serviceCategories, services, servicePromise } from '../../data/servicesData';

const ServicesPageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${props => props.theme.spacing.large};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    
    & > *:nth-child(3) {
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    
    & > *:nth-child(3) {
      grid-column: 1;
      grid-row: 3;
    }
  }
`;

const ServicesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract city from URL if available, otherwise default to "sudbury"
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get('city') || 'sudbury';
  
  // Get category from URL or default to first category
  const categoryFromUrl = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || serviceCategories[0]?.id
  );
  
  // Filter services by active category
  const filteredServices = services.filter(
    service => service.categoryId === activeCategory
  );
  
  // Get the featured service for the banner (first service in the category)
  const featuredService = filteredServices.length > 0 ? filteredServices[0] : null;
  
  // Find the active category name
  const activeCategoryName = serviceCategories.find(
    category => category.id === activeCategory
  )?.name || '';
  
  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Update URL with the new category
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('category', categoryId);
    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString()
    });
  };
  
  // Handle view details click
  const handleViewDetails = (service) => {
    navigate(`/services/${service.id}?city=${city}`);
  };
  
  // Update URL if category changes
  useEffect(() => {
    if (!categoryFromUrl && activeCategory) {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set('category', activeCategory);
      navigate({
        pathname: location.pathname,
        search: newSearchParams.toString()
      }, { replace: true });
    }
  }, [activeCategory, categoryFromUrl, location.pathname, location.search, navigate]);

  return (
    <CartProvider>
      <ServicesPageContainer>
        <ServiceCategories 
          categories={serviceCategories}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
        />
        
        <ServiceList
          categoryName={activeCategoryName}
          categoryId={activeCategory}
          services={filteredServices}
          onViewDetails={handleViewDetails}
        />
        
        <Cart />
      </ServicesPageContainer>
    </CartProvider>
  );
};

export default ServicesPage;