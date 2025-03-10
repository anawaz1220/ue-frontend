import React from 'react';
import { 
  HeroSection, 
  FeaturesSection, 
  AppDownloadSection,
  FAQSection
} from '../../components/sections';

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AppDownloadSection />
      <FAQSection />
    </>
  );
};

export default Home;