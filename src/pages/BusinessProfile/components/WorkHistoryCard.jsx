// src/pages/BusinessProfile/components/WorkHistoryCard.jsx

import React from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';

const CardContainer = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  background: ${props => {
    switch(props.status) {
      case 'completed':
        return props.theme.colors.lightBackground;
      case 'in-progress':
        return 'rgba(255, 193, 7, 0.1)';
      case 'scheduled':
        return 'rgba(33, 150, 243, 0.1)';
      default:
        return props.theme.colors.lightBackground;
    }
  }};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ServiceName = styled(Typography)`
  font-weight: ${props => props.theme.fontWeights.semiBold};
`;

const StatusBadge = styled.div`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: capitalize;
  
  background: ${props => {
    switch(props.status) {
      case 'completed':
        return props.theme.colors.success;
      case 'in-progress':
        return props.theme.colors.warning;
      case 'scheduled':
        return props.theme.colors.info;
      default:
        return props.theme.colors.grey;
    }
  }};
  color: white;
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
`;

const JobInfo = styled.div`
  margin-bottom: ${props => props.theme.spacing.medium};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.small};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.grey};
    min-width: 16px;
  }
`;

const ClientSection = styled.div`
  margin-top: ${props => props.theme.spacing.medium};
  padding-top: ${props => props.theme.spacing.medium};
  border-top: 1px solid ${props => props.theme.colors.lightGrey};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.spacing.small};
`;

const StarsContainer = styled.div`
  display: flex;
  margin-right: ${props => props.theme.spacing.small};
`;

const Star = styled.span`
  color: ${props => props.theme.colors.secondary};
  margin-right: 2px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  background: ${props => props.theme.colors.lightBackground};
  border-top: 1px solid ${props => props.theme.colors.lightGrey};
`;

const Amount = styled(Typography)`
  font-weight: ${props => props.theme.fontWeights.semiBold};
`;

const formatCurrency = (amount) => {
  return amount.toLocaleString('en-CA', { 
    style: 'currency', 
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const WorkHistoryCard = ({ job }) => {
  const renderStars = (rating) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i}>★</Star>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i}>★</Star>); // We'd use a half-star icon ideally
      } else {
        stars.push(<Star key={i} style={{ color: '#e0e0e0' }}>★</Star>);
      }
    }
    
    return stars;
  };
  
  return (
    <CardContainer>
      <CardHeader status={job.status}>
        <ServiceName variant="h3">{job.serviceName}</ServiceName>
        <StatusBadge status={job.status}>{job.status}</StatusBadge>
      </CardHeader>
      
      <CardContent>
        <JobInfo>
          <InfoRow>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <Typography variant="body2">{formatDate(job.date)}</Typography>
          </InfoRow>
          
          <InfoRow>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <Typography variant="body2">{job.location} - {job.address}</Typography>
          </InfoRow>
          
          <InfoRow>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <Typography variant="body2">Staff: {job.staffName}</Typography>
          </InfoRow>
        </JobInfo>
        
        <ClientSection>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            Client: {job.clientName}
          </Typography>
          
          {job.rating && (
            <>
              <RatingContainer>
                <StarsContainer>
                  {renderStars(job.rating)}
                </StarsContainer>
                <Typography variant="body2">{job.rating}/5</Typography>
              </RatingContainer>
              
              {job.reviewComment && (
                <Typography 
                  variant="body2" 
                  style={{ 
                    fontStyle: 'italic', 
                    color: '#666',
                    marginTop: '8px'
                  }}
                >
                  "{job.reviewComment}"
                </Typography>
              )}
            </>
          )}
        </ClientSection>
      </CardContent>
      
      <CardFooter>
        <Typography variant="body2">Job #{job.id.slice(-4)}</Typography>
        <Amount variant="h3">{formatCurrency(job.payment)}</Amount>
      </CardFooter>
    </CardContainer>
  );
};

export default WorkHistoryCard;