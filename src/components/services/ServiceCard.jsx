import React from 'react';
import styled from 'styled-components';
import Typography from '../common/Typography';
import Button from '../common/Button';
import { useCart } from '../../contexts/CartContext';

const CardContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  padding: ${props => props.theme.spacing.large} 0;
  width: 100%;
`;

const PackageBadge = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  display: inline-block;
  font-size: ${props => props.theme.fontSizes.small};
  margin-bottom: ${props => props.theme.spacing.small};
  text-transform: uppercase;
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceTitle = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.fontWeights.semiBold};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${props => props.theme.spacing.xs} 0;
`;

const RatingIcon = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.theme.spacing.small};
  font-size: ${props => props.theme.fontSizes.xs};
`;

const ReviewCount = styled.span`
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.small};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin: ${props => props.theme.spacing.xs} 0;
`;

const Price = styled.span`
  font-weight: ${props => props.theme.fontWeights.semiBold};
  font-size: ${props => props.theme.fontSizes.large};
  margin-right: ${props => props.theme.spacing.small};
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.small};
`;

const Duration = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.grey};
  display: inline-flex;
  align-items: center;
  margin-left: ${props => props.theme.spacing.small};
`;

const ServiceDetails = styled.div`
  margin-top: ${props => props.theme.spacing.medium};
`;

const DetailsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: ${props => props.theme.spacing.small} 0;
`;

const DetailItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.small};
  font-size: ${props => props.theme.fontSizes.medium};
  
  &:before {
    content: "•";
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-right: ${props => props.theme.spacing.small};
  }
`;

const ViewDetailsLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.info};
  padding: 0;
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  text-decoration: none;
  margin-top: ${props => props.theme.spacing.small};
  font-weight: ${props => props.theme.fontWeights.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled(Button)`
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.info};
  border-radius: ${props => props.theme.borderRadius.round};
  padding: ${props => props.theme.spacing.xs};
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.info};
  cursor: pointer;
  padding: 0;
`;

const QuantityText = styled.span`
  width: 30px;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.medium};
`;

const ServiceCard = ({ service, onViewDetails }) => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const cartItem = cart.find(item => item.id === service.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  
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
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0 && quantity === 1) {
      removeFromCart(service.id);
    } else if (newQuantity > quantity) {
      addToCart(service);
    } else if (newQuantity < quantity) {
      removeFromCart(service.id);
    }
  };

  return (
    <CardContainer>
      {service.isPackage && <PackageBadge>Package</PackageBadge>}
      
      <ServiceHeader>
        <ServiceInfo>
          <ServiceTitle variant="h3">{service.name}</ServiceTitle>
          
          <RatingContainer>
            <RatingIcon>★</RatingIcon>
            <Typography variant="body2">{formatRating(service.rating)}</Typography>
            <ReviewCount>{formatReviewCount(service.reviewCount)}</ReviewCount>
          </RatingContainer>
          
          <PriceContainer>
            <Price>{formatCurrency(service.price)}</Price>
            {service.originalPrice && (
              <OriginalPrice>{formatCurrency(service.originalPrice)}</OriginalPrice>
            )}
            <Duration>• {formatDuration(service.duration)}</Duration>
          </PriceContainer>
        </ServiceInfo>
        
        <ActionContainer>
          {quantity === 0 ? (
            <ActionButton 
              variant="outlined" 
              color="secondary"
              onClick={() => addToCart(service)}
            >
              Add
            </ActionButton>
          ) : (
            <QuantityControls>
              <QuantityButton onClick={() => handleQuantityChange(quantity - 1)}>-</QuantityButton>
              <QuantityText>{quantity}</QuantityText>
              <QuantityButton onClick={() => handleQuantityChange(quantity + 1)}>+</QuantityButton>
            </QuantityControls>
          )}
        </ActionContainer>
      </ServiceHeader>
      
      <ServiceDetails>
        <DetailsList>
          {service.description && <DetailItem>{service.description}</DetailItem>}
          {service.additionalInfo && <DetailItem>{service.additionalInfo}</DetailItem>}
        </DetailsList>
        
        <ViewDetailsLink onClick={() => onViewDetails(service)}>
          View details
        </ViewDetailsLink>
      </ServiceDetails>
    </CardContainer>
  );
};

export default ServiceCard;