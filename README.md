# 🎯 TaskFlow - Modern Task Management Platform

<div align="center">

![TaskFlow Banner](https://img.shields.io/badge/TaskFlow-Production%20Ready-success?style=for-the-badge)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

**A production-ready, enterprise-level task management system with real-time collaboration, OAuth integration, and responsive design.**

[Live Demo](#) • [Documentation](./docs) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

---

## 🌟 Key Highlights

- 🔐 **Enterprise Authentication** - JWT with automatic token refresh, OAuth (GitHub), email verification
- 📱 **Fully Responsive** - Mobile-first design, works seamlessly on all devices (320px - 4K)
- ⚡ **Modern Stack** - Next.js 16, React 19, TypeScript, Tailwind CSS v4
- 🎨 **Beautiful UI** - Framer Motion animations, shadcn/ui components, smooth transitions
- 🚀 **Production Ready** - Comprehensive error handling, security best practices, optimized performance
- 🧪 **Well Tested** - Backend tested with Jest & Supertest
- 📊 **Scalable Architecture** - Clean code, separation of concerns, RESTful API design

---

## 📸 Screenshots

<div align="center">

### Landing Page
![Landing Page](https://via.placeholder.com/800x450/4F46E5/FFFFFF?text=Landing+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x450/4F46E5/FFFFFF?text=Dashboard)

### Task Management
![Tasks](https://via.placeholder.com/800x450/4F46E5/FFFFFF?text=Task+Management)

### Mobile Responsive
![Mobile](https://via.placeholder.com/400x600/4F46E5/FFFFFF?text=Mobile+View)

</div>

---

## 🛠️ Tech Stack

### Frontend
```
Next.js 16.0         • React 19.2         • TypeScript 5
Tailwind CSS v4      • Framer Motion      • shadcn/ui
Zustand              • Axios              • React Hook Form
```

### Backend
```
Node.js 22           • Express.js 4       • Prisma ORM 5
PostgreSQL 16        • Redis 4            • JWT Auth
Bcrypt               • Passport.js        • Resend (Email)
```

### DevOps & Tools
```
Docker               • Docker Compose     • GitHub Actions
ESLint               • Prettier           • Jest
```

---

## ✨ Features

### 🔐 Authentication & Security
- [x] JWT-based authentication with 30-day expiration
- [x] Automatic token refresh (seamless session management)
- [x] OAuth 2.0 integration (GitHub)
- [x] Email verification system
- [x] Password reset with secure tokens
- [x] Role-based access control (Admin, Manager, Member)
- [x] Bcrypt password hashing
- [x] Protected routes & API endpoints
- [x] CORS configuration
- [x] Helmet.js security headers

### 📊 Project Management
- [x] Create, read, update, delete projects
- [x] Project status tracking (Active, Completed, On Hold, Archived)
- [x] Project ownership & permissions
- [x] Task count per project
- [x] Project detail view with all tasks

### ✅ Task Management
- [x] Full CRUD operations for tasks
- [x] Task status (To Do, In Progress, In Review, Completed)
- [x] Priority levels (Low, Medium, High, Urgent)
- [x] Task assignment to team members
- [x] Due date tracking
- [x] Advanced filtering (status, priority, assignee, project)
- [x] Real-time search functionality
- [x] Task detail modal with all information

### 👤 User Management
- [x] User profile management
- [x] Avatar support
- [x] Password change functionality
- [x] Email management
- [x] Activity tracking
- [x] Role management

### 🎨 UI/UX Features
- [x] Fully responsive design (mobile-first)
- [x] Dark/light mode support
- [x] Smooth Framer Motion animations
- [x] Toast notifications (success, error, info)
- [x] Loading states & skeletons
- [x] Empty states with call-to-actions
- [x] Mobile hamburger menu
- [x] Touch-friendly interface
- [x] Accessible components (ARIA labels)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or higher
- PostgreSQL 16.x
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/slubbles/task-flow.git
   cd task-flow
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**

   **Backend (.env)**
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"

   # JWT
   JWT_SECRET="your-super-secret-jwt-key-change-this"
   JWT_EXPIRES_IN="30d"

   # Email (Resend)
   RESEND_API_KEY="your-resend-api-key"
   EMAIL_FROM="onboarding@yourdomain.com"

   # OAuth GitHub
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   GITHUB_CALLBACK_URL="http://localhost:3001/api/auth/callback/github"

   # App URLs
   FRONTEND_URL="http://localhost:3000"
   BACKEND_URL="http://localhost:3001"

   # Redis (Optional)
   REDIS_URL="redis://localhost:6379"
   ```

   **Frontend (.env.local)**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Set up the database**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the application**

   **Using Docker (Recommended)**
   ```bash
   docker-compose up
   ```

   **Or run manually**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api

---

## 📁 Project Structure

```
task-flow/
├── backend/                    # Express.js Backend
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Database migrations
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Custom middleware
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utility functions
│   │   └── server.js          # Entry point
│   └── tests/                 # Backend tests
│
├── frontend/                   # Next.js Frontend
│   ├── app/                   # App Router pages
│   │   ├── (auth)/           # Auth pages
│   │   ├── dashboard/        # Dashboard
│   │   ├── projects/         # Projects management
│   │   ├── tasks/            # Tasks management
│   │   └── profile/          # User profile
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── *.tsx             # Custom components
│   ├── lib/                   # Utilities
│   │   └── api/              # API client
│   ├── store/                 # Zustand stores
│   └── types/                 # TypeScript types
│
├── docs/                       # Documentation
├── docker-compose.yml         # Docker configuration
└── README.md                  # This file
```

---

## 🔌 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
POST   /api/auth/refresh           # Refresh JWT token
POST   /api/auth/logout            # Logout user
POST   /api/auth/verify-email      # Verify email address
POST   /api/auth/forgot-password   # Request password reset
POST   /api/auth/reset-password    # Reset password
PUT    /api/auth/change-password   # Change password
PUT    /api/auth/profile           # Update profile
```

### OAuth Endpoints
```
GET    /api/oauth/github           # GitHub OAuth login
GET    /api/auth/callback/github   # GitHub OAuth callback
```

### Project Endpoints
```
GET    /api/projects               # Get all projects
GET    /api/projects/:id           # Get project by ID
POST   /api/projects               # Create new project
PUT    /api/projects/:id           # Update project
DELETE /api/projects/:id           # Delete project
```

### Task Endpoints
```
GET    /api/tasks                  # Get all tasks (with filters)
GET    /api/tasks/:id              # Get task by ID
POST   /api/tasks                  # Create new task
PUT    /api/tasks/:id              # Update task
DELETE /api/tasks/:id              # Delete task
```

### User Endpoints
```
GET    /api/users                  # Get all users
```

**📖 Full API documentation:** See [API.md](./docs/API.md)

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

---

## 🚀 Deployment

### Backend (Railway/Render)
1. Create a new project
2. Connect your GitHub repository
3. Add environment variables
4. Deploy

### Frontend (Vercel)
1. Import your GitHub repository
2. Select Next.js framework
3. Add environment variables
4. Deploy

**Detailed deployment guide:** See [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is [MIT](./LICENSE) licensed.

---

## 👨‍💻 Author

**Idderf Salem**

- GitHub: [@slubbles](https://github.com/slubbles)
- LinkedIn: [Your LinkedIn](#)
- Portfolio: [Your Portfolio](#)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for the Web
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Idderf Salem](https://github.com/slubbles)

[⬆ Back to Top](#-taskflow---modern-task-management-platform)

