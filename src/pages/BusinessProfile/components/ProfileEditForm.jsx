import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../contexts/AuthContext';
import businessService from '../../../services/businessService';

const FormContainer = styled.div`
  padding: ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  margin-bottom: ${props => props.theme.spacing.xlarge};
`;

const FormTitle = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.large};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.large};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'auto'};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`;

const SectionTitle = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.small};
  padding-bottom: ${props => props.theme.spacing.xs};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.small};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FormError = styled.span`
  display: block;
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.small};
  margin-top: ${props => props.theme.spacing.xs};
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.medium};
  margin-top: ${props => props.theme.spacing.large};
`;

const StatusMessage = styled.div`
  grid-column: 1 / -1;
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.medium};
  
  ${props => props.type === 'success' && `
    background-color: rgba(76, 175, 80, 0.1);
    color: ${props.theme.colors.success};
    border: 1px solid ${props.theme.colors.success};
  `}
  
  ${props => props.type === 'error' && `
    background-color: rgba(244, 67, 54, 0.1);
    color: ${props.theme.colors.error};
    border: 1px solid ${props.theme.colors.error};
  `}
`;

const ProfileEditForm = ({ onCancel, onSave }) => {
  const { user, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const business = user?.business_profile || {};
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      businessName: business.business_name || '',
      phoneNumber: business.phone_number || '',
      whatsappNumber: business.whatsapp_number || '',
      instagramId: business.instagram_id || '',
      ownerName: business.owner_name || '',
      ownerPhone: business.owner_phone || '',
      building: business.building || '',
      street: business.street || '',
      city: business.city || 'Sudbury',
      description: business.description || '',
      // Not handling hours yet, will be added in a future implementation
    }
  });
  
  const onSubmit = async (data) => {
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      // Transform data to match API requirements
      const profileData = {
        businessName: data.businessName,
        phoneNumber: data.phoneNumber,
        whatsappNumber: data.whatsappNumber || undefined,
        instagramId: data.instagramId || undefined,
        ownerName: data.ownerName,
        ownerPhone: data.ownerPhone,
        building: data.building,
        street: data.street,
        city: data.city,
        description: data.description || undefined,
        // Include latitude/longitude if available
        ...(business.latitude && { latitude: business.latitude }),
        ...(business.longitude && { longitude: business.longitude }),
      };
      
      const response = await businessService.updateBusinessProfile(profileData);
      
      if (response.success) {
        setStatus({
          type: 'success',
          message: 'Business profile updated successfully!'
        });
        
        // Update global user state
        await updateUserData();
        
        // Notify parent component if needed
        if (onSave) {
          onSave(response.data);
        }
      }
    } catch (error) {
      console.error('Error updating business profile:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Failed to update profile. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <FormContainer>
      <FormTitle variant="h2">Edit Business Profile</FormTitle>
      
      {status.message && (
        <StatusMessage type={status.type}>
          {status.message}
        </StatusMessage>
      )}
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <SectionTitle variant="h3">Business Information</SectionTitle>
          
          <FormGroup>
            <FormLabel>Business Name</FormLabel>
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
            {errors.businessName && <FormError>{errors.businessName.message}</FormError>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Business Phone Number</FormLabel>
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
            {errors.phoneNumber && <FormError>{errors.phoneNumber.message}</FormError>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>WhatsApp Number (Optional)</FormLabel>
            <FormInput
              type="tel"
              {...register('whatsappNumber', {
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: 'Invalid phone number format'
                }
              })}
            />
            {errors.whatsappNumber && <FormError>{errors.whatsappNumber.message}</FormError>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Instagram Username (Optional)</FormLabel>
            <FormInput
              type="text"
              {...register('instagramId')}
            />
            {errors.instagramId && <FormError>{errors.instagramId.message}</FormError>}
          </FormGroup>
        </FormSection>
        
        <FormSection>
          <SectionTitle variant="h3">Owner Information</SectionTitle>
          
          <FormGroup>
            <FormLabel>Owner Name</FormLabel>
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
            {errors.ownerName && <FormError>{errors.ownerName.message}</FormError>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Owner Phone Number</FormLabel>
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
            {errors.ownerPhone && <FormError>{errors.ownerPhone.message}</FormError>}
          </FormGroup>
        </FormSection>
        
        <FormSection fullWidth>
          <SectionTitle variant="h3">Business Location</SectionTitle>
          
          <FormGroup>
            <FormLabel>Building/House Number</FormLabel>
            <FormInput
              type="text"
              {...register('building', {
                required: 'Building/house number is required'
              })}
            />
            {errors.building && <FormError>{errors.building.message}</FormError>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Street Name</FormLabel>
            <FormInput
              type="text"
              {...register('street', {
                required: 'Street name is required'
              })}
            />
            {errors.street && <FormError>{errors.street.message}</FormError>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>City</FormLabel>
            <FormInput
              type="text"
              {...register('city', {
                required: 'City is required'
              })}
            />
            {errors.city && <FormError>{errors.city.message}</FormError>}
          </FormGroup>
        </FormSection>
        
        <FormSection fullWidth>
          <SectionTitle variant="h3">Business Description</SectionTitle>
          
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextarea
              {...register('description')}
              placeholder="Tell customers about your business, specialties, and experience..."
            />
            {errors.description && <FormError>{errors.description.message}</FormError>}
          </FormGroup>
        </FormSection>
        
        <ButtonGroup>
          <Button 
            type="button" 
            variant="outlined" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default ProfileEditForm;