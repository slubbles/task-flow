// ========================================
// PROJECTS API
// ========================================

import apiClient from './client';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  ownerId: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  _count?: {
    tasks: number;
  };
}

export const getProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data;
};

export const getProject = async (id: string) => {
  const response = await apiClient.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (data: { name: string; description?: string }) => {
  const response = await apiClient.post('/projects', data);
  return response.data;
};

export const updateProject = async (
  id: string,
  data: { name?: string; description?: string; status?: string }
) => {
  const response = await apiClient.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await apiClient.delete(`/projects/${id}`);
  return response.data;
};
