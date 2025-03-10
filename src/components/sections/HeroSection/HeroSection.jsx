import React, { useState } from 'react';
import {
  HeroContainer,
  HeroBackground,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CitySelectionContainer,
  CityDropdown,
  DropdownButton,
  DropdownIcon,
  DropdownMenu,
  DropdownItem,
  SearchInput
} from './HeroSection.styles';

// Mock city data - in a real app, this would come from an API
const cities = [
  'Sudbury', 'Toronto', 'Ottawa', 'Montreal', 'Vancouver', 
  'Calgary', 'Edmonton', 'Winnipeg', 'Halifax', 'Victoria'
];

const HeroSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <HeroContainer>
      <HeroBackground />
      <HeroContent>
        <HeroTitle>Quality home services, on demand</HeroTitle>
        <HeroSubtitle>
          Experienced, hand-picked professionals to serve you at your doorstep
        </HeroSubtitle>
        
        <CitySelectionContainer>
          <CityDropdown>
            <DropdownButton onClick={toggleDropdown}>
              {selectedCity || 'Where do you need a service?'}
              <DropdownIcon>▼</DropdownIcon>
            </DropdownButton>
            
            <DropdownMenu isOpen={isDropdownOpen}>
              <SearchInput 
                placeholder="Search for your city"
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
              />
              
              {filteredCities.map((city) => (
                <DropdownItem 
                  key={city}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </DropdownItem>
              ))}
              
              {filteredCities.length === 0 && (
                <DropdownItem>No cities found</DropdownItem>
              )}
            </DropdownMenu>
          </CityDropdown>
        </CitySelectionContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;