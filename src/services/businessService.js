import api from './apiService';

// Update business profile
const updateBusinessProfile = async (profileData) => {
  try {
    const response = await api.put('/api/business/profile', profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add business photo
const addBusinessPhoto = async (photoData) => {
  try {
    const response = await api.post('/api/business/photos', photoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get business photos
const getBusinessPhotos = async () => {
  try {
    const response = await api.get('/api/business/photos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete business photo
const deleteBusinessPhoto = async (photoId) => {
  try {
    const response = await api.delete(`/api/business/photos/${photoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get service types
const getServiceTypes = async () => {
  try {
    const response = await api.get('/api/business/service-types');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add business service
const addBusinessService = async (serviceData) => {
  try {
    const response = await api.post('/api/business/services', serviceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get business services
const getBusinessServices = async () => {
  try {
    const response = await api.get('/api/business/services');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete business service
const deleteBusinessService = async (serviceId) => {
  try {
    const response = await api.delete(`/api/business/services/${serviceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const businessService = {
  updateBusinessProfile,
  addBusinessPhoto,
  getBusinessPhotos,
  deleteBusinessPhoto,
  getServiceTypes,
  addBusinessService,
  getBusinessServices,
  deleteBusinessService,
};

export default businessService;