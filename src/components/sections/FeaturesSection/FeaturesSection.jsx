import React from 'react';
import {
  FeaturesContainer,
  FeaturesWrapper,
  FeaturesList,
  FeatureItem,
  FeatureIcon,
  FeatureContent,
  FeatureTitle,
  FeatureDescription,
  QualityAssurance,
  QualityIcon,
  QualityTitle,
  QualityDescription
} from './FeaturesSection.styles';

// SVG Icons (simplified version for the component)
const TransparentPricingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="21" x="3" y="1.5" rx="2" fill="#F5A623" />
    <path d="M7 8h10M7 12h10M7 16h6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ExpertsOnlyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="#F5A623" />
    <path d="M20 18c0-4.4-3.6-8-8-8s-8 3.6-8 8" fill="#F5A623" />
    <path d="M9 16l2 2 4-4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FullyEquippedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="12" x="3" y="6" rx="2" fill="#F5A623" />
    <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M12 10v4M8 12h8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const QualityAssuredIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#4682B4" />
    <circle cx="12" cy="10" r="3" fill="#FFF" />
    <path d="M10 14c0 1.1.9 2 2 2s2-.9 2-2" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FeaturesSection = () => {
  return (
    <FeaturesContainer>
      <FeaturesWrapper>
        <FeaturesList>
          <FeatureItem>
            <FeatureIcon>
              <TransparentPricingIcon />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Transparent pricing</FeatureTitle>
              <FeatureDescription>
                See fixed prices before you book. No hidden charges.
              </FeatureDescription>
            </FeatureContent>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>
              <ExpertsOnlyIcon />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Experts only</FeatureTitle>
              <FeatureDescription>
                Our professionals are well trained and have on-job expertise.
              </FeatureDescription>
            </FeatureContent>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>
              <FullyEquippedIcon />
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Fully equipped</FeatureTitle>
              <FeatureDescription>
                We bring everything needed to get the job done well.
              </FeatureDescription>
            </FeatureContent>
          </FeatureItem>
        </FeaturesList>

        <QualityAssurance>
          <QualityIcon>
            <QualityAssuredIcon />
          </QualityIcon>
          <QualityTitle>100% Quality Assured</QualityTitle>
          <QualityDescription>
            If you don't love our service, we will make it right.
          </QualityDescription>
        </QualityAssurance>
      </FeaturesWrapper>
    </FeaturesContainer>
  );
};

export default FeaturesSection;