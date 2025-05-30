// src/pages/Admin/AdminDashboard.jsx - CREATE THIS FILE
import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
  min-height: 80vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xlarge};
  padding-bottom: ${props => props.theme.spacing.medium};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

const WelcomeSection = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    color: ${props => props.theme.colors.grey};
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.large};
  margin-bottom: ${props => props.theme.spacing.xlarge};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  border-left: 4px solid ${props => props.color || props.theme.colors.primary};
  
  h3 {
    font-size: 2rem;
    margin-bottom: ${props => props.theme.spacing.small};
    color: ${props => props.color || props.theme.colors.primary};
  }
  
  p {
    color: ${props => props.theme.colors.grey};
    margin: 0;
  }
`;

const ComingSoonSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: ${props => props.theme.spacing.xlarge};
  border-radius: ${props => props.theme.borderRadius.medium};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xlarge};
  
  h2 {
    font-size: 2rem;
    margin-bottom: ${props => props.theme.spacing.medium};
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: ${props => props.theme.spacing.large};
  }
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.medium};
  margin-top: ${props => props.theme.spacing.large};
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  backdrop-filter: blur(10px);
  
  h4 {
    margin-bottom: ${props => props.theme.spacing.small};
    display: flex;
    align-items: center;
    
    span {
      font-size: 1.5rem;
      margin-right: ${props => props.theme.spacing.small};
    }
  }
  
  p {
    opacity: 0.8;
    margin: 0;
  }
`;

const QuickActions = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  
  h3 {
    margin-bottom: ${props => props.theme.spacing.medium};
    color: ${props => props.theme.colors.primary};
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.medium};
`;

const ActionCard = styled.div`
  padding: ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    border-color: ${props => props.theme.colors.primary};
  }
  
  .icon {
    font-size: 2rem;
    margin-bottom: ${props => props.theme.spacing.small};
  }
  
  h4 {
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  p {
    color: ${props => props.theme.colors.grey};
    font-size: 0.9rem;
    margin: 0;
  }
`;

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <DashboardContainer>
      <Header>
        <WelcomeSection>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.email}! Manage your Urban Ease platform.</p>
        </WelcomeSection>
        
        <button 
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </Header>

      <StatsGrid>
        <StatCard color="#4CAF50">
          <h3>12</h3>
          <p>Total Businesses</p>
        </StatCard>
        
        <StatCard color="#2196F3">
          <h3>48</h3>
          <p>Total Customers</p>
        </StatCard>
        
        <StatCard color="#FF9800">
          <h3>31</h3>
          <p>Service Types</p>
        </StatCard>
        
        <StatCard color="#9C27B0">
          <h3>156</h3>
          <p>Total Bookings</p>
        </StatCard>
      </StatsGrid>

      <ComingSoonSection>
        <h2>🚀 Admin Features Coming Soon!</h2>
        <p>We're building powerful tools to help you manage the Urban Ease platform effectively.</p>
        
        <FeatureList>
          <FeatureCard>
            <h4><span>👥</span> User Management</h4>
            <p>View, edit, and manage customer and business accounts</p>
          </FeatureCard>
          
          <FeatureCard>
            <h4><span>📊</span> Analytics Dashboard</h4>
            <p>Detailed insights into platform usage and performance</p>
          </FeatureCard>
          
          <FeatureCard>
            <h4><span>🛠️</span> Service Type Manager</h4>
            <p>Add, edit, and organize service categories</p>
          </FeatureCard>
          
          <FeatureCard>
            <h4><span>💰</span> Financial Reports</h4>
            <p>Revenue tracking and commission management</p>
          </FeatureCard>
          
          <FeatureCard>
            <h4><span>🔧</span> System Settings</h4>
            <p>Configure platform settings and preferences</p>
          </FeatureCard>
          
          <FeatureCard>
            <h4><span>📞</span> Support Center</h4>
            <p>Handle customer support tickets and inquiries</p>
          </FeatureCard>
        </FeatureList>
      </ComingSoonSection>

      <QuickActions>
        <h3>Quick Actions (Coming Soon)</h3>
        <ActionGrid>
          <ActionCard>
            <div className="icon">👤</div>
            <h4>Add Admin User</h4>
            <p>Create new admin accounts</p>
          </ActionCard>
          
          <ActionCard>
            <div className="icon">🏢</div>
            <h4>Review Businesses</h4>
            <p>Approve pending business registrations</p>
          </ActionCard>
          
          <ActionCard>
            <div className="icon">📧</div>
            <h4>Send Notifications</h4>
            <p>Broadcast messages to users</p>
          </ActionCard>
          
          <ActionCard>
            <div className="icon">⚙️</div>
            <h4>System Health</h4>
            <p>Monitor platform performance</p>
          </ActionCard>
          
          <ActionCard>
            <div className="icon">📈</div>
            <h4>Generate Reports</h4>
            <p>Export platform analytics</p>
          </ActionCard>
          
          <ActionCard>
            <div className="icon">🔒</div>
            <h4>Security Settings</h4>
            <p>Manage platform security</p>
          </ActionCard>
        </ActionGrid>
      </QuickActions>
    </DashboardContainer>
  );
};

export default AdminDashboard;