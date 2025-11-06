// ========================================
// TASKS PAGE
// ========================================
// View and manage all tasks

'use client';

import { useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useTasksStore } from '@/store/tasks';
import { getTasks } from '@/lib/api/tasks';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

export default function TasksPage() {
  const { tasks, setTasks, isLoading, setLoading } = useTasksStore();
  const { user } = useAuthStore();

  // Fetch tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (err: any) {
      console.error('Failed to load tasks:', err);
      toast.error('Failed to Load Tasks', {
        description: err.response?.data?.error || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'destructive';
      case 'HIGH':
        return 'default';
      case 'MEDIUM':
        return 'secondary';
      case 'LOW':
        return 'outline';
      default:
        return 'outline';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'default';
      case 'IN_PROGRESS':
        return 'secondary';
      case 'IN_REVIEW':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto p-6">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Tasks</h1>
              <p className="text-gray-600">Manage all your tasks</p>
            </div>
            <Button>Create Task</Button>
          </div>

          {/* Tasks List */}
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="mt-2 h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                    <Skeleton className="mt-4 h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <Card>
              <CardContent className="flex min-h-[200px] items-center justify-center">
                <div className="text-center">
                  <p className="mb-4 text-gray-500">No tasks yet</p>
                  <Button>Create Your First Task</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="line-clamp-2">{task.title}</CardTitle>
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {task.description || 'No description'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge variant={getStatusColor(task.status)}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      {task.assigneeId && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Assigned:</span>
                          <span className="text-sm">{task.assigneeId === user?.id ? 'You' : 'Team member'}</span>
                        </div>
                      )}
                      
                      {task.dueDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Due:</span>
                          <span className="text-sm">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
