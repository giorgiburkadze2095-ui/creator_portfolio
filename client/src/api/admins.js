import { apiClient } from './client.js';

export const adminsApi = {
  list: () => apiClient.get('/admin/admins'),
  create: (data) => apiClient.post('/admin/admins', data),
  update: (id, data) => apiClient.patch(`/admin/admins/${id}`, data),
  remove: (id) => apiClient.delete(`/admin/admins/${id}`),
};
