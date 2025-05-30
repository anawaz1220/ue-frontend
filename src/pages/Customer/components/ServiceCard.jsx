// src/pages/Customer/components/ServiceCard.jsx
import React from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';

const CardContainer = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.large};
  margin-bottom: ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.white};
  display: flex;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceTitle = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
`;

const BusinessName = styled(Typography)`
  color: ${props => props.theme.colors.grey};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const ServiceDetails = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const DetailGroup = styled.div`
  margin-right: ${props => props.theme.spacing.large};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-right: 0;
    margin-bottom: ${props => props.theme.spacing.small};
  }
`;

const DetailLabel = styled(Typography)`
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.small};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const DetailValue = styled(Typography)`
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const AddressSection = styled.div`
  margin-top: ${props => props.theme.spacing.medium};
`;

const StatusBadge = styled.div`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.round};
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.medium};
  display: inline-block;
  margin-bottom: ${props => props.theme.spacing.medium};
  
  ${props => {
    if (props.status === 'confirmed') {
      return `
        background-color: ${props.theme.colors.success};
        color: white;
      `;
    } else if (props.status === 'pending') {
      return `
        background-color: ${props.theme.colors.warning};
        color: ${props.theme.colors.primary};
      `;
    } else {
      return `
        background-color: ${props.theme.colors.lightGrey};
        color: ${props.theme.colors.grey};
      `;
    }
  }}
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: ${props => props.theme.spacing.medium};
    justify-content: flex-end;
  }
`;

const ActionButton = styled(Button)`
  margin-left: ${props => props.theme.spacing.small};
`;

const ServiceCard = ({ service, isPending, isConfirmed, isHistory }) => {
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
  
  const formatStatus = (status) => {
    switch(status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending Confirmation';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  const getStatusBadge = (status) => {
    return (
      <StatusBadge status={status}>
        {formatStatus(status)}
      </StatusBadge>
    );
  };
  
  return (
    <CardContainer>
      <ServiceInfo>
        {getStatusBadge(service.status)}
        
        <ServiceTitle variant="h3">{service.serviceName}</ServiceTitle>
        <BusinessName variant="body2">{service.businessName}</BusinessName>
        
        <ServiceDetails>
          <DetailGroup>
            <DetailLabel variant="caption">Date</DetailLabel>
            <DetailValue variant="body1">{formatDate(service.date)}</DetailValue>
          </DetailGroup>
          
          <DetailGroup>
            <DetailLabel variant="caption">Time</DetailLabel>
            <DetailValue variant="body1">{formatTime(service.time)}</DetailValue>
          </DetailGroup>
          
          <DetailGroup>
            <DetailLabel variant="caption">Price</DetailLabel>
            <DetailValue variant="body1">${service.price.toFixed(2)}</DetailValue>
          </DetailGroup>
        </ServiceDetails>
        
        <AddressSection>
          <DetailLabel variant="caption">Location</DetailLabel>
          <DetailValue variant="body1">
            {service.address.type}: {service.address.street}
            {service.address.city && `, ${service.address.city}`}
            {service.address.state && `, ${service.address.state}`}
            {service.address.zipCode && ` ${service.address.zipCode}`}
          </DetailValue>
        </AddressSection>
      </ServiceInfo>
      
      <ActionsContainer>
        {isPending && (
          <ActionButton variant="outlined" color="secondary">
            Cancel
          </ActionButton>
        )}
        
        {isConfirmed && (
          <>
            <ActionButton variant="outlined" color="primary">
              Reschedule
            </ActionButton>
            <ActionButton variant="outlined" color="secondary">
              Cancel
            </ActionButton>
          </>
        )}
        
        {isHistory && service.status === 'completed' && !service.rating && (
          <ActionButton variant="outlined" color="primary">
            Leave Review
          </ActionButton>
        )}
      </ActionsContainer>
    </CardContainer>
  );
};

export default ServiceCard;