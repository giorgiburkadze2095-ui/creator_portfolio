import { apiClient } from './client.js';

export const messagesApi = {
  list: (status) => apiClient.get('/admin/messages', { status }),
  unreadCount: () => apiClient.get('/admin/messages/unread-count'),
  getOne: (id) => apiClient.get(`/admin/messages/${id}`),
  update: (id, data) => apiClient.patch(`/admin/messages/${id}`, data),
};
