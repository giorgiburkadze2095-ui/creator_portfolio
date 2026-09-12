import { apiClient } from './client.js';

export const authApi = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  logout: () => apiClient.post('/auth/logout'),
  me: () => apiClient.get('/auth/me'),
  setupPassword: (token, password) => apiClient.post('/auth/setup-password', { token, password }),
  updateProfile: (data) => apiClient.patch('/auth/me', data),
  changePassword: (data) => apiClient.patch('/auth/me/password', data),
};
