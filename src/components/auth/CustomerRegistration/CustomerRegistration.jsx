import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField, ImageUpload } from '../common';
import {
  CustomerRegistrationContainer,
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
} from './CustomerRegistration.styles';
import ROUTES from '../../../constants/routes';

const CustomerRegistration = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsApp: '',
    houseAddress: '',
    streetAddress: '',
    city: '',
    profilePicture: []
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
    if (!formState.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formState.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formState.houseAddress.trim() || !formState.streetAddress.trim() || !formState.city.trim()) {
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
      console.log('Submitting customer registration:', formState);
      
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
    <CustomerRegistrationContainer>
      <LogoContainer>
        <Logo src="/assets/images/logo.svg" alt="Urban Ease Logo" />
      </LogoContainer>
      
      <FormTitle>Customer Registration</FormTitle>
      
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Personal Information</SectionTitle>
          
          <FormRow>
            <FormField
              label="First Name"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            
            <FormField
              label="Last Name"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
          </FormRow>
          
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
          
          <FormField
            label="WhatsApp Number"
            name="whatsApp"
            type="tel"
            value={formState.whatsApp}
            onChange={handleChange}
            helperText="Optional: For service updates and communication"
          />
        </FormSection>
        
        <FormSection>
          <SectionTitle>Service Address</SectionTitle>
          
          <FormField
            label="House/Office"
            name="houseAddress"
            value={formState.houseAddress}
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
        </FormSection>
        
        <FormSection>
          <SectionTitle>Profile Photo</SectionTitle>
          
          <ImageUpload
            label="Profile Picture"
            name="profilePicture"
            value={formState.profilePicture}
            onChange={handleChange}
            maxFiles={1}
            helperText="Upload a profile photo (Max: 5MB)"
          />
        </FormSection>
        
        <ActionButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register Account'}
        </ActionButton>
      </Form>
      
      <LoginPrompt>
        Already have account? 
        <LoginLink to={ROUTES.LOGIN}>Sign in</LoginLink>
      </LoginPrompt>
    </CustomerRegistrationContainer>
  );
};

export default CustomerRegistration;