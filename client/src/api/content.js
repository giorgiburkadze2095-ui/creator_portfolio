import { apiClient } from './client.js';

export const contentApi = {
  list: (filters) => apiClient.get('/content', filters),
  adminList: () => apiClient.get('/admin/content'),
  create: (data) => apiClient.post('/admin/content', data),
  update: (id, data) => apiClient.patch(`/admin/content/${id}`, data),
  remove: (id) => apiClient.delete(`/admin/content/${id}`),
};
