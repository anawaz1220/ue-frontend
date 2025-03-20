import React from 'react';
import {
  ServiceSelectionContainer,
  ServiceSelectionTitle,
  ServicesGrid,
  ServiceItem,
  ServiceIcon,
  ServiceName,
  ErrorMessage
} from './ServiceSelection.styles';

// Service options with SVG icons
const serviceOptions = [
  { 
    value: 'haircut', 
    label: 'Haircut', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10V8C16 5.79086 14.2091 4 12 4H8C5.79086 4 4 5.79086 4 8V18C4 20.2091 5.79086 22 8 22H12C14.2091 22 16 20.2091 16 18V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 6L20 8L22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 14L20 16L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    value: 'coloring', 
    label: 'Hair Coloring', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 11.5L14 4.5L19.5 10L12.5 17L7 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 4.5L16.5 2L21.5 7L19 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 14L5 17.5C4.17157 18.3284 4.17157 19.6716 5 20.5C5.82843 21.3284 7.17157 21.3284 8 20.5L11.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    value: 'styling', 
    label: 'Hair Styling', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11C11 11.5523 11.4477 12 12 12C12.5523 12 13 11.5523 13 11V3Z" fill="currentColor"/>
        <path d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7V17C7 19.7614 9.23858 22 12 22C14.7614 22 17 19.7614 17 17V7Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    value: 'nails', 
    label: 'Nail Services', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 4L4 8L8 12L12 8L8 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 4L12 8L16 12L20 8L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12L4 16L8 20L12 16L8 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 12L12 16L16 20L20 16L16 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    value: 'facial', 
    label: 'Facial Treatments', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
        <path d="M8 15C9.33333 16.6667 14.6667 16.6667 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    value: 'makeup', 
    label: 'Makeup', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 9L11 5L19 13L15 17L7 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 17L17 19C18.1046 20.1046 18.1046 21.8954 17 23C15.8954 24.1046 14.1046 24.1046 13 23L11 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11L8 10L4 14L5 15L9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    value: 'massage', 
    label: 'Massage', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16V8Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    value: 'waxing', 
    label: 'Waxing', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 21V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18.364 5.63604L16.2426 7.75736" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7.75732 16.2426L5.63599 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18.364 18.364L16.2426 16.2426" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7.75732 7.75736L5.63599 5.63604" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    value: 'other', 
    label: 'Other', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V12M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  }
];

const ServiceSelection = ({ 
  value = [], 
  onChange, 
  name, 
  error,
  required = false,
  title = "Services Offered" 
}) => {
  
  const handleServiceClick = (serviceValue) => {
    let newSelected;
    
    if (value.includes(serviceValue)) {
      // Remove service if already selected
      newSelected = value.filter(item => item !== serviceValue);
    } else {
      // Add service if not already selected
      newSelected = [...value, serviceValue];
    }
    
    // Notify parent component of change
    if (onChange) {
      onChange({
        target: {
          name,
          value: newSelected
        }
      });
    }
  };

  return (
    <ServiceSelectionContainer>
      <ServiceSelectionTitle>
        {title}
        {required && <span className="required">*</span>}
      </ServiceSelectionTitle>
      <ServicesGrid>
        {serviceOptions.map((service) => (
          <ServiceItem
            key={service.value}
            selected={value.includes(service.value)}
            onClick={() => handleServiceClick(service.value)}
          >
            <ServiceIcon selected={value.includes(service.value)}>
              {service.icon}
            </ServiceIcon>
            <ServiceName>{service.label}</ServiceName>
          </ServiceItem>
        ))}
      </ServicesGrid>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ServiceSelectionContainer>
  );
};

export default ServiceSelection;