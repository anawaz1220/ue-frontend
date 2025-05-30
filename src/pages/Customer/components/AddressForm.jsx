// src/pages/Customer/components/AddressForm.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';

const FormContainer = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.large};
  margin-bottom: ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.white};
`;

const FormTitle = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.small};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const Input = styled.input`
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

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  background-color: ${props => props.theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.medium};
  margin-top: ${props => props.theme.spacing.large};
`;

const AddressForm = ({ addressData, onSubmit, onCancel }) => {
  const initialFormState = {
    type: 'Home',
    street: '',
    city: 'Sudbury', // Default city
    state: 'Ontario', // Default state
    zipCode: '',
    isDefault: false
  };
  
  const [formData, setFormData] = useState(initialFormState);
  
  useEffect(() => {
    if (addressData) {
      setFormData(addressData);
    }
  }, [addressData]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <FormContainer>
      <FormTitle variant="h3">
        {addressData ? 'Edit Address' : 'Add New Address'}
      </FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="type">Address Type</Label>
            <Select 
              id="type" 
              name="type" 
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </Select>
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <Label htmlFor="street">Street Address</Label>
          <Input 
            type="text" 
            id="street" 
            name="street" 
            value={formData.street}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input 
              type="text" 
              id="city" 
              name="city" 
              value={formData.city}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="state">Province/State</Label>
            <Input 
              type="text" 
              id="state" 
              name="state" 
              value={formData.state}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="zipCode">Postal/ZIP Code</Label>
            <Input 
              type="text" 
              id="zipCode" 
              name="zipCode" 
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              id="isDefault" 
              name="isDefault" 
              checked={formData.isDefault}
              onChange={handleChange}
              style={{ marginRight: '8px' }}
            />
            <Label htmlFor="isDefault" style={{ display: 'inline', marginBottom: 0 }}>
              Set as default address
            </Label>
          </FormGroup>
        </FormRow>
        
        <ActionButtons>
          <Button 
            type="button" 
            variant="outlined" 
            color="primary" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="filled" 
            color="primary"
          >
            {addressData ? 'Update Address' : 'Save Address'}
          </Button>
        </ActionButtons>
      </form>
    </FormContainer>
  );
};

export default AddressForm;