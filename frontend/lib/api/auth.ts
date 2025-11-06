// ========================================
// AUTH API FUNCTIONS
// ========================================
// Functions to call authentication endpoints

import apiClient from './client';

/**
 * TYPES
 * Define what data looks like
 */
export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
  };
  token: string;
}

/**
 * REGISTER NEW USER
 * POST /api/auth/register
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

/**
 * LOGIN USER
 * POST /api/auth/login
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

/**
 * GET CURRENT USER PROFILE
 * GET /api/auth/me
 */
export const getProfile = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

/**
 * UPDATE USER PROFILE
 * PUT /api/auth/profile
 */
export const updateProfile = async (data: { name?: string; avatar?: string }) => {
  const response = await apiClient.put('/auth/profile', data);
  return response.data;
};
