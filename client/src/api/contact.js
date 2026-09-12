import { apiClient } from './client.js';

export const contactApi = {
  submit: (data) => apiClient.post('/contact', data),
};
