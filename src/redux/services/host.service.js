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


export const getBookingByHost = async (accountId) => {
  try {
    const response = await apiClient.get(HostEndpoints.getBookingByHost(accountId));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboardByHost = async (accountId) => {
  try {
    const response = await apiClient.get(HostEndpoints.getDashboardByHost(accountId));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAccountHost = async (accountId, payload) => {
  try {
    const response = await apiClient.put(
      HostEndpoints.updateAccountHost(accountId),
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

