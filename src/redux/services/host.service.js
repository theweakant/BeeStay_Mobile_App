// redux/services/host.service.js
import apiClient from '../../api/client';
import { HostEndpoints } from '../../api/endpoint';

export const getHostByAccount = async (accountId) => {
  try {
    const response = await apiClient.get(HostEndpoints.getHostByAccount(accountId));
    return response.data;
  } catch (error) {
    throw error;
  }
};
