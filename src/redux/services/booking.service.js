// redux/services/booking.service.js
import apiClient from '../../api/client';
import { BookingEndpoints } from '../../api/endpoint';

export const createBooking = async (bookingData) => {
  try {
    console.log('📤 Sending booking request:', bookingData);
    const response = await apiClient.post(BookingEndpoints.createBooking, bookingData);
    console.log('📥 Booking response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Booking service error:', error);
    console.error('❌ Error response:', error.response?.data);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await apiClient.delete(`${BookingEndpoints.cancelBooking}/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Cancel booking error:', error);
    throw error;
  }
};


export const checkInBooking = async (bookingId) => {
  try {
    const response = await apiClient.put(BookingEndpoints.checkInBooking(bookingId));
    return response.data;
  } catch (error) {
    console.error('❌ Check-in booking error:', error);
    throw error;
  }
};