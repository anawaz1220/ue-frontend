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
} from './CustomerRegistration.styles';
import { useAuth } from '../../../contexts/AuthContext';
import ROUTES from '../../../constants/routes';

const CustomerRegistration = () => {
  const { registerCustomer } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  });
  
  const watchPassword = watch('password');
  
  const onSubmit = async (data) => {
    setLoading(true);
    setRegistrationError('');
    
    try {
      // Transform form data to match API requirements
      const customerData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber
      };
      
      await registerCustomer(customerData);
      navigate(ROUTES.REGISTER_SUCCESS);
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>Create Your Customer Account</FormTitle>
        <FormSubtitle>
          Find and book beauty services from the comfort of your home
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
      
      <FormContent onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <FormGroup>
            <FormLabel>First Name</FormLabel>
            <FormInputWrapper>
              <FormInput
                type="text"
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters'
                  }
                })}
              />
            </FormInputWrapper>
            {errors.firstName && <FormError>{errors.firstName.message}</FormError>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Last Name</FormLabel>
            <FormInputWrapper>
              <FormInput
                type="text"
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters'
                  }
                })}
              />
            </FormInputWrapper>
            {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
          </FormGroup>
        </FormSection>
        
        <FormSection>
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
          
          <FormGroup>
            <FormLabel>Phone Number</FormLabel>
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
        </FormSection>
        
        <FormDivider />
        
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
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
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
        
        <FormActions>
          <FormButtonGroup>
            <FormButton
              type="button"
              variant="outline"
              onClick={() => navigate(ROUTES.REGISTER)}
              disabled={loading}
            >
              Back
            </FormButton>
            
            <FormButton
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Create Account'}
            </FormButton>
          </FormButtonGroup>
        </FormActions>
      </FormContent>
    </FormContainer>
  );
};

export default CustomerRegistration;