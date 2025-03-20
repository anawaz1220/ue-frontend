import React from 'react';
import styled from 'styled-components';
import Typography from '../common/Typography';
import ServiceCard from './ServiceCard';

const ServiceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.white};
  height: 100%;
  overflow: hidden;
`;

const CategoryHeader = styled.div`
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

const ServiceListContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 ${props => props.theme.spacing.large};
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightBackground};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.lightGrey};
    border-radius: 4px;
  }
`;

const ServiceBanner = styled.div`
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  position: relative;
  margin: ${props => props.theme.spacing.large} 0;
  height: 220px;
  background: ${props => {
    switch(props.categoryId) {
      case 'korean_facial':
        return 'linear-gradient(to right, #fce4ec, #f8bbd0)';
      case 'facial':
        return 'linear-gradient(to right, #e3f2fd, #bbdefb)';
      case 'ayurvedic_facial':
        return 'linear-gradient(to right, #f1f8e9, #dcedc8)';
      case 'cleanup':
        return 'linear-gradient(to right, #fff3e0, #ffe0b2)';
      case 'waxing':
        return 'linear-gradient(to right, #e0f7fa, #b2ebf2)';
      case 'pedicure_manicure':
        return 'linear-gradient(to right, #f3e5f5, #e1bee7)';
      case 'hair_treatments':
        return 'linear-gradient(to right, #e8f5e9, #c8e6c9)';
      case 'threading':
        return 'linear-gradient(to right, #ede7f6, #d1c4e9)';
      case 'packages':
        return 'linear-gradient(to right, #e8eaf6, #c5cae9)';
      default:
        return 'linear-gradient(to right, #f5f5f5, #e0e0e0)';
    }
  }};
  display: flex;
`;

const BannerContent = styled.div`
  width: 50%;
  height: 100%;
  padding: ${props => props.theme.spacing.large};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BannerTitle = styled(Typography)`
  font-size: ${props => props.theme.fontSizes.xxxlarge};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.medium};
  line-height: 1.2;
`;

const BannerSubtext = styled(Typography)`
  font-size: ${props => props.theme.fontSizes.large};
  white-space: pre-line;
`;

const EmptyStateMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing.xlarge};
  height: 200px;
  text-align: center;
`;

// Banner content by category
const categoryBanners = {
  korean_facial: {
    title: 'Luxury Korean Facials',
    subtext: 'Advanced treatments\nFor radiant skin',
    image: '/images/services/korean_facial.png'
  },
  facial: {
    title: 'Rejuvenating Facials',
    subtext: 'Tailored skincare\nFor all skin types',
    image: '/images/services/facial.png'
  },
  ayurvedic_facial: {
    title: 'Natural Ayurvedic Care',
    subtext: 'Traditional techniques\nWith herbal ingredients',
    image: '/images/services/ayurvedic_facial.png'
  },
  cleanup: {
    title: 'Deep Cleansing',
    subtext: 'Revitalize your skin\nFor a fresh look',
    image: '/images/services/cleanup.png'
  },
  waxing: {
    title: 'Smooth Waxing',
    subtext: 'Gentle & effective\nFor all skin types',
    image: '/images/services/waxing.png'
  },
  pedicure_manicure: {
    title: 'Hand & Foot Care',
    subtext: 'Relax & pamper\nFor beautiful nails',
    image: '/images/services/pedicure_manicure.png'
  },
  hair_treatments: {
    title: 'Hair Transformation',
    subtext: 'Nourishing treatments\nFor healthy hair',
    image: '/images/services/hair_treatments.png'
  },
  threading: {
    title: 'Precise Threading',
    subtext: 'Detailed shaping\nFor perfect brows',
    image: '/images/services/threading.png'
  },
  packages: {
    title: 'Complete Packages',
    subtext: 'Comprehensive care\nAt exclusive prices',
    image: '/images/services/packages.png'
  }
};

const ServiceList = ({ 
  categoryName, 
  categoryId,
  services, 
  onViewDetails,
  featuredService = null 
}) => {
  // Get banner content for this category
  const bannerContent = categoryBanners[categoryId] || {
    title: categoryName,
    subtext: 'Professional services\nAt your convenience',
    image: '/images/services/default.png'
  };

  return (
    <ServiceListContainer>
      <CategoryHeader>
        <Typography variant="h2">{categoryName}</Typography>
      </CategoryHeader>
      
      <ServiceListContent>
        {/* Always show category banner */}
        <ServiceBanner categoryId={categoryId}>
          <BannerContent>
            <BannerTitle>{bannerContent.title}</BannerTitle>
            <BannerSubtext>{bannerContent.subtext}</BannerSubtext>
          </BannerContent>
          <div style={{ width: '50%', height: '100%', overflow: 'hidden' }}>
            <img 
              src={bannerContent.image} 
              alt={categoryName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </ServiceBanner>
        
        {services.length > 0 ? (
          services.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <EmptyStateMessage>
            <Typography variant="h3">No services available in this category</Typography>
          </EmptyStateMessage>
        )}
      </ServiceListContent>
    </ServiceListContainer>
  );
};

export default ServiceList;