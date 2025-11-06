// ========================================
// API CLIENT
// ========================================
// Axios instance configured to talk to your Express backend

import axios from 'axios';

/**
 * WHAT IS THIS?
 * This creates a configured axios instance that:
 * 1. Points to your backend API
 * 2. Automatically adds auth token to requests
 * 3. Handles errors consistently
 */

// Base URL of your backend API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

/**
 * REQUEST INTERCEPTOR
 * Runs BEFORE every request
 * Adds JWT token to Authorization header
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    // (We'll store it there after login)
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * Runs AFTER every request
 * Handles errors globally
 */
apiClient.interceptors.response.use(
  (response) => {
    // If successful, just return the data
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response?.status === 401) {
      // Unauthorized - token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
