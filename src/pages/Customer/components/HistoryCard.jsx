// src/pages/Customer/components/HistoryCard.jsx
import React from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';

const CardContainer = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.white};
  display: flex;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceDate = styled(Typography)`
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.small};
  margin-bottom: ${props => props.theme.spacing.small};
`;

const ServiceTitle = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.fontWeights.semiBold};
`;

const BusinessName = styled(Typography)`
  color: ${props => props.theme.colors.grey};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const DetailRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.large};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const DetailGroup = styled.div`
  display: flex;
  align-items: center;
`;

const DetailIcon = styled.div`
  margin-right: ${props => props.theme.spacing.small};
  color: ${props => props.theme.colors.grey};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const DetailText = styled(Typography)`
  font-size: ${props => props.theme.fontSizes.medium};
`;

const StatusBadge = styled.div`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.round};
  font-size: ${props => props.theme.fontSizes.small};
  display: inline-block;
  margin-left: ${props => props.theme.spacing.medium};
  
  ${props => {
    if (props.status === 'completed') {
      return `
        background-color: ${props.theme.colors.success};
        color: white;
      `;
    } else if (props.status === 'cancelled') {
      return `
        background-color: ${props.theme.colors.error};
        color: white;
      `;
    } else {
      return `
        background-color: ${props.theme.colors.lightGrey};
        color: ${props.theme.colors.grey};
      `;
    }
  }}
`;

const RatingContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 0;
    align-items: flex-start;
    margin-top: ${props => props.theme.spacing.medium};
  }
`;

const RatingLabel = styled(Typography)`
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.small};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Stars = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.small};
`;

const Star = styled.span`
  color: ${props => props.filled ? props.theme.colors.secondary : props.theme.colors.lightGrey};
  font-size: 20px;
  margin-right: 2px;
`;

const ReviewButton = styled(Button)`
  margin-top: ${props => props.theme.spacing.small};
`;

const HistoryCard = ({ service }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatTime = (timeString) => {
    // Convert 24-hour time string to formatted time
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    
    return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  };
  
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating}>
          ★
        </Star>
      );
    }
    return stars;
  };
  
  return (
    <CardContainer>
      <ServiceInfo>
        <ServiceDate variant="caption">
          {formatDate(service.date)} at {formatTime(service.time)}
        </ServiceDate>
        
        <ServiceTitle variant="h3">
          {service.serviceName}
          <StatusBadge status={service.status}>
            {service.status === 'completed' ? 'Completed' : 'Cancelled'}
          </StatusBadge>
        </ServiceTitle>
        
        <BusinessName variant="body2">{service.businessName}</BusinessName>
        
        <DetailRow>
          <DetailGroup>
            <DetailIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </DetailIcon>
            <DetailText>${service.price.toFixed(2)}</DetailText>
          </DetailGroup>
          
          <DetailGroup>
            <DetailIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </DetailIcon>
            <DetailText>
              {service.address.type}: {service.address.street}
              {service.address.city && `, ${service.address.city}`}
            </DetailText>
          </DetailGroup>
        </DetailRow>
      </ServiceInfo>
      
      <RatingContainer>
        {service.status === 'completed' && (
          <>
            {service.rating ? (
              <>
                <RatingLabel>Your Rating</RatingLabel>
                <Stars>
                  {renderRating(service.rating)}
                </Stars>
              </>
            ) : (
              <ReviewButton variant="outlined" color="primary" size="small">
                Leave Review
              </ReviewButton>
            )}
          </>
        )}
      </RatingContainer>
    </CardContainer>
  );
};

export default HistoryCard;