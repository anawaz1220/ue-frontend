// src/pages/BusinessProfile/components/ServiceForm.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';

const FormContainer = styled.div`
  padding: ${props => props.theme.spacing.large};
  border-top: 1px solid ${props => props.theme.colors.lightGrey};
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

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const FullWidthFormGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

const InputLabel = styled.label`
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
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
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

const DurationContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
`;

const DurationField = styled.div`
  flex: 1;
`;

const ListInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.small};
`;

const ListItemContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.small};
`;

const ListItemInput = styled(Input)`
  flex: 1;
`;

const ItemRemoveButton = styled.button`
  background: ${props => props.theme.colors.error};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #d32f2f;
  }
`;

const AddItemButton = styled.button`
  background: none;
  border: 1px dashed ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.small};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.grey};
  margin-top: ${props => props.theme.spacing.small};
  
  &:hover {
    background: ${props => props.theme.colors.lightBackground};
  }
  
  svg {
    margin-right: ${props => props.theme.spacing.small};
  }
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.medium};
  margin-top: ${props => props.theme.spacing.large};
`;

const serviceCategories = [
  "Service packages",
  "Waxing services",
  "Korean facial services",
  "Facial services",
  "Ayurvedic facial services",
  "Cleanup services",
  "Pedicure and manicure services",
  "Hair treatments",
  "Threading and face waxing"
];

const ServiceForm = ({ service, onClose, onSubmit }) => {
  const isEditMode = !!service;
  
  const initialFormData = {
    name: '',
    category: serviceCategories[0],
    price: '',
    duration: { hours: 0, minutes: 30 },
    description: '',
    itemsNeededByCustomer: [''],
    itemsBusinessWillBring: [''],
    serviceProcedure: [''],
    isActive: true
  };
  
  const [formData, setFormData] = useState(initialFormData);
  
  useEffect(() => {
    if (service) {
      setFormData({
        ...service,
        price: service.price.toString()
      });
    }
  }, [service]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      duration: {
        ...formData.duration,
        [name]: parseInt(value, 10) || 0
      }
    });
  };
  
  const handleListItemChange = (listName, index, value) => {
    const updatedList = [...formData[listName]];
    updatedList[index] = value;
    setFormData({
      ...formData,
      [listName]: updatedList
    });
  };
  
  const handleAddListItem = (listName) => {
    setFormData({
      ...formData,
      [listName]: [...formData[listName], '']
    });
  };
  
  const handleRemoveListItem = (listName, index) => {
    const updatedList = [...formData[listName]];
    updatedList.splice(index, 1);
    setFormData({
      ...formData,
      [listName]: updatedList
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Filter out empty list items
    const cleanedData = {
      ...formData,
      price: parseFloat(formData.price),
      itemsNeededByCustomer: formData.itemsNeededByCustomer.filter(item => item.trim() !== ''),
      itemsBusinessWillBring: formData.itemsBusinessWillBring.filter(item => item.trim() !== ''),
      serviceProcedure: formData.serviceProcedure.filter(item => item.trim() !== ''),
      // Add default values for a real application
      rating: service?.rating || 0,
      reviewCount: service?.reviewCount || 0
    };
    
    onSubmit(cleanedData);
  };
  
  return (
    <FormContainer>
      <FormTitle variant="h2">
        {isEditMode ? 'Edit Service' : 'Add New Service'}
      </FormTitle>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputLabel htmlFor="name">Service Name*</InputLabel>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <InputLabel htmlFor="category">Category*</InputLabel>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            {serviceCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <InputLabel htmlFor="price">Price (CAD)*</InputLabel>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <InputLabel>Duration*</InputLabel>
          <DurationContainer>
            <DurationField>
              <Select
                name="hours"
                value={formData.duration.hours}
                onChange={handleDurationChange}
              >
                {[...Array(24).keys()].map(hour => (
                  <option key={hour} value={hour}>
                    {hour} {hour === 1 ? 'hour' : 'hours'}
                  </option>
                ))}
              </Select>
            </DurationField>
            
            <DurationField>
              <Select
                name="minutes"
                value={formData.duration.minutes}
                onChange={handleDurationChange}
              >
                {[0, 15, 30, 45].map(minute => (
                  <option key={minute} value={minute}>
                    {minute} {minute === 1 ? 'minute' : 'minutes'}
                  </option>
                ))}
              </Select>
            </DurationField>
          </DurationContainer>
        </FormGroup>
        
        <FullWidthFormGroup>
          <InputLabel htmlFor="description">Description*</InputLabel>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </FullWidthFormGroup>
        
        <FullWidthFormGroup>
          <InputLabel>Items Needed From Customer</InputLabel>
          <ListInput>
            {formData.itemsNeededByCustomer.map((item, index) => (
              <ListItemContainer key={index}>
                <ListItemInput
                  type="text"
                  value={item}
                  onChange={(e) => handleListItemChange('itemsNeededByCustomer', index, e.target.value)}
                />
                {formData.itemsNeededByCustomer.length > 1 && (
                  <ItemRemoveButton 
                    type="button"
                    onClick={() => handleRemoveListItem('itemsNeededByCustomer', index)}
                  >
                    ×
                  </ItemRemoveButton>
                )}
              </ListItemContainer>
            ))}
            
            <AddItemButton 
              type="button"
              onClick={() => handleAddListItem('itemsNeededByCustomer')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Item
            </AddItemButton>
          </ListInput>
        </FullWidthFormGroup>
        
        <FullWidthFormGroup>
          <InputLabel>Items Business Will Bring</InputLabel>
          <ListInput>
            {formData.itemsBusinessWillBring.map((item, index) => (
              <ListItemContainer key={index}>
                <ListItemInput
                  type="text"
                  value={item}
                  onChange={(e) => handleListItemChange('itemsBusinessWillBring', index, e.target.value)}
                />
                {formData.itemsBusinessWillBring.length > 1 && (
                  <ItemRemoveButton 
                    type="button"
                    onClick={() => handleRemoveListItem('itemsBusinessWillBring', index)}
                  >
                    ×
                  </ItemRemoveButton>
                )}
              </ListItemContainer>
            ))}
            
            <AddItemButton 
              type="button"
              onClick={() => handleAddListItem('itemsBusinessWillBring')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Item
            </AddItemButton>
          </ListInput>
        </FullWidthFormGroup>
        
        <FullWidthFormGroup>
          <InputLabel>Service Procedure Steps</InputLabel>
          <ListInput>
            {formData.serviceProcedure.map((step, index) => (
              <ListItemContainer key={index}>
                <ListItemInput
                  type="text"
                  value={step}
                  onChange={(e) => handleListItemChange('serviceProcedure', index, e.target.value)}
                />
                {formData.serviceProcedure.length > 1 && (
                  <ItemRemoveButton 
                    type="button"
                    onClick={() => handleRemoveListItem('serviceProcedure', index)}
                  >
                    ×
                  </ItemRemoveButton>
                )}
              </ListItemContainer>
            ))}
            
            <AddItemButton 
              type="button"
              onClick={() => handleAddListItem('serviceProcedure')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Step
            </AddItemButton>
          </ListInput>
        </FullWidthFormGroup>
        
        <ButtonGroup>
          <Button 
            type="button" 
            variant="outlined" 
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {isEditMode ? 'Update Service' : 'Add Service'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default ServiceForm;