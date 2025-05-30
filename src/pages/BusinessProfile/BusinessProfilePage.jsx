// Updated BusinessProfilePage.jsx with proper services handling

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileHeader from './components/ProfileHeader';
import MetricsOverview from './components/MetricsOverview';
import ServicesSection from './components/ServicesSection';
import WorkHistorySection from './components/WorkHistorySection';
import ProfileEditForm from './components/ProfileEditForm';
import { LoadingSpinner, ApiError } from '../../components/common';
import { useAuth } from '../../contexts/AuthContext';
import businessService from '../../services/businessService';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.medium};
  }
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  margin-bottom: ${props => props.theme.spacing.large};
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightBackground};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.lightGrey};
    border-radius: 4px;
  }
`;

const Tab = styled.button`
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  border: none;
  background: none;
  font-weight: ${props => props.isActive ? props.theme.fontWeights.semiBold : props.theme.fontWeights.regular};
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.grey};
  border-bottom: 2px solid ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  transition: all 0.2s ease;
  white-space: nowrap;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const BusinessProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle tab from URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    
    if (tabParam && ['services', 'orders', 'metrics'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);
  
  // Fetch services when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      if (activeTab === 'services' && !editMode) {
        try {
          setLoading(true);
          
          // First attempt with API
          try {
            const response = await businessService.getBusinessServices();
            
            if (response && response.success) {
              // Process the services to ensure they have all required properties
              const processedServices = response.data.map(service => ({
                id: service.id || `temp-${Math.random().toString(36).substr(2, 9)}`,
                name: service.name || 'Unnamed Service',
                category: service.category || 'Uncategorized',
                price: parseFloat(service.price) || 0,
                description: service.description || 'No description available',
                // Add other properties with defaults
                rating: service.rating || 0,
                reviewCount: service.reviewCount || 0,
                ...service
              }));
              
              setServices(processedServices);
            }
          } catch (apiError) {
            console.error('API Error fetching services:', apiError);
            // Fall back to empty array if API fails
            setServices([]);
          }
          
        } catch (fetchError) {
          console.error('Error in fetch services effect:', fetchError);
          setError(fetchError);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchServices();
  }, [activeTab, editMode]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Update URL with the new tab
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', tab);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    });
  };
  
  const handleEditClick = () => {
    setEditMode(true);
  };
  
  const handleCancelEdit = () => {
    setEditMode(false);
  };
  
  const handleSaveProfile = () => {
    setEditMode(false);
  };
  
  const handleAddService = async (newService) => {
    try {
      // Use a try/catch for the API call
      try {
        const response = await businessService.addBusinessService({
          serviceTypeId: newService.serviceTypeId
        });
        
        if (response && response.success) {
          // Try to refresh services list
          const servicesResponse = await businessService.getBusinessServices();
          if (servicesResponse && servicesResponse.success) {
            setServices(servicesResponse.data);
          }
        }
      } catch (apiError) {
        console.error('API Error adding service:', apiError);
        // Add the service locally as a fallback
        const newId = `temp-${Math.random().toString(36).substr(2, 9)}`;
        setServices(prev => [...prev, { ...newService, id: newId }]);
      }
    } catch (error) {
      console.error('Error adding service:', error);
      setError(error);
    }
  };
  
  const handleDeleteService = async (serviceId) => {
    try {
      // Use a try/catch for the API call
      try {
        const response = await businessService.deleteBusinessService(serviceId);
        
        if (response && response.success) {
          // Try to refresh services list
          const servicesResponse = await businessService.getBusinessServices();
          if (servicesResponse && servicesResponse.success) {
            setServices(servicesResponse.data);
          }
        }
      } catch (apiError) {
        console.error('API Error deleting service:', apiError);
        // Delete the service locally as a fallback
        setServices(prev => prev.filter(service => service.id !== serviceId));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setError(error);
    }
  };
  
  // Create dummy metrics data (will be replaced with real data when available)
  const dummyMetrics = {
    totalEarnings: 0,
    totalJobsCompleted: 0,
    totalJobsInProgress: 0,
    averageRating: 0
  };
  
  // Create dummy work history data (will be replaced with real data when available)
  const dummyWorkHistory = [];
  
  // Determine what to show based on edit mode
  if (editMode) {
    return (
      <PageContainer>
        <ProfileEditForm onCancel={handleCancelEdit} onSave={handleSaveProfile} />
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <ProfileHeader onEditClick={handleEditClick} />
      
      <TabContainer>
        <Tab 
          isActive={activeTab === 'services'} 
          onClick={() => handleTabChange('services')}
        >
          My Services
        </Tab>
        <Tab 
          isActive={activeTab === 'orders'} 
          onClick={() => handleTabChange('orders')}
        >
          Orders
        </Tab>
        <Tab 
          isActive={activeTab === 'metrics'} 
          onClick={() => handleTabChange('metrics')}
        >
          Metrics
        </Tab>
      </TabContainer>
      
      {loading ? (
        <LoadingSpinner label="Loading..." fullPage />
      ) : error ? (
        <ApiError 
          title="Failed to load data"
          message="There was a problem loading your business data."
          error={error}
          onRetry={() => window.location.reload()}
        />
      ) : (
        <>
          {activeTab === 'services' && (
            <ServicesSection 
              services={services || []} // Ensure we always pass an array
              onAddService={handleAddService}
              onDeleteService={handleDeleteService}
            />
          )}
          
          {activeTab === 'orders' && (
            <WorkHistorySection workHistory={dummyWorkHistory} />
          )}
          
          {activeTab === 'metrics' && (
            <MetricsOverview metrics={dummyMetrics} />
          )}
        </>
      )}
    </PageContainer>
  );
};

export default BusinessProfilePage;