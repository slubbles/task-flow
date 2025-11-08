// ========================================
// USERS API
// ========================================

import apiClient from './client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
  avatar?: string;
  createdAt: string;
}

export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};
