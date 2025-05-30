// src/pages/BusinessProfile/components/WorkHistorySection.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import WorkHistoryCard from './WorkHistoryCard';

const SectionContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xlarge};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: ${props => props.theme.spacing.large};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

const FilterSection = styled.div`
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.medium};
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const FilterLabel = styled(Typography)`
  margin-right: ${props => props.theme.spacing.small};
  white-space: nowrap;
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex: 1;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const DateRangePicker = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.small};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const DateInput = styled.input`
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex: 1;
  }
`;

const WorkHistoryContent = styled.div`
  padding: ${props => props.theme.spacing.large};
`;

const WorkHistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.large};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${props => props.theme.spacing.medium};
  border-top: 1px solid ${props => props.theme.colors.lightGrey};
`;

const PageInfo = styled(Typography)`
  color: ${props => props.theme.colors.grey};
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.small};
`;

const PaginationButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.lightGrey
  };
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => props.active 
    ? props.theme.colors.primary 
    : 'transparent'
  };
  color: ${props => props.active 
    ? props.theme.colors.white 
    : props.disabled 
      ? props.theme.colors.lightGrey 
      : props.theme.colors.grey
  };
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    background: ${props => props.active 
      ? props.theme.colors.primary 
      : props.theme.colors.accent
    };
    border-color: ${props => props.active 
      ? props.theme.colors.primary 
      : props.theme.colors.grey
    };
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const EmptyStateMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xlarge};
  text-align: center;
`;

const WorkHistorySection = ({ workHistory }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredHistory, setFilteredHistory] = useState(workHistory);
  const [displayedHistory, setDisplayedHistory] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    service: 'all',
    dateFrom: '',
    dateTo: ''
  });
  
  // Extract unique service names for the filter dropdown
  const serviceOptions = [
    { value: 'all', label: 'All Services' },
    ...Array.from(new Set(workHistory.map(job => job.serviceName)))
      .map(serviceName => ({
        value: serviceName,
        label: serviceName
      }))
  ];
  
  // Apply filters to work history
  useEffect(() => {
    let result = [...workHistory];
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(job => job.status === filters.status);
    }
    
    // Filter by service
    if (filters.service !== 'all') {
      result = result.filter(job => job.serviceName === filters.service);
    }
    
    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter(job => new Date(job.date) >= fromDate);
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59); // Include the entire day
      result = result.filter(job => new Date(job.date) <= toDate);
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setFilteredHistory(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [workHistory, filters]);
  
  // Calculate pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedHistory(filteredHistory.slice(startIndex, endIndex));
  }, [filteredHistory, currentPage]);
  
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const renderPaginationButtons = () => {
    const buttons = [];
    
    // Previous button
    buttons.push(
      <PaginationButton 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </PaginationButton>
    );
    
    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
      // Show limited number of pages for better UX
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        buttons.push(
          <PaginationButton 
            key={i} 
            active={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationButton>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) || 
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        // Add ellipsis
        buttons.push(
          <PaginationButton key={`ellipsis-${i}`} disabled>
            ...
          </PaginationButton>
        );
      }
    }
    
    // Next button
    buttons.push(
      <PaginationButton 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </PaginationButton>
    );
    
    return buttons;
  };
  
  return (
    <SectionContainer>
      <SectionHeader>
        <Typography variant="h2">Work History</Typography>
      </SectionHeader>
      
      <FilterSection>
        <FilterGroup>
          <FilterLabel variant="body1">Status:</FilterLabel>
          <Select 
            name="status" 
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel variant="body1">Service:</FilterLabel>
          <Select 
            name="service" 
            value={filters.service}
            onChange={handleFilterChange}
          >
            {serviceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel variant="body1">Date Range:</FilterLabel>
          <DateRangePicker>
            <DateInput
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              placeholder="From"
            />
            <DateInput
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              placeholder="To"
            />
          </DateRangePicker>
        </FilterGroup>
      </FilterSection>
      
      <WorkHistoryContent>
        {filteredHistory.length === 0 ? (
          <EmptyStateMessage>
            <Typography variant="h3">No work history found</Typography>
            <Typography variant="body1">
              Try changing your filters or check back later when you have completed jobs.
            </Typography>
          </EmptyStateMessage>
        ) : (
          <>
            <WorkHistoryGrid>
              {displayedHistory.map(job => (
                <WorkHistoryCard key={job.id} job={job} />
              ))}
            </WorkHistoryGrid>
            
            <PaginationContainer>
              <PageInfo variant="body2">
                Showing {displayedHistory.length} of {filteredHistory.length} jobs
              </PageInfo>
              <PaginationButtons>
                {renderPaginationButtons()}
              </PaginationButtons>
            </PaginationContainer>
          </>
        )}
      </WorkHistoryContent>
    </SectionContainer>
  );
};

export default WorkHistorySection;