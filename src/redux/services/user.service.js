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
