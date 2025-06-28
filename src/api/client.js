// api/client.js
import { Alert } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_BASE } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: REACT_APP_API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
  timeout: 15000,
});

const refreshClient = axios.create({
  baseURL: REACT_APP_API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

const PUBLIC_ENDPOINTS = [
  '/v1/auth/register',
  '/v1/auth/verify',
  '/v1/auth/login',
  '/v1/auth/refresh-token',
];

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

const isPublicEndpoint = (url) => {
  if (!url || typeof url !== 'string') return false;
  return PUBLIC_ENDPOINTS.some(endpoint => url.includes(endpoint));
};

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const method = config.method?.toUpperCase() || 'UNKNOWN';
      const isPublic = isPublicEndpoint(config.url);
      if (__DEV__) console.log(`🚀 ${method} ${config.url} - ${isPublic ? 'Public' : 'Protected'}`);

      if (!isPublic) {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          if (__DEV__) console.log('✅ Auth token added:', token);
        } else {
          if (__DEV__) console.warn('⚠️ No auth token found for protected endpoint');
        }
      }

      return config;
    } catch (err) {
      if (__DEV__) console.error('❌ Request Interceptor Error:', err);
      return config;
    }
  },
  (error) => {
    if (__DEV__) console.error('❌ Request Interceptor Promise Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      const status = response?.status || 'UNKNOWN';
      const url = response?.config?.url || 'UNKNOWN';
      console.log(`✅ API Response: ${status} ${url}`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url;

    if (__DEV__) {
      console.error(`❌ API Error: ${status} ${url}`);
      console.error('📋 Error Details:', {
        status,
        data: error.response?.data,
        message: error.message,
      });
    }

    if ((status === 401 || status === 403) && originalRequest && !originalRequest._retry) {
      const isPublic = isPublicEndpoint(originalRequest.url);
      if (!isPublic) {
        if (isRefreshing) {
          if (__DEV__) console.log('🔄 Waiting for ongoing token refresh...');
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error('No refresh token available');

          if (__DEV__) console.log('🔄 Attempting to refresh token...');
          if (__DEV__) console.log('🔑 Refresh token used:', refreshToken);
          
          const refreshResponse = await refreshClient.post(
            '/v1/auth/refresh-token',
            null, 
            {
              params: {
                refresh_token: refreshToken,
              },
            }
          );

          const { token: newToken, refreshToken: newRefreshToken } = refreshResponse.data;

          if (!newToken) throw new Error('No token returned from refresh API');

          await AsyncStorage.setItem('token', newToken);
          if (newRefreshToken) {
            await AsyncStorage.setItem('refreshToken', newRefreshToken);
            if (__DEV__) console.log('✅ Tokens refreshed & saved');
          }

          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);

        } catch (refreshError) {
          if (__DEV__) console.error('❌ Refresh Token Failed:', refreshError);

          // ❗️Reset `isRefreshing` early to avoid locking queue
          isRefreshing = false;

          processQueue(refreshError, null);

          // Clear tokens
          await AsyncStorage.multiRemove(['token', 'refreshToken', 'accountId']);
          if (__DEV__) console.log('🧹 Cleared all auth tokens');

          const authError = new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          authError.isAuthError = true;
          throw authError;
        } finally {
          isRefreshing = false;
        }
      }
    }

    // Network error
    if (!error.response) {
      const networkError = new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      networkError.isNetworkError = true;
      throw networkError;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
