// redux/services/homestay.service.js
import apiClient from '../../api/client';
import { HomestayEndpoints } from '../../api/endpoint';

export const getAllHomestays = async () => {
  try {
    const response = await apiClient.get(HomestayEndpoints.getAllStayCations);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHomestayById = async (homeStayId) => {
  try {
    const response = await apiClient.get(HomestayEndpoints.getStayCationById(homeStayId));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addStaycation = async (accountId, staycationData) => {
  const response = await apiClient.post(
    HomestayEndpoints.addStayCationByAccountId(accountId),
    staycationData
  );
}

export const getHomestaysByHost = async (accountId) => {
  try {
    const response = await apiClient.get(HomestayEndpoints.getStayCationByHost(accountId));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStaycation = async (homeStayId, staycationData) => {
  try {
    const response = await apiClient.put(
      HomestayEndpoints.updateStayCationById(homeStayId),
      staycationData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};