// ========================================
// TASKS STORE
// ========================================

import { create } from 'zustand';
import { Task } from '@/lib/api/tasks';

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  filters: {
    projectId?: string;
    status?: string;
    assigneeId?: string;
    priority?: string;
  };
  
  setTasks: (tasks: Task[]) => void;
  setCurrentTask: (task: Task | null) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  removeTask: (id: string) => void;
  setFilters: (filters: TasksState['filters']) => void;
  setLoading: (loading: boolean) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  currentTask: null,
  isLoading: false,
  filters: {},

  setTasks: (tasks) => set({ tasks }),
  
  setCurrentTask: (task) => set({ currentTask: task }),
  
  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),
  
  updateTask: (id, data) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...data } : t
      ),
      currentTask:
        state.currentTask?.id === id
          ? { ...state.currentTask, ...data }
          : state.currentTask,
    })),
  
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
      currentTask:
        state.currentTask?.id === id ? null : state.currentTask,
    })),
  
  setFilters: (filters) => set({ filters }),
  
  setLoading: (loading) => set({ isLoading: loading }),
}));
