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


export const updateUser = async (userData) => {
  try {
    const response = await apiClient.put(UserEndpoints.updateUser, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};