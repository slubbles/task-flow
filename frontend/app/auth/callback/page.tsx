'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import apiClient from '@/lib/api/client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

/**
 * OAuth Callback Handler
 * Receives token from backend after successful OAuth login
 */

/**
 * OAuth Callback Handler
 * Receives token from backend after successful OAuth login
 */
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      // Handle OAuth errors
      let errorMessage = 'Authentication failed';
      let errorDescription = 'Please try again';
      
      switch (errorParam) {
        case 'no_email_from_github':
          errorMessage = 'GitHub Email Required';
          errorDescription = 'Your GitHub account must have a public email address. Please update your GitHub profile settings and try again.';
          break;
        case 'email_already_exists':
          errorMessage = 'Account Already Exists';
          errorDescription = 'An account with this email already exists. Please login with your email and password, or contact support to link your GitHub account.';
          break;
        case 'oauth_failed':
          errorMessage = 'GitHub Authentication Failed';
          errorDescription = 'Unable to authenticate with GitHub. Please try again or use email login.';
          break;
        case 'oauth_no_user':
          errorMessage = 'Account Creation Failed';
          errorDescription = 'We could not create your account. Please try again or use email registration.';
          break;
        case 'token_generation_failed':
          errorMessage = 'Session Error';
          errorDescription = 'Failed to create your session. Please try logging in again.';
          break;
        default:
          errorMessage = 'Authentication Error';
          errorDescription = 'An unexpected error occurred during authentication. Please try again.';
      }
      
      setError(`${errorMessage}|${errorDescription}`);
      
      // Redirect to login after 5 seconds
      setTimeout(() => {
        router.push('/login');
      }, 5000);
      
      return;
    }

    if (token) {
      // Simulate progress animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 150);

      // Complete OAuth sign in
      const completeSignIn = async () => {
        try {
          // Decode JWT to get user ID (without verification - just for display)
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          const decoded = JSON.parse(jsonPayload);

          // Fetch user details from /users/:id endpoint
          const response = await apiClient.get(`/users/${decoded.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          // Complete progress
          clearInterval(progressInterval);
          setProgress(100);
          
          // Store user and token
          setAuth(response.data.user, token);
          
          // Show success state briefly
          setSuccess(true);
          
          // Redirect after success animation
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        } catch (err: any) {
          console.error('Failed to complete OAuth sign in:', err);
          clearInterval(progressInterval);
          setError('Session Error|Failed to complete sign in. Please try again.');
          setTimeout(() => router.push('/login'), 5000);
        }
      };

      completeSignIn();

      return () => clearInterval(progressInterval);
    } else {
      // No token received - redirect to login
      router.push('/login');
    }
  }, [searchParams, setAuth, router]);

  // Error State
  if (error) {
    const [errorTitle, errorDesc] = error.split('|');
    
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md text-center"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6 inline-block rounded-full bg-red-100 p-6"
          >
            <svg
              className="h-16 w-16 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-3 text-3xl font-bold text-foreground">{errorTitle}</h2>
            <p className="mb-6 text-lg text-muted-foreground">{errorDesc}</p>
            
            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Redirecting to login...</span>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => router.push('/login')}
                className="w-full sm:w-auto"
              >
                Go to Login
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Success State
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="mb-6 inline-block rounded-full bg-green-100 p-6"
          >
            <motion.svg
              className="h-16 w-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-2 text-3xl font-bold text-foreground">Welcome! 🎉</h2>
            <p className="text-lg text-muted-foreground">Redirecting to your dashboard...</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Loading State
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        {/* Animated Logo/Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mb-6 inline-block"
        >
          <div className="relative h-20 w-20">
            <motion.div
              className="absolute inset-0 rounded-full bg-primary opacity-25"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-10 w-10 text-primary"
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
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-3 text-3xl font-bold text-foreground"
        >
          Completing Sign In
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-lg text-muted-foreground"
        >
          Setting up your account...
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto w-full max-w-xs"
        >
          <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{progress}% complete</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
