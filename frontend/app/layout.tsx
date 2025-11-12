import type { Metadata } from "next";
import { Montserrat, Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

// Graphite theme fonts
const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskFlow - Modern Task Management Platform",
  description: "Streamline your team's workflow with TaskFlow - a modern, full-stack task management platform with GitHub OAuth, email verification, and beautiful animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${firaCode.variable} ${inter.variable} antialiased font-sans`}
      >
        <ErrorBoundary>
          {children}
          <Toaster 
            position="top-right" 
            richColors 
            expand={true}
            duration={4000}
            closeButton
            toastOptions={{
              style: {
                background: 'var(--card)',
                color: 'var(--card-foreground)',
                border: '1px solid var(--border)',
                padding: '16px',
              },
              className: 'text-sm font-medium',
            }}
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
