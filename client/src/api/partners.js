import { apiClient } from './client.js';

export const partnersApi = {
  list: () => apiClient.get('/partners'),
  adminList: () => apiClient.get('/admin/partners'),
  create: (data) => apiClient.post('/admin/partners', data),
  update: (id, data) => apiClient.patch(`/admin/partners/${id}`, data),
  remove: (id) => apiClient.delete(`/admin/partners/${id}`),
};
