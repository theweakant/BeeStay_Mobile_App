// api/client.js - BULLETPROOF VERSION WITH REFRESH TOKEN
import axios from 'axios';
import { REACT_APP_API_BASE } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: REACT_APP_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

console.log('BASE_URL:', REACT_APP_API_BASE);

const PUBLIC_ENDPOINTS = [
  '/v1/auth/register',  
  '/v1/auth/verify',    
  '/v1/auth/login',
  '/v1/auth/refresh-token', 
];

// Biến để quản lý refresh token process
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

const isPublicEndpoint = (url) => {
  if (!url || typeof url !== 'string') {
    console.warn('⚠️ isPublicEndpoint: Invalid URL provided:', url);
    return false;
  }
  
  try {
    return PUBLIC_ENDPOINTS.some(endpoint => {
      if (typeof endpoint !== 'string') {
        console.warn('⚠️ Invalid endpoint in PUBLIC_ENDPOINTS:', endpoint);
        return false;
      }
      return url.includes(endpoint);
    });
  } catch (error) {
    console.error('❌ Error in isPublicEndpoint:', error);
    return false;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      if (!config) {
        console.error('❌ Request config is undefined');
        return Promise.reject(new Error('Request configuration is missing'));
      }

      if (!config.url) {
        console.error('❌ Request URL is undefined');
        return Promise.reject(new Error('Request URL is missing'));
      }

      if (!config.headers) {
        config.headers = {};
      }

      const method = config.method ? config.method.toUpperCase() : 'UNKNOWN';
      const isPublic = isPublicEndpoint(config.url);
      
      if (isPublic) {
        console.log('🔓 Public endpoint - No auth required');
      } else {
        console.log('🔒 Protected endpoint - Adding auth token');
        try {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('✅ Auth token added');
          } else {
            console.log('⚠️ No auth token found for protected endpoint');
          }
        } catch (tokenError) {
          console.error('❌ Error getting token from AsyncStorage:', tokenError);
        }
      }
      
      return config;
      
    } catch (error) {
      console.error('❌ Request interceptor error:', error);
      return config || { url: '', method: 'GET', headers: {} };
    }
  },
  (error) => {
    console.error('❌ Request interceptor promise error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with refresh token logic
apiClient.interceptors.response.use(
  (response) => {
    const status = response?.status || 'UNKNOWN';
    const url = response?.config?.url || 'UNKNOWN';
    console.log(`✅ API Response: ${status} ${url}`);
    return response;
  },
  async (error) => {
    try {
      const status = error.response?.status || 'NO_RESPONSE';
      const url = error.config?.url || 'UNKNOWN_URL';
      const originalRequest = error.config;
      
      console.error(`❌ API Error: ${status} ${url}`);
      console.error('📋 Error Details:', {
        status: error.response?.status,
        data: error.response?.data || 'No response data',
        message: error.message || 'No error message',
      });

      // Handle 401/403 errors for protected endpoints
      if ((error.response?.status === 403 || error.response?.status === 401)) {
        const isPublic = originalRequest?.url ? isPublicEndpoint(originalRequest.url) : false;
        
        if (!isPublic && originalRequest && !originalRequest._retry) {
          console.log('🚫 Auth error on protected endpoint');
          
          // If already refreshing, add to queue
          if (isRefreshing) {
            console.log('🔄 Already refreshing, adding to queue...');
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then(token => {
              if (!originalRequest.headers) {
                originalRequest.headers = {};
              }
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return apiClient(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            console.log('🔄 Attempting to refresh token...');
            
            // Call refresh token API
            const refreshResponse = await apiClient.post('/v1/auth/refresh-token', {
              refreshToken: refreshToken
            });

            const { token: newToken, refreshToken: newRefreshToken } = refreshResponse.data;
            
            if (newToken) {
              // Save new tokens
              await AsyncStorage.setItem('token', newToken);
              if (newRefreshToken) {
                await AsyncStorage.setItem('refreshToken', newRefreshToken);
              }
              
              console.log('✅ Token refreshed successfully');
              
              // Process queued requests
              processQueue(null, newToken);
              
              // Retry original request
              if (!originalRequest.headers) {
                originalRequest.headers = {};
              }
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            } else {
              throw new Error('No token received from refresh');
            }
            
          } catch (refreshError) {
            console.error('❌ Token refresh failed:', refreshError);
            
            // Process queue with error
            processQueue(refreshError, null);
            
            // Clear all tokens
            await AsyncStorage.multiRemove(['token', 'refreshToken', 'accountId']);
            
            // Create a specific error for token refresh failure
            const authError = new Error('Session expired. Please login again.');
            authError.isAuthError = true;
            throw authError;
            
          } finally {
            isRefreshing = false;
          }
        } else if (!isPublic) {
          console.log('🔓 Auth error on public endpoint - this is unusual but not handled');
        }
      }

      // Handle network errors
      if (!error.response) {
        console.error('🌐 Network Error:', error.message);
        const networkError = new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
        networkError.isNetworkError = true;
        throw networkError;
      }

      // Handle other errors
      return Promise.reject(error);
      
    } catch (interceptorError) {
      console.error('❌ Response interceptor error:', interceptorError);
      return Promise.reject(interceptorError);
    }
  }
);

export default apiClient;