import axios from 'axios';
import { REACT_APP_API_BASE } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';



const apiClient = axios.create({
  baseURL: REACT_APP_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
