import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../contexts/AuthContext';
import userService from '../../../services/userService';
import AddressForm from '../components/AddressForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.large};
`;

const Section = styled.div`
  padding-bottom: ${props => props.theme.spacing.large};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.small};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
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

const FormError = styled.span`
  display: block;
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.small};
  margin-top: ${props => props.theme.spacing.xs};
`;

const AddressCard = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.medium};
  position: relative;
  
  ${props => props.isDefault && `
    border-color: ${props.theme.colors.primary};
    background-color: ${props.theme.colors.accent};
  `}
`;

const AddressDefault = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.small};
  right: ${props => props.theme.spacing.small};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.small};
`;

const AddressActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.small};
  margin-top: ${props => props.theme.spacing.small};
`;

const EmptyAddresses = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.lightBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.medium};
  margin-top: ${props => props.theme.spacing.large};
`;

const StatusMessage = styled.div`
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

const ProfileTab = ({ profileData }) => {
  const { user, updateUserData } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: user?.customer_profile?.first_name || '',
      lastName: user?.customer_profile?.last_name || '',
      phoneNumber: user?.customer_profile?.phone_number || '',
      whatsappNumber: user?.customer_profile?.whatsapp_number || '',
    }
  });
  
  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoadingAddresses(true);
        const response = await userService.getCustomerAddresses();
        if (response.success) {
          setAddresses(response.data);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoadingAddresses(false);
      }
    };
    
    fetchAddresses();
  }, []);
  
  const onSubmit = async (data) => {
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      // Transform data to match API
      const profileData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        whatsappNumber: data.whatsappNumber || undefined
      };
      
      const response = await userService.updateCustomerProfile(profileData);
      
      if (response.success) {
        setStatus({
          type: 'success',
          message: 'Profile updated successfully!'
        });
        // Update global user state
        await updateUserData();
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Failed to update profile. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddressSubmit = async (addressData) => {
    try {
      setLoading(true);
      
      // Transform data to match API
      const apiAddressData = {
        house: addressData.building || addressData.house,
        street: addressData.street,
        city: addressData.city,
        isDefault: addressData.isDefault
      };
      
      let response;
      
      if (selectedAddress) {
        // Update existing address
        response = await userService.updateCustomerAddress(selectedAddress.id, apiAddressData);
      } else {
        // Add new address
        response = await userService.addCustomerAddress(apiAddressData);
      }
      
      if (response.success) {
        // Refresh addresses
        const addressesResponse = await userService.getCustomerAddresses();
        if (addressesResponse.success) {
          setAddresses(addressesResponse.data);
        }
        
        setStatus({
          type: 'success',
          message: selectedAddress 
            ? 'Address updated successfully!' 
            : 'Address added successfully!'
        });
        
        setShowAddressForm(false);
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error('Error with address:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Failed to save address. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddressEdit = (address) => {
    // Transform API address to form format
    const formAddress = {
      type: address.type || 'Home',
      building: address.house,
      street: address.street,
      city: address.city,
      state: address.state || 'Ontario',
      zipCode: address.zipCode || '',
      isDefault: address.is_default
    };
    
    setSelectedAddress(address);
    setShowAddressForm(true);
  };
  
  const handleAddressDelete = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await userService.deleteCustomerAddress(addressId);
      
      if (response.success) {
        // Refresh addresses
        const addressesResponse = await userService.getCustomerAddresses();
        if (addressesResponse.success) {
          setAddresses(addressesResponse.data);
        }
        
        setStatus({
          type: 'success',
          message: 'Address deleted successfully!'
        });
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Failed to delete address. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const toggleEditMode = () => {
    if (editMode) {
      // Reset form when cancelling edit
      reset({
        firstName: user?.customer_profile?.first_name || '',
        lastName: user?.customer_profile?.last_name || '',
        phoneNumber: user?.customer_profile?.phone_number || '',
        whatsappNumber: user?.customer_profile?.whatsapp_number || '',
      });
    }
    setEditMode(!editMode);
  };
  
  return (
    <Container>
      {status.message && (
        <StatusMessage type={status.type}>
          {status.message}
        </StatusMessage>
      )}
      
      <Section>
        <SectionHeader>
          <Typography variant="h3">Personal Information</Typography>
          <Button 
            variant={editMode ? "outlined" : "primary"} 
            size="small"
            onClick={toggleEditMode}
            disabled={loading}
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </Button>
        </SectionHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormGroup>
              <FormLabel>First Name</FormLabel>
              {editMode ? (
                <>
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
                  {errors.firstName && (
                    <FormError>{errors.firstName.message}</FormError>
                  )}
                </>
              ) : (
                <Typography variant="body1">
                  {user?.customer_profile?.first_name || 'Not provided'}
                </Typography>
              )}
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Last Name</FormLabel>
              {editMode ? (
                <>
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
                  {errors.lastName && (
                    <FormError>{errors.lastName.message}</FormError>
                  )}
                </>
              ) : (
                <Typography variant="body1">
                  {user?.customer_profile?.last_name || 'Not provided'}
                </Typography>
              )}
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <Typography variant="body1">
                {user?.email}
                {user?.is_email_verified 
                  ? ' (Verified)' 
                  : ' (Not Verified)'}
              </Typography>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Phone Number</FormLabel>
              {editMode ? (
                <>
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
                  {errors.phoneNumber && (
                    <FormError>{errors.phoneNumber.message}</FormError>
                  )}
                </>
              ) : (
                <Typography variant="body1">
                  {user?.customer_profile?.phone_number || 'Not provided'}
                </Typography>
              )}
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <FormLabel>WhatsApp Number (Optional)</FormLabel>
            {editMode ? (
              <>
                <FormInput
                  type="tel"
                  {...register('whatsappNumber', {
                    pattern: {
                      value: /^\+?\d{10,15}$/,
                      message: 'Invalid phone number format'
                    }
                  })}
                />
                {errors.whatsappNumber && (
                  <FormError>{errors.whatsappNumber.message}</FormError>
                )}
              </>
            ) : (
              <Typography variant="body1">
                {user?.customer_profile?.whatsapp_number || 'Not provided'}
              </Typography>
            )}
          </FormGroup>
          
          {editMode && (
            <ActionButtons>
              <Button 
                type="submit" 
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </ActionButtons>
          )}
        </form>
      </Section>
      
      <Section>
        <SectionHeader>
          <Typography variant="h3">My Addresses</Typography>
          {!showAddressForm && (
            <Button 
              variant="primary" 
              size="small"
              onClick={() => setShowAddressForm(true)}
              disabled={loading}
            >
              Add New Address
            </Button>
          )}
        </SectionHeader>
        
        {showAddressForm ? (
          <AddressForm 
            addressData={selectedAddress && {
              type: selectedAddress.type || 'Home',
              street: selectedAddress.street,
              building: selectedAddress.house,
              city: selectedAddress.city,
              state: selectedAddress.state || 'Ontario',
              zipCode: selectedAddress.zipCode || '',
              isDefault: selectedAddress.is_default
            }}
            onSubmit={handleAddressSubmit}
            onCancel={() => {
              setShowAddressForm(false);
              setSelectedAddress(null);
            }}
          />
        ) : loadingAddresses ? (
          <Typography variant="body1">Loading addresses...</Typography>
        ) : addresses.length === 0 ? (
          <EmptyAddresses>
            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
              You haven't added any addresses yet.
            </Typography>
            <Button 
              variant="primary" 
              onClick={() => setShowAddressForm(true)}
            >
              Add Your First Address
            </Button>
          </EmptyAddresses>
        ) : (
          addresses.map(address => (
            <AddressCard 
              key={address.id} 
              isDefault={address.is_default}
            >
              {address.is_default && (
                <AddressDefault>Default</AddressDefault>
              )}
              
              <Typography variant="body1" style={{ fontWeight: 500 }}>
                {address.type || 'Home'}
              </Typography>
              
              <Typography variant="body2">
                {address.house}, {address.street}
              </Typography>
              
              <Typography variant="body2">
                {address.city}
                {address.state && `, ${address.state}`}
                {address.zipCode && ` ${address.zipCode}`}
              </Typography>
              
              <AddressActions>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => handleAddressEdit(address)}
                  disabled={loading}
                >
                  Edit
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="secondary"
                  size="small"
                  onClick={() => handleAddressDelete(address.id)}
                  disabled={loading || address.is_default}
                >
                  Delete
                </Button>
                
                {!address.is_default && (
                  <Button 
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleAddressEdit({ ...address, is_default: true })}
                    disabled={loading}
                  >
                    Set as Default
                  </Button>
                )}
              </AddressActions>
            </AddressCard>
          ))
        )}
      </Section>
    </Container>
  );
};

export default ProfileTab;