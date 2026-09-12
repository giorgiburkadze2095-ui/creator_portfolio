import { apiClient } from './client.js';

export const categoriesApi = {
  list: () => apiClient.get('/categories'),
  adminList: () => apiClient.get('/admin/categories'),
  create: (data) => apiClient.post('/admin/categories', data),
  update: (id, data) => apiClient.patch(`/admin/categories/${id}`, data),
  remove: (id) => apiClient.delete(`/admin/categories/${id}`),
};
