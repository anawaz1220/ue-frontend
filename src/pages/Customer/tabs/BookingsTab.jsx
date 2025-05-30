// src/pages/Customer/tabs/BookingsTab.jsx
import React from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';
import ServiceCard from '../components/ServiceCard';

const BookingsContainer = styled.div``;

const SectionTitle = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.medium};
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

const BookingsTab = ({ bookingsData }) => {
  if (!bookingsData || bookingsData.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </EmptyIcon>
        <EmptyText variant="h3">No Current Bookings</EmptyText>
        <Typography variant="body1" style={{ marginBottom: '20px' }}>
          You don't have any upcoming appointments scheduled.
        </Typography>
        <Button variant="filled" color="primary">
          Browse Services
        </Button>
      </EmptyState>
    );
  }
  
  // Group bookings by status
  const confirmedBookings = bookingsData.filter(booking => booking.status === 'confirmed');
  const pendingBookings = bookingsData.filter(booking => booking.status === 'pending');
  
  return (
    <BookingsContainer>
      {pendingBookings.length > 0 && (
        <>
          <SectionTitle variant="h2">Pending Confirmation</SectionTitle>
          {pendingBookings.map(booking => (
            <ServiceCard 
              key={booking.id} 
              service={booking} 
              isPending={true}
            />
          ))}
        </>
      )}
      
      {confirmedBookings.length > 0 && (
        <>
          <SectionTitle variant="h2" style={{ marginTop: pendingBookings.length ? '32px' : 0 }}>
            Upcoming Appointments
          </SectionTitle>
          {confirmedBookings.map(booking => (
            <ServiceCard 
              key={booking.id} 
              service={booking} 
              isConfirmed={true}
            />
          ))}
        </>
      )}
    </BookingsContainer>
  );
};

export default BookingsTab;