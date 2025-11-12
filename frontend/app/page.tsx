// ========================================
// HOME PAGE (Landing Page)
// ========================================

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 shadow-sm backdrop-blur-md'
            : 'bg-background/80 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TaskFlow</span>
            </motion.div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="sm:size-default">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="sm:size-default">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.muted),theme(colors.background))] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-card shadow-xl shadow-primary/10 ring-1 ring-border sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
                Enterprise Task Management
              </Badge>
            </motion.div>
            
            <motion.h1
              className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
              variants={fadeInUp}
            >
              Streamline Your Team's
              <motion.span
                className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {' '}Workflow{' '}
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="mb-10 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground px-4 sm:px-0"
              variants={fadeInUp}
            >
              Enterprise-grade task management platform designed for modern teams. 
              Organize projects, assign tasks, and collaborate seamlessly—all in one place.
            </motion.p>
            
            <motion.div
              className="flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0 sm:flex-row"
              variants={fadeInUp}
            >
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <motion.svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.p
              className="mt-6 text-sm text-muted-foreground"
              variants={fadeIn}
              transition={{ delay: 0.6 }}
            >
              No credit card required • Free 14-day trial • Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="mb-4 text-base font-semibold leading-7 text-primary">
              Everything you need
            </h2>
            <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for Enterprise Teams
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Powerful features to help your team stay organized and productive
            </p>
          </motion.div>
          
          <motion.div
            className="mx-auto mt-16 max-w-5xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <motion.div
                className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border transition-all hover:shadow-lg"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg
                    className="h-6 w-6 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Project Management
                </h3>
                <p className="text-muted-foreground">
                  Organize work into projects with customizable workflows, milestones, and progress tracking.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border transition-all hover:shadow-lg"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg
                    className="h-6 w-6 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Team Collaboration
                </h3>
                <p className="text-muted-foreground">
                  Assign tasks, share updates, and collaborate in real-time with your entire team.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border transition-all hover:shadow-lg"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg
                    className="h-6 w-6 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Role-Based Access
                </h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security with granular permissions and role management.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border transition-all hover:shadow-lg"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg
                    className="h-6 w-6 text-primary-foreground"
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
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Real-Time Updates
                </h3>
                <p className="text-muted-foreground">
                  Stay synchronized with instant notifications and live activity feeds.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div
                className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border transition-all hover:shadow-lg"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg
                    className="h-6 w-6 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Analytics & Reporting
                </h3>
                <p className="text-muted-foreground">
                  Track team performance with detailed analytics and customizable reports.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div
                className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border transition-all hover:shadow-lg"
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg
                    className="h-6 w-6 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Mobile Ready
                </h3>
                <p className="text-muted-foreground">
                  Access your tasks from anywhere with our responsive web application.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by teams worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Join thousands of teams already using TaskFlow to manage their projects
            </p>
          </motion.div>
          <motion.div
            className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 text-center sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.div
              className="rounded-2xl bg-muted/50 p-8"
              variants={scaleIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="text-4xl font-bold text-primary"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                10K+
              </motion.div>
              <div className="mt-2 text-sm font-semibold text-foreground">Active Teams</div>
              <div className="mt-1 text-sm text-muted-foreground">Managing projects daily</div>
            </motion.div>
            <motion.div
              className="rounded-2xl bg-muted/50 p-8"
              variants={scaleIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="text-4xl font-bold text-primary"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                99.9%
              </motion.div>
              <div className="mt-2 text-sm font-semibold text-foreground">Uptime</div>
              <div className="mt-1 text-sm text-muted-foreground">Reliable and secure</div>
            </motion.div>
            <motion.div
              className="rounded-2xl bg-muted/50 p-8"
              variants={scaleIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="text-4xl font-bold text-primary"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                500K+
              </motion.div>
              <div className="mt-2 text-sm font-semibold text-foreground">Tasks Completed</div>
              <div className="mt-1 text-sm text-muted-foreground">Every month</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-primary px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl"
            variants={fadeInUp}
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80"
            variants={fadeInUp}
          >
            Join thousands of teams who trust TaskFlow for their project management needs.
            Start your free trial today.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-4"
            variants={fadeInUp}
          >
            <Link href="/register">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="secondary" className="bg-card text-foreground hover:bg-muted">
                  Start Free Trial
                </Button>
              </motion.div>
            </Link>
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Sign In
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
        <motion.svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="gradient">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#3B82F6" />
            </radialGradient>
          </defs>
        </motion.svg>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border">
        <motion.div
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg
                  className="h-5 w-5 text-primary-foreground"
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
              </div>
              <span className="text-xl font-semibold text-foreground">TaskFlow</span>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              © 2025 TaskFlow. All rights reserved.
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
