import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../../../components/common/Typography';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../contexts/AuthContext';
import businessService from '../../../services/businessService';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.large};
  margin-bottom: ${props => props.theme.spacing.xlarge};
  padding: ${props => props.theme.spacing.large};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const LogoContainer = styled.div`
  width: 160px;
  height: 160px;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.large};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BusinessInfo = styled.div`
  flex: 1;
  min-width: 300px;
`;

const BusinessName = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.small};
`;

const BusinessAddress = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing.small};
  color: ${props => props.theme.colors.grey};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const RatingStars = styled.div`
  display: flex;
  margin-right: ${props => props.theme.spacing.small};
`;

const Star = styled.span`
  color: ${props => props.filled ? props.theme.colors.secondary : props.theme.colors.lightGrey};
  margin-right: 2px;
`;

const ReviewCount = styled(Typography)`
  color: ${props => props.theme.colors.grey};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.small};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
  
  svg {
    margin-right: ${props => props.theme.spacing.small};
    color: ${props => props.theme.colors.primary};
  }
`;

const BusinessActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    flex-direction: column;
    gap: ${props => props.theme.spacing.medium};
  }
`;

const StoreHours = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  p {
    margin-bottom: ${props => props.theme.spacing.small};
  }
`;

const EditButton = styled(Button)`
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  svg {
    margin-right: ${props => props.theme.spacing.small};
  }
`;

const ProfileHeader = ({ onEditClick }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [businessData, setBusinessData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Use user data from auth context for now
    if (user && user.business_profile) {
      setBusinessData({
        id: user.business_profile.id,
        name: user.business_profile.business_name,
        email: user.email,
        phone: user.business_profile.phone_number,
        whatsappNumber: user.business_profile.whatsapp_number,
        instagramId: user.business_profile.instagram_id,
        address: `${user.business_profile.building}, ${user.business_profile.street}, ${user.business_profile.city}`,
        building: user.business_profile.building,
        street: user.business_profile.street,
        city: user.business_profile.city,
        latitude: user.business_profile.latitude,
        longitude: user.business_profile.longitude,
        ownerName: user.business_profile.owner_name,
        ownerPhone: user.business_profile.owner_phone,
        // Default values for now
        logo: '/images/ue.png',
        rating: 0,
        reviewsCount: 0,
        website: '', 
        operatingHours: [
          { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
          { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
          { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
          { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
          { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
          { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
          { day: 'Sunday', hours: 'Closed' }
        ]
      });
      setLoading(false);
    }
  }, [user]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} filled>★</Star>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} filled>★</Star>); // We'd use a half-star icon ideally
      } else {
        stars.push(<Star key={i}>★</Star>);
      }
    }
    
    return stars;
  };
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  if (loading) {
    return (
      <HeaderContainer>
        <LoadingSpinner label="Loading business profile..." />
      </HeaderContainer>
    );
  }

  if (error) {
    return (
      <HeaderContainer>
        <Typography variant="body1" style={{ color: 'red' }}>
          Error loading business profile: {error.message || 'Unknown error'}
        </Typography>
      </HeaderContainer>
    );
  }

  if (!businessData) {
    return (
      <HeaderContainer>
        <Typography variant="body1">
          Business profile not found. Please complete your registration.
        </Typography>
      </HeaderContainer>
    );
  }
  
  const todayHours = businessData.operatingHours.find(day => day.day === today)?.hours || 'Closed';
  
  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={businessData.logo} alt={`${businessData.name} logo`} />
      </LogoContainer>
      
      <BusinessInfo>
        <BusinessName variant="h1">{businessData.name}</BusinessName>
        <BusinessAddress variant="body1">
          {businessData.address}
        </BusinessAddress>
        
        <RatingContainer>
          <RatingStars>
            {renderStars(businessData.rating)}
          </RatingStars>
          <ReviewCount variant="body2">
            {businessData.reviewsCount} reviews
          </ReviewCount>
        </RatingContainer>
        
        <ContactInfo>
          <ContactItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <Typography variant="body2">{businessData.phone}</Typography>
          </ContactItem>
          
          <ContactItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <Typography variant="body2">{businessData.email}</Typography>
          </ContactItem>
          
          {businessData.website && (
            <ContactItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <Typography variant="body2">{businessData.website}</Typography>
            </ContactItem>
          )}
          
          {businessData.instagramId && (
            <ContactItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <Typography variant="body2">@{businessData.instagramId}</Typography>
            </ContactItem>
          )}
        </ContactInfo>
        
        <BusinessActions>
          <EditButton 
            variant="outlined" 
            color="primary"
            onClick={onEditClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Edit Profile
          </EditButton>
        </BusinessActions>
      </BusinessInfo>
      
      <StoreHours>
        <Typography variant="h3">Hours</Typography>
        <Typography variant="body2">Today: {todayHours}</Typography>
        {businessData.operatingHours.map((day, index) => (
          <Typography key={index} variant="body2">
            {day.day}: {day.hours}
          </Typography>
        ))}
      </StoreHours>
    </HeaderContainer>
  );
};

export default ProfileHeader;