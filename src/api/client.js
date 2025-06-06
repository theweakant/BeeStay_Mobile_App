// api/client.js - BULLETPROOF VERSION
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
];


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

// ✅ FIXED: Response interceptor with better error handling
apiClient.interceptors.response.use(
  (response) => {
    // ✅ Safe logging
    const status = response?.status || 'UNKNOWN';
    const url = response?.config?.url || 'UNKNOWN';
    console.log(`✅ API Response: ${status} ${url}`);
    return response;
  },
  async (error) => {
    try {
      // ✅ Safe error logging
      const status = error.response?.status || 'NO_RESPONSE';
      const url = error.config?.url || 'UNKNOWN_URL';
      const originalRequest = error.config;
      
      console.error(`❌ API Error: ${status} ${url}`);
      console.error('📋 Error Details:', {
        status: error.response?.status,
        data: error.response?.data || 'No response data',
        message: error.message || 'No error message',
      });

      // ✅ Only handle auth errors for protected endpoints
      if ((error.response?.status === 403 || error.response?.status === 401)) {
        
        // ✅ Check if this is a protected endpoint
        const isPublic = originalRequest?.url ? isPublicEndpoint(originalRequest.url) : false;
        
        if (!isPublic && originalRequest) {
          console.log('🚫 Auth error on protected endpoint');
          
          // ✅ Retry logic with safety checks
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
              const currentToken = await AsyncStorage.getItem('token');
              
              if (currentToken) {
                console.log('🔄 Retry with current token...');
                // ✅ Ensure headers exist
                if (!originalRequest.headers) {
                  originalRequest.headers = {};
                }
                originalRequest.headers.Authorization = `Bearer ${currentToken}`;
                return apiClient(originalRequest);
              } else {
                console.log('❌ No token found, need to login');
                await AsyncStorage.multiRemove(['token', 'accountId']);
                throw new Error('Authentication required');
              }
            } catch (refreshError) {
              console.error('❌ Token refresh failed:', refreshError);
              await AsyncStorage.multiRemove(['token', 'accountId']);
              throw refreshError;
            }
          }
        } else {
          console.log('🔓 Auth error on public endpoint - this is unusual but not handled');
        }
      }

      // ✅ Handle network errors
      if (!error.response) {
        console.error('🌐 Network Error:', error.message);
        const networkError = new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
        networkError.isNetworkError = true;
        throw networkError;
      }

      // ✅ Handle other errors
      return Promise.reject(error);
      
    } catch (interceptorError) {
      console.error('❌ Response interceptor error:', interceptorError);
      return Promise.reject(interceptorError);
    }
  }
);

// ✅ Add a test function to validate the client
export const testApiClient = () => {
  console.log('🧪 Testing API Client Configuration...');
  console.log('📍 Base URL:', apiClient.defaults.baseURL);
  console.log('⏱️ Timeout:', apiClient.defaults.timeout);
  console.log('🔓 Public endpoints:', PUBLIC_ENDPOINTS);
  
  // Test the isPublicEndpoint function
  console.log('🧪 Testing isPublicEndpoint function:');
  console.log('  /v1/auth/register:', isPublicEndpoint('/v1/auth/register'));
  console.log('  /v1/auth/login:', isPublicEndpoint('/v1/auth/login'));
  console.log('  /v1/users/profile:', isPublicEndpoint('/v1/users/profile'));
  console.log('  undefined:', isPublicEndpoint(undefined));
  console.log('  null:', isPublicEndpoint(null));
  console.log('  empty string:', isPublicEndpoint(''));
};

export default apiClient;