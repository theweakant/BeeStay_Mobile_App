// redux/services/user.service.js
import apiClient from '../../api/client';
import { UserEndpoints } from '../../api/endpoint';

export const getUserByAccount = async (accountId) => {
  try {
    const response = await apiClient.get(UserEndpoints.getUserByAccount(accountId));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật user theo accountId
export const updateUserByAccount = async (accountId, userData) => {
  try {
    const response = await apiClient.put(UserEndpoints.updateUserByAccount(accountId), userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật avatar theo accountId
export const updateUserAvatar = async (accountId, imageData) => {
  try {
    const formData = new FormData();
    formData.append('image', imageData); 
    
    const response = await apiClient.put(UserEndpoints.updateUserAvatar(accountId), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getBooking = async (accountId) => {
  try {
    const response = await apiClient.get(UserEndpoints.getBooking(accountId));
    return response.data;
  } catch (error) {
    throw error;
  }
};