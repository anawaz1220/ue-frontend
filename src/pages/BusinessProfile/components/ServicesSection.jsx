import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';
import ServiceForm from './ServiceForm';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ApiError from '../../../components/common/ApiError';

const SectionContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xlarge};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.large};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.medium};
  }
`;

const ServicesList = styled.div`
  padding: ${props => props.theme.spacing.medium};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.large};
  padding: ${props => props.theme.spacing.medium};
`;

const ServiceCard = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ServiceHeader = styled.div`
  background: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.medium};
  position: relative;
`;

const ServiceCategory = styled.span`
  position: absolute;
  top: ${props => props.theme.spacing.small};
  right: ${props => props.theme.spacing.small};
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ServiceTitle = styled(Typography)`
  margin-top: ${props => props.theme.spacing.small};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.fontWeights.semiBold};
`;

const ServicePrice = styled(Typography)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const ServiceDuration = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.spacing.small};
  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes.small};
  
  svg {
    margin-right: ${props => props.theme.spacing.xs};
    width: 16px;
    height: 16px;
  }
`;

const ServiceContent = styled.div`
  padding: ${props => props.theme.spacing.medium};
`;

const ServiceDescription = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.medium};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ServiceDetailsSection = styled.div`
  margin-top: ${props => props.theme.spacing.medium};
`;

const ServiceDetailsTitle = styled(Typography)`
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing.small};
`;

const ServiceDetailsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ServiceDetailItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.fontSizes.small};
  display: flex;
  align-items: flex-start;
  
  &::before {
    content: "•";
    margin-right: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.primary};
  }
`;

const ServiceCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.medium};
  background: ${props => props.theme.colors.lightBackground};
  border-top: 1px solid ${props => props.theme.colors.lightGrey};
`;

const ServiceStats = styled.div`
  display: flex;
  align-items: center;
`;

const ServiceRating = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${props => props.theme.spacing.medium};
  
  svg {
    color: ${props => props.theme.colors.secondary};
    margin-right: ${props => props.theme.spacing.xs};
  }
`;

const ActionButton = styled(Button)`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.medium};
`;

const EmptyStateMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xlarge};
  text-align: center;
`;

const formatCurrency = (amount) => {
  // Check if amount is undefined or null
  if (amount === undefined || amount === null) {
    return '$0.00'; // Return a default value
  }
  
  // Try to convert to number if it's a string
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }
  
  // Final check in case conversion failed
  if (isNaN(amount)) {
    return '$0.00';
  }
  
  return amount.toLocaleString('en-CA', { 
    style: 'currency', 
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const formatDuration = (duration) => {
  // Check if duration is undefined or null
  if (!duration) {
    return '0 min';
  }
  
  const parts = [];
  if (duration.hours && duration.hours > 0) {
    parts.push(`${duration.hours} hr${duration.hours !== 1 ? 's' : ''}`);
  }
  if (duration.minutes && duration.minutes > 0) {
    parts.push(`${duration.minutes} min${duration.minutes !== 1 ? 's' : ''}`);
  }
  
  // If both hours and minutes are 0 or undefined, return a default
  if (parts.length === 0) {
    return '0 min';
  }
  
  return parts.join(' ');
};

export default function ServicesSection({ services = [], onAddService, onDeleteService }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  const handleAddClick = () => {
    setShowAddForm(true);
    setEditingService(null);
  };
  
  const handleEditClick = (service) => {
    setEditingService(service);
    setShowAddForm(true);
  };
  
  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingService(null);
  };
  
  const handleFormSubmit = (serviceData) => {
    if (editingService) {
      // If explicitly editing, use onAddService as a fallback
      if (typeof onAddService === 'function') {
        onAddService({ ...serviceData, id: editingService.id });
      }
    } else {
      if (typeof onAddService === 'function') {
        onAddService(serviceData);
      }
    }
    handleFormClose();
  };
  
  // Make sure services is an array
  const safeServices = Array.isArray(services) ? services : [];
  
  return (
    <SectionContainer>
      <SectionHeader>
        <Typography variant="h2">Services Offered</Typography>
        <Button color="primary" onClick={handleAddClick}>
          Add New Service
        </Button>
      </SectionHeader>
      
      {showAddForm ? (
        <ServiceForm 
          service={editingService}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <ServicesList>
          {safeServices.length === 0 ? (
            <EmptyStateMessage>
              <Typography variant="h3">No services added yet</Typography>
              <Typography variant="body1" style={{ marginBottom: '20px' }}>
                Start adding services that your business offers to attract customers.
              </Typography>
              <Button color="primary" onClick={handleAddClick}>
                Add Your First Service
              </Button>
            </EmptyStateMessage>
          ) : (
            <ServicesGrid>
              {safeServices.map(service => (
                <ServiceCard key={service.id || `temp-${Math.random()}`}>
                  <ServiceHeader>
                    <ServiceCategory>{service.category || 'Service'}</ServiceCategory>
                    <ServiceTitle variant="h3">{service.name || 'Unnamed Service'}</ServiceTitle>
                    <ServicePrice variant="h2">{formatCurrency(service.price)}</ServicePrice>
                    
                    <ServiceDuration>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {formatDuration(service.duration || { hours: 0, minutes: 0 })}
                    </ServiceDuration>
                  </ServiceHeader>
                  
                  <ServiceContent>
                    <ServiceDescription variant="body1">
                      {service.description || 'No description available'}
                    </ServiceDescription>
                    
                    {service.itemsNeededByCustomer && service.itemsNeededByCustomer.length > 0 && (
                      <ServiceDetailsSection>
                        <ServiceDetailsTitle variant="body1">Customer Needs to Provide:</ServiceDetailsTitle>
                        <ServiceDetailsList>
                          {service.itemsNeededByCustomer.slice(0, 2).map((item, index) => (
                            <ServiceDetailItem key={index}>{item}</ServiceDetailItem>
                          ))}
                          {service.itemsNeededByCustomer.length > 2 && (
                            <ServiceDetailItem>+ {service.itemsNeededByCustomer.length - 2} more</ServiceDetailItem>
                          )}
                        </ServiceDetailsList>
                      </ServiceDetailsSection>
                    )}
                    
                    {service.itemsBusinessWillBring && service.itemsBusinessWillBring.length > 0 && (
                      <ServiceDetailsSection>
                        <ServiceDetailsTitle variant="body1">We Will Bring:</ServiceDetailsTitle>
                        <ServiceDetailsList>
                          {service.itemsBusinessWillBring.slice(0, 2).map((item, index) => (
                            <ServiceDetailItem key={index}>{item}</ServiceDetailItem>
                          ))}
                          {service.itemsBusinessWillBring.length > 2 && (
                            <ServiceDetailItem>+ {service.itemsBusinessWillBring.length - 2} more</ServiceDetailItem>
                          )}
                        </ServiceDetailsList>
                      </ServiceDetailsSection>
                    )}
                  </ServiceContent>
                  
                  <ServiceCardFooter>
                    <ServiceStats>
                      <ServiceRating>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {service.rating || '0.0'}
                      </ServiceRating>
                      <Typography variant="body2">{service.reviewCount || 0} reviews</Typography>
                    </ServiceStats>
                    
                    <ActionButton variant="outlined" onClick={() => handleEditClick(service)}>
                      Edit
                    </ActionButton>
                  </ServiceCardFooter>
                </ServiceCard>
              ))}
            </ServicesGrid>
          )}
        </ServicesList>
      )}
    </SectionContainer>
  );
}