// ========================================
// TASKS API
// ========================================

import apiClient from './client';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: string;
  projectId: string;
  assigneeId?: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export const getTasks = async (filters?: {
  projectId?: string;
  status?: string;
  assigneeId?: string;
  priority?: string;
}) => {
  const response = await apiClient.get('/tasks', { params: filters });
  return response.data;
};

export const getTask = async (id: string) => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (data: {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  dueDate?: string;
  priority?: string;
}) => {
  const response = await apiClient.post('/tasks', data);
  return response.data;
};

export const updateTask = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    assigneeId?: string;
    dueDate?: string;
  }
) => {
  const response = await apiClient.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
};

export const addComment = async (taskId: string, content: string) => {
  const response = await apiClient.post(`/tasks/${taskId}/comments`, { content });
  return response.data;
};
