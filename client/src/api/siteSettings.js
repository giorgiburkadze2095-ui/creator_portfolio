import { apiClient } from './client.js';

export const siteSettingsApi = {
  get: () => apiClient.get('/site-settings'),
  adminGet: () => apiClient.get('/admin/site-settings'),
  update: (data) => apiClient.patch('/admin/site-settings', data),
};
