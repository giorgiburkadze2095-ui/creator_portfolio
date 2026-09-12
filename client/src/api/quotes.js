import { apiClient } from './client.js';

export const quotesApi = {
  list: (filters) => apiClient.get('/quotes', filters),
  adminList: () => apiClient.get('/admin/quotes'),
  create: (data) => apiClient.post('/admin/quotes', data),
  update: (id, data) => apiClient.patch(`/admin/quotes/${id}`, data),
  remove: (id) => apiClient.delete(`/admin/quotes/${id}`),
};
