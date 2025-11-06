// ========================================
// HOME PAGE (Landing Page)
// ========================================

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900 sm:text-6xl">
          Task Management Platform
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Streamline your team's workflow with our enterprise-grade task management solution.
          Create projects, assign tasks, and collaborate in real-time.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started Free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Login
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">Project Management</h3>
            <p className="text-gray-600">
              Organize work into projects with customizable workflows
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">Team Collaboration</h3>
            <p className="text-gray-600">
              Assign tasks, add comments, and track progress together
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">Real-time Updates</h3>
            <p className="text-gray-600">
              Stay synced with instant notifications and activity logs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
