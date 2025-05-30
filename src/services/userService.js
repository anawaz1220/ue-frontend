import api from './apiService';

// Get current user profile
const getCurrentProfile = async () => {
  try {
    const response = await api.get('/api/users/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update customer profile
const updateCustomerProfile = async (profileData) => {
  try {
    const response = await api.put('/api/users/customer/profile', profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add customer address
const addCustomerAddress = async (addressData) => {
  try {
    const response = await api.post('/api/users/customer/addresses', addressData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get customer addresses
const getCustomerAddresses = async () => {
  try {
    const response = await api.get('/api/users/customer/addresses');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update customer address
const updateCustomerAddress = async (addressId, addressData) => {
  try {
    const response = await api.put(`/api/users/customer/addresses/${addressId}`, addressData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete customer address
const deleteCustomerAddress = async (addressId) => {
  try {
    const response = await api.delete(`/api/users/customer/addresses/${addressId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const userService = {
  getCurrentProfile,
  updateCustomerProfile,
  addCustomerAddress,
  getCustomerAddresses,
  updateCustomerAddress,
  deleteCustomerAddress,
};

export default userService;