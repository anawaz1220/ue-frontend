import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import { CartProvider, useCart } from '../../contexts/CartContext';
import { services } from '../../data/servicesData';

const DetailPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.small} 0;
  margin-bottom: ${props => props.theme.spacing.medium};
  
  svg {
    margin-right: ${props => props.theme.spacing.small};
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const DetailContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xlarge};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ServiceImage = styled.div`
  width: 100%;
  height: 300px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.large};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ServiceHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.large};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${props => props.theme.spacing.small} 0;
`;

const RatingIcon = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.theme.spacing.small};
  font-size: ${props => props.theme.fontSizes.small};
`;

const ReviewCount = styled.span`
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.medium};
  margin-left: ${props => props.theme.spacing.small};
`;

const ServiceDetails = styled.div`
  margin-bottom: ${props => props.theme.spacing.large};
`;

const DetailSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.large};
`;

const SectionTitle = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.medium};
  padding-bottom: ${props => props.theme.spacing.small};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

const DetailsList = styled.ul`
  list-style-type: disc;
  padding-left: ${props => props.theme.spacing.large};
  margin: ${props => props.theme.spacing.medium} 0;
`;

const DetailItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.small};
`;

const ServiceSidebar = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceCard = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.large};
  margin-bottom: ${props => props.theme.spacing.large};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const Price = styled.span`
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  margin-right: ${props => props.theme.spacing.small};
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.large};
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.large};
  color: ${props => props.theme.colors.grey};
  
  svg {
    margin-right: ${props => props.theme.spacing.small};
  }
`;

const AddToCartButton = styled(Button)`
  width: 100%;
`;

const ServiceDetailPageContent = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [service, setService] = useState(null);
  
  // Extract city from URL if available
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get('city') || 'sudbury';
  
  useEffect(() => {
    // Find the service by ID
    const foundService = services.find(s => s.id === serviceId);
    
    if (foundService) {
      setService(foundService);
    } else {
      // If service not found, redirect to services page
      navigate('/services?city=' + city);
    }
  }, [serviceId, navigate, city]);
  
  if (!service) {
    return (
      <DetailPageContainer>
        <Typography variant="h2">Loading...</Typography>
      </DetailPageContainer>
    );
  }
  
  const formatCurrency = (amount) => {
    return '$' + amount.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  const formatDuration = (duration) => {
    let formattedDuration = '';
    if (duration.hours > 0) {
      formattedDuration += `${duration.hours} hr `;
    }
    if (duration.minutes > 0) {
      formattedDuration += `${duration.minutes} mins`;
    }
    return formattedDuration.trim();
  };
  
  const formatRating = (rating) => {
    return rating.toFixed(2);
  };
  
  const formatReviewCount = (count) => {
    if (count >= 1000000) {
      return `(${(count/1000000).toFixed(1)}M reviews)`;
    } else if (count >= 1000) {
      return `(${(count/1000).toFixed(0)}K reviews)`;
    }
    return `(${count} reviews)`;
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleAddToCart = () => {
    addToCart(service);
    // You could add additional logic here, like showing a confirmation or redirecting
  };

  return (
    <DetailPageContainer>
      <BackButton onClick={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to services
      </BackButton>
      
      <DetailContent>
        <ServiceInfo>
          <ServiceImage>
            {service.image && <img src={service.image} alt={service.name} />}
          </ServiceImage>
          
          <ServiceHeader>
            <Typography variant="h1">{service.name}</Typography>
            
            <RatingContainer>
              <RatingIcon>★</RatingIcon>
              <Typography variant="body1">{formatRating(service.rating)}</Typography>
              <ReviewCount>{formatReviewCount(service.reviewCount)}</ReviewCount>
            </RatingContainer>
          </ServiceHeader>
          
          <ServiceDetails>
            <DetailSection>
              <SectionTitle variant="h3">Service Details</SectionTitle>
              <DetailsList>
                <DetailItem><Typography variant="body1">{service.description}</Typography></DetailItem>
                {service.additionalInfo && (
                  <DetailItem><Typography variant="body1">{service.additionalInfo}</Typography></DetailItem>
                )}
              </DetailsList>
            </DetailSection>
            
            {/* Additional sections can be added here as needed */}
            <DetailSection>
              <SectionTitle variant="h3">What to expect</SectionTitle>
              <Typography variant="body1">
                Our professional stylists will provide high-quality salon experience at your preferred location.
                All equipment and products are provided by our experts.
              </Typography>
            </DetailSection>
          </ServiceDetails>
        </ServiceInfo>
        
        <ServiceSidebar>
          <PriceCard>
            <PriceContainer>
              <Price>{formatCurrency(service.price)}</Price>
              {service.originalPrice && (
                <OriginalPrice>{formatCurrency(service.originalPrice)}</OriginalPrice>
              )}
            </PriceContainer>
            
            <Duration>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {formatDuration(service.duration)}
            </Duration>
            
            <AddToCartButton onClick={handleAddToCart}>
              Add to Cart
            </AddToCartButton>
          </PriceCard>
          
          {/* <ServicePromise items={servicePromise} /> */}
        </ServiceSidebar>
      </DetailContent>
    </DetailPageContainer>
  );
};

// Wrapper component to provide cart context
const ServiceDetailPage = () => {
  return (
    <CartProvider>
      <ServiceDetailPageContent />
    </CartProvider>
  );
};

export default ServiceDetailPage;