import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField, ImageUpload, ServiceSelection } from '../common';
import {
  BusinessRegistrationContainer,
  LogoContainer,
  Logo,
  FormTitle,
  Form,
  FormRow,
  FormSection,
  SectionTitle,
  ActionButton,
  LoginPrompt,
  LoginLink
} from './BusinessRegistration.styles';
import ROUTES from '../../../constants/routes';

const BusinessRegistration = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    businessName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    whatsApp: '',
    instagram: '',
    ownerName: '',
    ownerPhone: '',
    services: [],
    buildingAddress: '',
    streetAddress: '',
    city: '',
    latitude: '',
    longitude: '',
    pictures: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formState.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formState.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }
    
    if (!formState.ownerPhone.trim()) {
      newErrors.ownerPhone = 'Owner phone is required';
    }
    
    if (formState.services.length === 0) {
      newErrors.services = 'Please select at least one service';
    }
    
    if (!formState.buildingAddress.trim() || !formState.streetAddress.trim() || !formState.city.trim()) {
      newErrors.address = 'Complete address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send the data to an API
      console.log('Submitting business registration:', formState);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard or confirmation page
      navigate(ROUTES.REGISTER_SUCCESS);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle submission error
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <BusinessRegistrationContainer>
      <LogoContainer>
        <Logo src="/assets/images/logo.svg" alt="Urban Ease Logo" />
      </LogoContainer>
      
      <FormTitle>Business Registration</FormTitle>
      
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Business Information</SectionTitle>
          
          <FormField
            label="Business Name"
            name="businessName"
            value={formState.businessName}
            onChange={handleChange}
            error={errors.businessName}
            required
          />
          
          <FormRow>
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formState.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
          </FormRow>
          
          <FormRow>
            <FormField
              label="Alternate Phone"
              name="alternatePhone"
              type="tel"
              value={formState.alternatePhone}
              onChange={handleChange}
            />
            
            <FormField
              label="WhatsApp Number"
              name="whatsApp"
              type="tel"
              value={formState.whatsApp}
              onChange={handleChange}
            />
          </FormRow>
          
          <FormField
            label="Instagram ID"
            name="instagram"
            value={formState.instagram}
            onChange={handleChange}
            placeholder="@yourbusiness"
          />
        </FormSection>
        
        <FormSection>
          <SectionTitle>Owner Information</SectionTitle>
          
          <FormRow>
            <FormField
              label="Owner Name"
              name="ownerName"
              value={formState.ownerName}
              onChange={handleChange}
              error={errors.ownerName}
              required
            />
            
            <FormField
              label="Owner Phone"
              name="ownerPhone"
              type="tel"
              value={formState.ownerPhone}
              onChange={handleChange}
              error={errors.ownerPhone}
              required
            />
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Services</SectionTitle>
          
          <ServiceSelection
            name="services"
            value={formState.services}
            onChange={handleChange}
            error={errors.services}
            required
          />
        </FormSection>
        
        <FormSection>
          <SectionTitle>Location</SectionTitle>
          
          <FormField
            label="Building/House"
            name="buildingAddress"
            value={formState.buildingAddress}
            onChange={handleChange}
            error={errors.address}
            required
          />
          
          <FormRow>
            <FormField
              label="Street"
              name="streetAddress"
              value={formState.streetAddress}
              onChange={handleChange}
              required
            />
            
            <FormField
              label="City"
              name="city"
              value={formState.city}
              onChange={handleChange}
              required
            />
          </FormRow>
          
          <FormRow>
            <FormField
              label="Latitude"
              name="latitude"
              type="number"
              step="0.000001"
              value={formState.latitude}
              onChange={handleChange}
              helperText="Optional: Use map pin or GPS coordinates"
            />
            
            <FormField
              label="Longitude"
              name="longitude"
              type="number"
              step="0.000001"
              value={formState.longitude}
              onChange={handleChange}
              helperText="Optional: Use map pin or GPS coordinates"
            />
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Business Photos</SectionTitle>
          
          <ImageUpload
            label="Business Pictures"
            name="pictures"
            value={formState.pictures}
            onChange={handleChange}
            maxFiles={3}
            helperText="Upload up to 3 photos of your business (Max: 5MB each)"
          />
        </FormSection>
        
        <ActionButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register Business'}
        </ActionButton>
      </Form>
      
      <LoginPrompt>
        Already have account? 
        <LoginLink to={ROUTES.LOGIN}>Sign in</LoginLink>
      </LoginPrompt>
    </BusinessRegistrationContainer>
  );
};

export default BusinessRegistration;