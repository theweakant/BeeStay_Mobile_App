// redux/services/review.service.js
import apiClient from '../../api/client';
import { ReviewEndpoints } from '../../api/endpoint';

export const addReview = async (accountId, stayCationId, reviewData) => {
  try {
    console.log('📤 Sending review request:', reviewData);

    const response = await apiClient.post(
      ReviewEndpoints.addReview(accountId, stayCationId),
      reviewData
    );

    console.log('📥 Review response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Review service error:', error);
    console.error('❌ Error response:', error.response?.data);
    throw error;
  }
};
