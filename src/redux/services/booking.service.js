// redux/services/booking.service.js
import apiClient from '../../api/client';
import { BookinEndpoints } from '../../api/endpoint';

export const createBooking = async (bookingData) => {
  try {
    const response = await apiClient.post(BookinEndpoints.createBooking, bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await apiClient.put(BookinEndpoints.cancelBooking(bookingId));
    return response.data;
  } catch (error) {
    throw error;
  }
};
