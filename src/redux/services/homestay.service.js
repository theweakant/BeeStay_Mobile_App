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