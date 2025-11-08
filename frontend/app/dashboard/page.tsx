// ========================================
// DASHBOARD PAGE
// ========================================
// Main page after login - shows projects and tasks

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import { getProjects } from '@/lib/api/projects';
import { getTasks } from '@/lib/api/tasks';
import { toast } from 'sonner';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    myTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    todoTasks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [projectsData, tasksData] = await Promise.all([
        getProjects(),
        getTasks(),
      ]);

      const myTasks = tasksData.tasks.filter((task: any) => task.assigneeId === user?.id);
      const completedTasks = tasksData.tasks.filter((task: any) => task.status === 'COMPLETED');
      const inProgressTasks = tasksData.tasks.filter((task: any) => task.status === 'IN_PROGRESS');
      const todoTasks = tasksData.tasks.filter((task: any) => task.status === 'TODO');

      setStats({
        totalProjects: projectsData.projects.length,
        totalTasks: tasksData.tasks.length,
        myTasks: myTasks.length,
        completedTasks: completedTasks.length,
        inProgressTasks: inProgressTasks.length,
        todoTasks: todoTasks.length,
      });
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err);
      toast.error('Failed to Load Dashboard', {
        description: 'Some data may not be displayed correctly',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />

        {/* Main Content */}
        <main className="container mx-auto p-6">
        <motion.div
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="mb-2 text-3xl font-bold">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h2>
          <p className="text-gray-600">Here's what's happening with your projects today</p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Stats Cards */}
          <motion.div variants={scaleIn}>
            <Card className="overflow-hidden border-l-4 border-l-blue-600 transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Projects</CardTitle>
                  <motion.div
                    className="rounded-full bg-blue-100 p-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </motion.div>
                </div>
              </CardHeader>
                            <CardContent>
                <motion.p
                  className="text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {isLoading ? <Skeleton className="h-12 w-16" /> : stats.totalProjects}
                </motion.p>
                <p className="mt-2 text-sm text-gray-500">Active projects</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Card className="overflow-hidden border-l-4 border-l-green-600 transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Tasks</CardTitle>
                  <motion.div
                    className="rounded-full bg-green-100 p-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent>
                <motion.p
                  className="text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {isLoading ? <Skeleton className="h-12 w-16" /> : stats.totalTasks}
                </motion.p>
                <p className="mt-2 text-sm text-gray-500">All tasks</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Card className="overflow-hidden border-l-4 border-l-purple-600 transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">My Tasks</CardTitle>
                  <motion.div
                    className="rounded-full bg-purple-100 p-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="h-5 w-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent>
                <motion.p
                  className="text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {isLoading ? <Skeleton className="h-12 w-16" /> : stats.myTasks}
                </motion.p>
                <p className="mt-2 text-sm text-gray-500">Assigned to you</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Task Status Breakdown */}
          <motion.div variants={scaleIn}>
            <Card className="overflow-hidden border-l-4 border-l-orange-600 transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">To Do</CardTitle>
                  <motion.div
                    className="rounded-full bg-orange-100 p-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      className="h-5 w-5 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent>
                <motion.p
                  className="text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {isLoading ? <Skeleton className="h-12 w-16" /> : stats.todoTasks}
                </motion.p>
                <p className="mt-2 text-sm text-gray-500">Tasks pending</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Card className="overflow-hidden border-l-4 border-l-yellow-600 transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
                  <motion.div
                    className="rounded-full bg-yellow-100 p-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      className="h-5 w-5 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent>
                <motion.p
                  className="text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {isLoading ? <Skeleton className="h-12 w-16" /> : stats.inProgressTasks}
                </motion.p>
                <p className="mt-2 text-sm text-gray-500">Tasks in progress</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Card className="overflow-hidden border-l-4 border-l-emerald-600 transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
                  <motion.div
                    className="rounded-full bg-emerald-100 p-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      className="h-5 w-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent>
                <motion.p
                  className="text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {isLoading ? <Skeleton className="h-12 w-16" /> : stats.completedTasks}
                </motion.p>
                <p className="mt-2 text-sm text-gray-500">Tasks completed</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          className="mt-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-2 border-dashed border-gray-200 bg-white/50 backdrop-blur transition-all hover:border-blue-300 hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Quick Actions
              </CardTitle>
              <CardDescription>Get started with your work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="gap-2">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      View Projects
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/tasks">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" className="gap-2">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      View Tasks
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      </div>
    </ProtectedRoute>
  );
}
