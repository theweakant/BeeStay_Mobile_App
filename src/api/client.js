import axios from 'axios';
import { REACT_APP_API_BASE } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: REACT_APP_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Debug log
      console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      console.log('📋 Headers:', config.headers);
      
      return config;
    } catch (error) {
      console.error('❌ Request interceptor error:', error);
      return config;
    }
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`);
    console.error('📋 Error Details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.log('🚫 403 Forbidden - Token có thể đã hết hạn');
      
      // Check if we haven't already tried to refresh
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Try to get fresh token
          const currentToken = await AsyncStorage.getItem('token');
          
          if (currentToken) {
            console.log('🔄 Thử lại request với token hiện tại...');
            originalRequest.headers.Authorization = `Bearer ${currentToken}`;
            return apiClient(originalRequest);
          } else {
            console.log('❌ Không tìm thấy token, cần đăng nhập lại');
            // Clear storage and redirect to login
            await AsyncStorage.multiRemove(['token', 'accountId']);
            throw new Error('Authentication required');
          }
        } catch (refreshError) {
          console.error('❌ Refresh token failed:', refreshError);
          await AsyncStorage.multiRemove(['token', 'accountId']);
          throw refreshError;
        }
      }
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.log('🚫 401 Unauthorized - Clearing auth data');
      await AsyncStorage.multiRemove(['token', 'accountId']);
    }

    // Handle network errors
    if (!error.response) {
      console.error('🌐 Network Error:', error.message);
      error.message = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.';
    }

    return Promise.reject(error);
  }
);

export default apiClient;