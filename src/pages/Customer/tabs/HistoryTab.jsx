// src/pages/Customer/tabs/HistoryTab.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import HistoryCard from '../components/HistoryCard';

const HistoryContainer = styled.div``;

const HistoryHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.large};
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.large};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  min-width: 150px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  background-color: ${props => props.theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xlarge} 0;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.lightGrey};
`;

const EmptyText = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.grey};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.small};
  margin-top: ${props => props.theme.spacing.xlarge};
`;

const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.lightGrey};
  background-color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.isActive ? props.theme.colors.white : props.theme.colors.grey};
  font-weight: ${props => props.isActive ? props.theme.fontWeights.medium : props.theme.fontWeights.regular};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.accent};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HistoryTab = ({ historyData }) => {
  const [status, setStatus] = useState('all');
  const [serviceName, setServiceName] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  
  // Apply filters and update filteredHistory
  useEffect(() => {
    let filtered = [...historyData];
    
    // Filter by status
    if (status !== 'all') {
      filtered = filtered.filter(item => item.status === status);
    }
    
    // Filter by service name
    if (serviceName.trim() !== '') {
      filtered = filtered.filter(item => 
        item.serviceName.toLowerCase().includes(serviceName.toLowerCase())
      );
    }
    
    // Filter by date range
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filtered = filtered.filter(item => new Date(item.date) >= fromDate);
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      filtered = filtered.filter(item => new Date(item.date) <= toDate);
    }
    
    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setFilteredHistory(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [historyData, status, serviceName, dateFrom, dateTo]);
  
  // Get current page items
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredHistory.slice(startIndex, endIndex);
  };
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Generate pagination buttons
  const renderPagination = () => {
    const buttons = [];
    
    // Previous button
    buttons.push(
      <PageButton 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </PageButton>
    );
    
    // Page buttons
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton 
          key={i} 
          isActive={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }
    
    // Next button
    buttons.push(
      <PageButton 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PageButton>
    );
    
    return buttons;
  };
  
  if (!historyData || historyData.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </EmptyIcon>
        <EmptyText variant="h3">No Service History</EmptyText>
        <Typography variant="body1">
          You haven't used any services yet.
        </Typography>
      </EmptyState>
    );
  }
  
  return (
    <HistoryContainer>
      <HistoryHeader>
        <Typography variant="h2">Service History</Typography>
        <Typography variant="body1" style={{ color: '#666', marginTop: '8px' }}>
          View and filter your past services
        </Typography>
      </HistoryHeader>
      
      <FilterSection>
        <FilterGroup>
          <FilterLabel htmlFor="status">Status</FilterLabel>
          <Select 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="serviceName">Service Name</FilterLabel>
          <Input 
            type="text" 
            id="serviceName" 
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Search services"
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="dateFrom">From Date</FilterLabel>
          <Input 
            type="date" 
            id="dateFrom" 
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="dateTo">To Date</FilterLabel>
          <Input 
            type="date" 
            id="dateTo" 
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </FilterGroup>
      </FilterSection>
      
      {filteredHistory.length === 0 ? (
        <EmptyState>
          <EmptyText variant="h3">No results found</EmptyText>
          <Typography variant="body1">
            Try adjusting your filters to see more services
          </Typography>
        </EmptyState>
      ) : (
        <>
          <HistoryList>
            {getCurrentItems().map(service => (
              <HistoryCard 
                key={service.id} 
                service={service} 
              />
            ))}
          </HistoryList>
          
          <PaginationContainer>
            {renderPagination()}
          </PaginationContainer>
        </>
      )}
    </HistoryContainer>
  );
};

export default HistoryTab;