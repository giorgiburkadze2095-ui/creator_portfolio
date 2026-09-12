import { apiClient } from './client.js';

export const socialLinksApi = {
  list: () => apiClient.get('/social-links'),
  adminList: () => apiClient.get('/admin/social-links'),
  create: (data) => apiClient.post('/admin/social-links', data),
  update: (id, data) => apiClient.patch(`/admin/social-links/${id}`, data),
  remove: (id) => apiClient.delete(`/admin/social-links/${id}`),
};
