import React, { useState } from 'react';
import {
  AppDownloadContainer,
  AppDownloadWrapper,
  AppInfoContainer,
  AppTitle,
  AppSubtitle,
  PhoneInputContainer,
  CountryCodeSelect,
  PhoneInput,
  SendButton,
  StoreButtonsContainer,
  StoreButton,
  AppScreenshotContainer,
  AppScreenshot
} from './AppDownloadSection.styles';

// Placeholder images for app store buttons
const googlePlayImage = "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";
const appStoreImage = "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg";

// Placeholder for app screenshots
const mockScreenshot1 = "/api/placeholder/220/440";
const mockScreenshot2 = "/api/placeholder/220/440";

const AppDownloadSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = () => {
    // In a real app, this would send the phone number to an API
    alert(`App download link will be sent to ${countryCode}${phoneNumber}`);
  };

  return (
    <AppDownloadContainer>
      <AppDownloadWrapper>
        <AppInfoContainer>
          <AppTitle>Book professionals from your phone</AppTitle>
          <AppSubtitle>
            Enter your mobile number to get the App download link.
          </AppSubtitle>
          
          <PhoneInputContainer>
            <CountryCodeSelect 
              value={countryCode}
              onChange={handleCountryCodeChange}
            >
              <option value="+1">+1</option>
              <option value="+91">+91</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
            </CountryCodeSelect>
            
            <PhoneInput
              type="tel"
              placeholder="Your phone number"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
            
            <SendButton onClick={handleSubmit}>
              Send
            </SendButton>
          </PhoneInputContainer>
          
          <StoreButtonsContainer>
            <StoreButton href="#" target="_blank" rel="noopener noreferrer">
              <img src={googlePlayImage} alt="Get it on Google Play" />
            </StoreButton>
            
            <StoreButton href="#" target="_blank" rel="noopener noreferrer">
              <img src={appStoreImage} alt="Download on the App Store" />
            </StoreButton>
          </StoreButtonsContainer>
        </AppInfoContainer>
        
        <AppScreenshotContainer>
          <img src="/assets/images/mobile.png" alt="UrbanEase Mobile App" style={{ maxWidth: '100%', height: 'auto' }} />
        </AppScreenshotContainer>
      </AppDownloadWrapper>
    </AppDownloadContainer>
  );
};

export default AppDownloadSection;