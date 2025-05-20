// redux/services/auth.service.js
import apiClient from '../../api/client';
import { AuthEndpoints } from '../../api/endpoint';

export const login = async (credentials) => {
  const response = await apiClient.post(AuthEndpoints.login, credentials);
  return response.data;
};
