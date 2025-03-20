// Sample data for service categories and services
// This will be replaced with API data in the future

// Generic services that appear in all categories
const genericServices = [
  {
    id: 'mobile_service_fee',
    name: 'Mobile Service Fee',
    description: 'Convenience fee for in-home service delivery',
    additionalInfo: 'Waived for orders above $100',
    rating: 4.9,
    reviewCount: 8500,
    price: 29.99,
    duration: { hours: 0, minutes: 0 },
    isPackage: false
  },
  {
    id: 'premium_products',
    name: 'Premium Products Upgrade',
    description: 'Upgrade to luxury brand products for any service',
    additionalInfo: 'Includes personalized product recommendations',
    rating: 4.8,
    reviewCount: 3200,
    price: 19.99,
    duration: { hours: 0, minutes: 0 },
    isPackage: false
  }
];

export const serviceCategories = [
  {
    id: 'packages',
    name: 'Packages',
    image: '/images/services/packages.png',
    alt: 'Service packages'
  },
  {
    id: 'waxing',
    name: 'Waxing',
    image: '/images/services/waxing.png',
    alt: 'Waxing services'
  },
  {
    id: 'korean_facial',
    name: 'Korean facial',
    image: '/images/services/korean_facial.png',
    alt: 'Korean facial services'
  },
  {
    id: 'facial',
    name: 'Facial',
    image: '/images/services/facial.png',
    alt: 'Facial services'
  },
  {
    id: 'ayurvedic_facial',
    name: 'Ayurvedic facial',
    image: '/images/services/ayurvedic_facial.png',
    alt: 'Ayurvedic facial services'
  },
  {
    id: 'cleanup',
    name: 'Cleanup',
    image: '/images/services/cleanup.png',
    alt: 'Cleanup services'
  },
  {
    id: 'pedicure_manicure',
    name: 'Pedicure & manicure',
    image: '/images/services/pedicure_manicure.png',
    alt: 'Pedicure and manicure services'
  },
  {
    id: 'hair_treatments',
    name: 'Hair, bleach & detan',
    image: '/images/services/hair_treatments.png',
    alt: 'Hair treatments'
  },
  {
    id: 'threading',
    name: 'Threading & face waxing',
    image: '/images/services/threading.png',
    alt: 'Threading and face waxing'
  }
];

export const services = [
  // Add generic services to all categories
  ...serviceCategories.flatMap(category => 
    genericServices.map(service => ({
      ...service,
      id: `${service.id}_${category.id}`,
      categoryId: category.id
    }))
  ),
  
  // Korean Facial Services
  {
    id: 'korean_ageless_facial',
    categoryId: 'korean_facial',
    name: 'Korean ageless facial',
    description: 'Retains moisture & boosts skin elasticity',
    additionalInfo: 'Includes shoulders, legs & back massage',
    rating: 4.85,
    reviewCount: 6000,
    price: 89.99,
    duration: { hours: 1, minutes: 20 },
    image: '/images/services/korean_facial_banner.jpg',
    bannerText: 'For a wrinkle free skin',
    bannerSubtext: 'Rice water\nAll skin types',
    isPackage: false
  },
  {
    id: 'korean_glass_hydration',
    categoryId: 'korean_facial',
    name: 'Korean Glass hydration facial',
    description: 'Deep hydration for smooth, glowing skin',
    additionalInfo: 'Includes face, neck and shoulder massage',
    rating: 4.9,
    reviewCount: 3200,
    price: 109.99,
    duration: { hours: 1, minutes: 30 },
    image: '/images/services/korean_hydration_banner.jpg',
    bannerText: 'For a hydrated & smooth skin',
    bannerSubtext: 'Red algae\nAll skin types',
    isPackage: false
  },
  
  // Facial Services
  {
    id: 'aroma_magic_facial',
    categoryId: 'facial',
    name: 'Aroma Magic instant glow facial',
    description: 'Brightens & reveals a vibrant complexion',
    additionalInfo: 'Includes ultrasonic spatula cleansing & 15-min shoulders & legs massage',
    rating: 4.83,
    reviewCount: 8000,
    price: 74.99,
    duration: { hours: 1, minutes: 5 },
    image: '/images/services/facial_banner.jpg',
    bannerText: 'Brighten up your skin',
    bannerSubtext: 'Vitamins A,C & E\nNormal to oily skin',
    isPackage: false
  },
  
  // Cleanup Services
  {
    id: 'power_glow_cleanup',
    categoryId: 'cleanup',
    name: 'Power glow cleanup',
    description: 'Reduces pigmentation & brightens skin',
    additionalInfo: 'Includes ultrasonic spatula cleansing & 10-min shoulders massage',
    rating: 4.86,
    reviewCount: 11000,
    price: 49.99,
    duration: { hours: 0, minutes: 50 },
    image: '/images/services/cleanup_banner.jpg',
    bannerText: 'From dull to dazzling',
    bannerSubtext: 'Vitamin B-5\nAll skin types',
    isPackage: false
  },
  
  // Waxing Packages
  {
    id: 'complete_honey_waxing',
    categoryId: 'waxing',
    name: 'Complete honey waxing',
    description: 'Full arms (including underarms), Full legs (no bikini and no brazilian)',
    additionalInfo: 'Facial hair removal: Eyebrow, Upper lip',
    rating: 4.85,
    reviewCount: 1900,
    price: 59.99,
    originalPrice: 69.99,
    duration: { hours: 1, minutes: 10 },
    isPackage: true
  },
  {
    id: 'chocolate_roll_on_waxing',
    categoryId: 'packages',
    name: 'Complete chocolate roll-on waxing',
    description: 'Chocolate full arms, underarms, full legs',
    additionalInfo: '',
    rating: 4.86,
    reviewCount: 2300,
    price: 64.99,
    originalPrice: 79.99,
    duration: { hours: 0, minutes: 55 },
    isPackage: true
  },
  
  // Pedicure & Manicure Services
  {
    id: 'luxury_mani_pedi',
    categoryId: 'pedicure_manicure',
    name: 'Luxury Manicure & Pedicure',
    description: 'Complete nail care with exfoliation and massage',
    additionalInfo: 'Includes hot towel wrap and paraffin wax treatment',
    rating: 4.9,
    reviewCount: 1250,
    price: 89.99,
    duration: { hours: 1, minutes: 45 },
    isPackage: true
  },
  
  // Hair Treatments
  {
    id: 'hair_spa_treatment',
    categoryId: 'hair_treatments',
    name: 'Hair Spa Treatment',
    description: 'Deep conditioning treatment for damaged hair',
    additionalInfo: 'Includes scalp massage and steam therapy',
    rating: 4.8,
    reviewCount: 950,
    price: 79.99,
    duration: { hours: 1, minutes: 0 },
    isPackage: false
  },
  
  // Threading Services
  {
    id: 'eyebrow_threading',
    categoryId: 'threading',
    name: 'Eyebrow & Face Threading',
    description: 'Precision threading for perfect brows',
    additionalInfo: 'Includes upper lip, chin and forehead threading',
    rating: 4.95,
    reviewCount: 3500,
    price: 29.99,
    duration: { hours: 0, minutes: 30 },
    isPackage: false
  },
  
  // Ayurvedic Facial Services
  {
    id: 'ayurvedic_glow',
    categoryId: 'ayurvedic_facial',
    name: 'Ayurvedic Glow Facial',
    description: 'Natural herbs to revitalize and rejuvenate skin',
    additionalInfo: 'Includes herbal steam and face massage',
    rating: 4.75,
    reviewCount: 3800,
    price: 94.99,
    duration: { hours: 1, minutes: 15 },
    isPackage: false
  }
];

export const servicePromise = [
  {
    id: 'beauticians',
    text: '4.5+ Rated Beauticians'
  },
  {
    id: 'experience',
    text: 'Luxury Salon Experience'
  },
  {
    id: 'products',
    text: 'Premium Branded Products'
  }
];