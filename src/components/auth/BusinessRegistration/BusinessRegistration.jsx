import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FormContent,
  FormSection,
  FormGroup,
  FormLabel,
  FormInput,
  FormInputWrapper,
  FormError,
  FormButton,
  FormButtonGroup,
  FormActions,
  FormDivider,
  StepIndicator,
  StepItem,
  StepNumber,
  StepText,
  StepConnector
} from './BusinessRegistration.styles';
import { useAuth } from '../../../contexts/AuthContext';
import ROUTES from '../../../constants/routes';
import ServiceSelection from '../common/ServiceSelection';
import ImageUpload from '../common/ImageUpload';

const BusinessRegistration = () => {
  const { registerBusiness } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [logoImage, setLogoImage] = useState(null);
  
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm({
    defaultValues: {
      businessName: '',
      email: '',
      phoneNumber: '',
      whatsappNumber: '', // Optional
      building: '',
      street: '',
      city: 'Sudbury', // Default city
      ownerName: '',
      ownerPhone: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  });
  
  const watchPassword = watch('password');
  
  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };
  
  const onSubmit = async (data) => {
    setLoading(true);
    setRegistrationError('');
    
    try {
      // Transform form data to match API requirements
      const businessData = {
        email: data.email,
        password: data.password,
        businessName: data.businessName,
        phoneNumber: data.phoneNumber,
        ownerName: data.ownerName,
        ownerPhone: data.ownerPhone,
        building: data.building,
        street: data.street,
        city: data.city,
        // Include optional fields if provided
        ...(data.whatsappNumber && { whatsappNumber: data.whatsappNumber }),
      };
      
      await registerBusiness(businessData);
      
      // Note: Service selection will be handled after account creation and verification
      // since it requires authentication
      
      navigate(ROUTES.REGISTER_SUCCESS);
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationError(error.message || 'Registration failed. Please try again.');
      setCurrentStep(1); // Back to first step on error
    } finally {
      setLoading(false);
    }
  };
  
  const handleServiceSelection = (services) => {
    setSelectedServices(services);
  };
  
  const handleLogoUpload = (file) => {
    setLogoImage(file);
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <FormSection>
              <FormGroup>
                <FormLabel>Business Name</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="text"
                    {...register('businessName', {
                      required: 'Business name is required',
                      minLength: {
                        value: 2,
                        message: 'Business name must be at least 2 characters'
                      }
                    })}
                  />
                </FormInputWrapper>
                {errors.businessName && <FormError>{errors.businessName.message}</FormError>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </FormInputWrapper>
                {errors.email && <FormError>{errors.email.message}</FormError>}
              </FormGroup>
            </FormSection>
            
            <FormSection>
              <FormGroup>
                <FormLabel>Business Phone Number</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="tel"
                    {...register('phoneNumber', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\+?\d{10,15}$/,
                        message: 'Invalid phone number format'
                      }
                    })}
                  />
                </FormInputWrapper>
                {errors.phoneNumber && <FormError>{errors.phoneNumber.message}</FormError>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Business WhatsApp Number (Optional)</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="tel"
                    {...register('whatsappNumber', {
                      pattern: {
                        value: /^\+?\d{10,15}$/,
                        message: 'Invalid phone number format'
                      }
                    })}
                  />
                </FormInputWrapper>
                {errors.whatsappNumber && <FormError>{errors.whatsappNumber.message}</FormError>}
              </FormGroup>
            </FormSection>
          </>
        );
        
      case 2:
        return (
          <>
            <FormSection>
              <FormGroup>
                <FormLabel>Owner Full Name</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="text"
                    {...register('ownerName', {
                      required: 'Owner name is required',
                      minLength: {
                        value: 2,
                        message: 'Owner name must be at least 2 characters'
                      }
                    })}
                  />
                </FormInputWrapper>
                {errors.ownerName && <FormError>{errors.ownerName.message}</FormError>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Owner Phone Number</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="tel"
                    {...register('ownerPhone', {
                      required: 'Owner phone is required',
                      pattern: {
                        value: /^\+?\d{10,15}$/,
                        message: 'Invalid phone number format'
                      }
                    })}
                  />
                </FormInputWrapper>
                {errors.ownerPhone && <FormError>{errors.ownerPhone.message}</FormError>}
              </FormGroup>
            </FormSection>
            
            <FormSection>
              <FormGroup>
                <FormLabel>Building/House Number</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="text"
                    {...register('building', {
                      required: 'Building/house number is required'
                    })}
                  />
                </FormInputWrapper>
                {errors.building && <FormError>{errors.building.message}</FormError>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Street Name</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="text"
                    {...register('street', {
                      required: 'Street name is required'
                    })}
                  />
                </FormInputWrapper>
                {errors.street && <FormError>{errors.street.message}</FormError>}
              </FormGroup>
            </FormSection>
            
            <FormSection>
              <FormGroup>
                <FormLabel>City</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="text"
                    {...register('city', {
                      required: 'City is required'
                    })}
                  />
                </FormInputWrapper>
                {errors.city && <FormError>{errors.city.message}</FormError>}
              </FormGroup>
            </FormSection>
          </>
        );
        
      case 3:
        return (
          <>
            <FormSection>
              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[@$!%*?&a-zA-Z\d]{8,}$/,
                        message: 'Password must include uppercase, lowercase, and numbers'
                      }
                    })}
                  />
                </FormInputWrapper>
                {errors.password && <FormError>{errors.password.message}</FormError>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Confirm Password</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type="password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === watchPassword || 'Passwords do not match'
                    })}
                  />
                </FormInputWrapper>
                {errors.confirmPassword && <FormError>{errors.confirmPassword.message}</FormError>}
              </FormGroup>
            </FormSection>
            
            <FormGroup>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  style={{ marginRight: '8px', marginTop: '4px' }}
                  {...register('agreeTerms', {
                    required: 'You must agree to terms and conditions'
                  })}
                />
                <FormLabel htmlFor="agreeTerms" style={{ marginBottom: 0 }}>
                  I agree to the Terms of Service and Privacy Policy
                </FormLabel>
              </div>
              {errors.agreeTerms && <FormError>{errors.agreeTerms.message}</FormError>}
            </FormGroup>
            
            <FormSection>
              <p style={{ marginBottom: '1rem' }}>
                After registration, you'll receive a confirmation email. Once verified, 
                you can log in to complete your business profile and start offering your services.
              </p>
            </FormSection>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>Register Your Beauty Business</FormTitle>
        <FormSubtitle>
          Join our platform and connect with customers in your area
        </FormSubtitle>
      </FormHeader>
      
      {registrationError && (
        <div style={{ 
          color: 'red', 
          textAlign: 'center', 
          marginBottom: '16px',
          backgroundColor: 'rgba(255, 0, 0, 0.05)',
          padding: '8px',
          borderRadius: '4px'
        }}>
          {registrationError}
        </div>
      )}
      
      <StepIndicator>
        <StepItem active={currentStep >= 1} completed={currentStep > 1}>
          <StepNumber>{currentStep > 1 ? '✓' : '1'}</StepNumber>
          <StepText>Business Info</StepText>
        </StepItem>
        
        <StepConnector active={currentStep > 1} />
        
        <StepItem active={currentStep >= 2} completed={currentStep > 2}>
          <StepNumber>{currentStep > 2 ? '✓' : '2'}</StepNumber>
          <StepText>Location</StepText>
        </StepItem>
        
        <StepConnector active={currentStep > 2} />
        
        <StepItem active={currentStep >= 3}>
          <StepNumber>3</StepNumber>
          <StepText>Account</StepText>
        </StepItem>
      </StepIndicator>
      
      <FormContent onSubmit={handleSubmit(onSubmit)}>
        {renderStepContent()}
        
        <FormActions>
          <FormButtonGroup>
            {currentStep > 1 && (
              <FormButton
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={loading}
              >
                Back
              </FormButton>
            )}
            
            {currentStep === 1 && (
              <FormButton
                type="button"
                variant="outline"
                onClick={() => navigate(ROUTES.REGISTER)}
                disabled={loading}
              >
                Cancel
              </FormButton>
            )}
            
            {currentStep < 3 ? (
              <FormButton
                type="button"
                variant="primary"
                onClick={nextStep}
                disabled={loading}
              >
                Next
              </FormButton>
            ) : (
              <FormButton
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Create Account'}
              </FormButton>
            )}
          </FormButtonGroup>
        </FormActions>
      </FormContent>
    </FormContainer>
  );
};

export default BusinessRegistration;