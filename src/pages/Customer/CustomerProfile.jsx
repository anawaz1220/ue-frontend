// src/pages/Customer/CustomerProfile.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { customerData } from '../../data/customerData';
import ProfileTab from './tabs/ProfileTab';
import BookingsTab from './tabs/BookingsTab';
import HistoryTab from './tabs/HistoryTab';
import WalletTab from './tabs/WalletTab';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.medium};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.large};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.img`
  height: 40px;
  margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.spacing.medium};
  }
`;

const WelcomeText = styled.div`
  margin-right: ${props => props.theme.spacing.medium};
  
  h2 {
    margin: 0;
    font-weight: ${props => props.theme.fontWeights.semiBold};
  }
  
  p {
    margin: ${props => props.theme.spacing.xs} 0 0;
    color: ${props => props.theme.colors.grey};
  }
`;

const TabsContainer = styled.div`
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
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TabContent = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.large};
  box-shadow: ${props => props.theme.shadows.small};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.medium};
  }
`;

const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileTab profileData={customerData.profile} />;
      case 'bookings':
        return <BookingsTab bookingsData={customerData.currentBookings} />;
      case 'history':
        return <HistoryTab historyData={customerData.serviceHistory} />;
      case 'wallet':
        return <WalletTab walletData={customerData.wallet} />;
      default:
        return <ProfileTab profileData={customerData.profile} />;
    }
  };
  
  return (
    <PageContainer>
      <Header>
        <Logo src="/images/ue.png" alt="UrbanEase" />
        <WelcomeText>
          <h2>Welcome, {customerData.profile.name.split(' ')[0]}!</h2>
          <p>Manage your profile and bookings</p>
        </WelcomeText>
      </Header>
      
      <TabsContainer>
        <Tab 
          isActive={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </Tab>
        <Tab 
          isActive={activeTab === 'bookings'} 
          onClick={() => setActiveTab('bookings')}
        >
          Current Bookings
        </Tab>
        <Tab 
          isActive={activeTab === 'history'} 
          onClick={() => setActiveTab('history')}
        >
          Service History
        </Tab>
        <Tab 
          isActive={activeTab === 'wallet'} 
          onClick={() => setActiveTab('wallet')}
        >
          Wallet
        </Tab>
      </TabsContainer>
      
      <TabContent>
        {renderTabContent()}
      </TabContent>
    </PageContainer>
  );
};

export default CustomerProfile;