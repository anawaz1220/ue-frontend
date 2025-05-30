// src/pages/BusinessProfile/components/MetricsOverview.jsx

import React from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.xlarge};
`;

const MetricCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.large};
  box-shadow: ${props => props.theme.shadows.small};
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const MetricIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.medium};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const MetricValue = styled(Typography)`
  font-size: ${props => props.theme.fontSizes.xxxlarge};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin: ${props => props.theme.spacing.small} 0;
  color: ${props => props.theme.colors.primary};
`;

const MetricLabel = styled(Typography)`
  color: ${props => props.theme.colors.grey};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const formatCurrency = (amount) => {
  return amount.toLocaleString('en-CA', { 
    style: 'currency', 
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const MetricsOverview = ({ metrics }) => {
  const metricData = [
    {
      id: 'total_earnings',
      label: 'Total Earnings',
      value: formatCurrency(metrics.totalEarnings),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
    },
    {
      id: 'total_jobs',
      label: 'Total Jobs Completed',
      value: metrics.totalJobsCompleted,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ),
    },
    {
      id: 'current_jobs',
      label: 'Jobs In Progress',
      value: metrics.totalJobsInProgress,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
    {
      id: 'average_rating',
      label: 'Average Rating',
      value: metrics.averageRating.toFixed(1),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
  ];

  return (
    <MetricsContainer>
      {metricData.map((metric) => (
        <MetricCard key={metric.id}>
          <MetricIcon>{metric.icon}</MetricIcon>
          <MetricValue variant="h2">{metric.value}</MetricValue>
          <MetricLabel variant="h3">{metric.label}</MetricLabel>
        </MetricCard>
      ))}
    </MetricsContainer>
  );
};

export default MetricsOverview;