// redux/services/auth.service.js
import apiClient from '../../api/client';
import { AuthEndpoints } from '../../api/endpoint';

export const login = async (credentials) => {
  try {
    const response = await apiClient.post(AuthEndpoints.login, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// API để gửi OTP đến email
export const registerSendOTP = async (email) => {
  try {
    const response = await apiClient.post(AuthEndpoints.register, null, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API để verify OTP và hoàn thành đăng ký
export const verifyOTPAndRegister = async (registerData) => {
  try {
    const response = await apiClient.post(AuthEndpoints.verify, registerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
