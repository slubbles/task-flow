// ========================================
// DASHBOARD PAGE
// ========================================
// Main page after login - shows projects and tasks

'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Main Content */}
        <main className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-600">Manage your projects and tasks</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Total Projects</CardTitle>
              <CardDescription>Active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Tasks assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
              <CardDescription>Tasks completed this week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with your work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Link href="/projects">
                  <Button>View Projects</Button>
                </Link>
                <Link href="/tasks">
                  <Button variant="outline">View Tasks</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      </div>
    </ProtectedRoute>
  );
}
