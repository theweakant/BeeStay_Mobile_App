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

export const sendOTP = async (email) => {
  try {
    const response = await apiClient.post(AuthEndpoints.verify, null, {
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
    // registerData should contain: { userName, password, email, role, otp }
    const response = await apiClient.post(AuthEndpoints.register, registerData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};