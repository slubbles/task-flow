// ========================================
// AUTH STORE (Zustand)
// ========================================
// Global state for authentication

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * WHAT IS THIS?
 * Zustand creates a global state that any component can access
 * 
 * Think of it like:
 * - A global variable that React components can read/write
 * - When it changes, components automatically re-render
 * - Simpler than Redux!
 */

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt?: string;
}

interface AuthState {
  // STATE
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // ACTIONS (functions to modify state)
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

/**
 * CREATE STORE
 * 
 * persist() saves to localStorage
 * So user stays logged in after page refresh
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,

      // Set authentication (after login/register)
      setAuth: (user, token) => {
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update state
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      // Logout
      logout: () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Clear state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      // Update user info
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);

/**
 * HOW TO USE IN COMPONENTS:
 * 
 * import { useAuthStore } from '@/store/auth';
 * 
 * function MyComponent() {
 *   const { user, isAuthenticated, logout } = useAuthStore();
 *   
 *   if (!isAuthenticated) {
 *     return <div>Please login</div>;
 *   }
 *   
 *   return <div>Welcome {user?.name}!</div>;
 * }
 */
