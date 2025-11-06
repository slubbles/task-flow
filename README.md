# 🚀 Enterprise Task Management Platform

A full-stack task management and team collaboration platform built with modern technologies. This project demonstrates enterprise-level backend development practices, from authentication to database design.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Learning Path](#learning-path)

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js 22
- **Framework:** Express.js
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Caching:** Redis
- **Testing:** Jest + Supertest
- **Security:** bcryptjs, helmet, cors

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form + Zod

### DevOps
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Code Quality:** ESLint, Prettier

## ✨ Features

### Authentication & Authorization
- ✅ User registration with email/password
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin, Manager, Member)
- ✅ Secure password hashing with bcrypt
- ✅ Protected routes middleware

### Project Management
- ✅ Create, read, update, delete projects
- ✅ Project ownership and permissions
- ✅ Project status tracking (Active, Completed, On Hold, Archived)
- ✅ Task count per project

### Task Management
- ✅ CRUD operations for tasks
- ✅ Task assignment to team members
- ✅ Priority levels (Low, Medium, High, Urgent)
- ✅ Status workflow (To Do, In Progress, In Review, Completed)
- ✅ Due date tracking
- ✅ Task filtering by project, status, assignee, priority

### Collaboration
- ✅ Comments on tasks
- ✅ Activity logs for audit trail
- ✅ User profiles

### Coming Soon
- 🔄 Real-time updates (WebSockets)
- 🔄 File attachments
- 🔄 Email notifications
- 🔄 Advanced search
- 🔄 Team management
- 🔄 Dashboard analytics

## 📁 Project Structure

```
learning-traditional-backend/
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── config/            # Database connection, config files
│   │   ├── controllers/       # Request handlers (business logic)
│   │   ├── middleware/        # Auth, error handling, validation
│   │   ├── routes/            # API endpoints definition
│   │   ├── services/          # Reusable business logic
│   │   ├── utils/             # Helper functions, logger
│   │   └── server.js          # Express app entry point
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── tests/                 # Jest test files
│   ├── .env                   # Environment variables
│   ├── Dockerfile             # Backend container config
│   └── package.json
│
├── frontend/                   # Next.js frontend
│   ├── app/                   # Next.js App Router pages
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── dashboard/        # Main dashboard
│   │   └── page.tsx          # Home/landing page
│   ├── components/
│   │   └── ui/               # shadcn/ui components
│   ├── lib/
│   │   └── api/              # API client functions
│   ├── store/                # Zustand state management
│   ├── types/                # TypeScript type definitions
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml         # Multi-container setup
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22+ ([Download](https://nodejs.org/))
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/slubbles/learning-traditional-backend.git
   cd learning-traditional-backend
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env if needed (defaults work for Docker)
   
   # Frontend
   cd ../frontend
   cp .env.example .env.local
   cd ..
   ```

3. **Start with Docker (Recommended)**
   ```bash
   # Start all services (backend, frontend, database, redis)
   docker-compose up --build
   
   # In another terminal, run database migrations
   docker exec -it taskmanagement-backend npx prisma migrate dev --name init
   ```

   Services will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379

4. **OR Run locally (without Docker)**

   **Backend:**
   ```bash
   cd backend
   npm install
   
   # Set up local PostgreSQL and update .env with your credentials
   # DATABASE_URL="postgresql://user:password@localhost:5432/taskmanagement"
   
   npx prisma migrate dev --name init
   npx prisma generate
   
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### First Steps

1. Open http://localhost:3000
2. Click "Get Started Free"
3. Register a new account
4. You'll be redirected to the dashboard
5. Start exploring!

## 📡 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me          # Requires auth
PUT  /api/auth/profile     # Requires auth
```

### Project Endpoints

```http
GET    /api/projects       # Requires auth
POST   /api/projects       # Requires auth (Manager/Admin)
GET    /api/projects/:id   # Requires auth
PUT    /api/projects/:id   # Requires auth (Owner/Admin)
DELETE /api/projects/:id   # Requires auth (Owner/Admin)
```

### Task Endpoints

```http
GET    /api/tasks          # Requires auth, supports filtering
POST   /api/tasks          # Requires auth
GET    /api/tasks/:id      # Requires auth
PUT    /api/tasks/:id      # Requires auth
DELETE /api/tasks/:id      # Requires auth
POST   /api/tasks/:id/comments  # Requires auth
```

### Example: Login Request

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "MEMBER"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example: Create Project (with auth)

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Website Redesign",
    "description": "Complete redesign of company website"
  }'
```

## 📚 Learning Path

### Phase 1: Foundation (Beginner)
- [x] Project setup with Express.js
- [x] Database design with Prisma
- [x] User authentication (JWT)
- [x] Basic CRUD operations
- [x] Docker containerization
- [x] Next.js frontend setup

### Phase 2: Intermediate
- [ ] File upload system
- [ ] Email notifications
- [ ] Advanced filtering & pagination
- [ ] Redis caching implementation
- [ ] API rate limiting
- [ ] Comprehensive testing

### Phase 3: Advanced
- [ ] WebSocket real-time features
- [ ] Microservices architecture
- [ ] Advanced search (Elasticsearch)
- [ ] Performance optimization
- [ ] Load balancing
- [ ] CI/CD pipeline completion

### Phase 4: Production Ready
- [ ] Error monitoring (Sentry)
- [ ] Performance monitoring
- [ ] Database optimization
- [ ] Security hardening
- [ ] Cloud deployment (AWS/Digital Ocean)
- [ ] Documentation (Swagger/OpenAPI)

## 🧪 Running Tests

```bash
cd backend
npm test

# With coverage
npm test -- --coverage

# Watch mode
npm run test:watch
```

## 🔑 Key Concepts Explained

### MVC Architecture
- **Models** (Prisma schema): Data structure
- **Views** (Next.js): What user sees
- **Controllers** (Express): Business logic

### RESTful API
- Uses HTTP methods: GET (read), POST (create), PUT (update), DELETE (delete)
- Resources accessed via URLs: `/api/projects`, `/api/tasks`
- Stateless: Each request independent

### JWT Authentication
1. User logs in with email/password
2. Server verifies and creates JWT token
3. Token sent to frontend
4. Frontend includes token in subsequent requests
5. Server verifies token before processing request

### Middleware
Functions that run before your route handlers:
- **Authentication**: Verify user is logged in
- **Authorization**: Check user has permission
- **Validation**: Ensure data is correct
- **Logging**: Record requests

### Database Relationships
- **One-to-Many**: One user owns many projects
- **Many-to-Many**: (Future) Projects have many users, users in many projects
- **Foreign Keys**: Link tables together

## 🐛 Troubleshooting

### Database connection issues
```bash
# Check if PostgreSQL container is running
docker ps

# View logs
docker logs taskmanagement-db

# Recreate database
docker-compose down -v
docker-compose up -d postgres
docker exec -it taskmanagement-backend npx prisma migrate dev
```

### Frontend can't reach backend
- Ensure both services are running
- Check NEXT_PUBLIC_API_URL in frontend/.env.local
- Verify CORS settings in backend

### Port already in use
```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process or change port in .env
```

## 🤝 Contributing

This is a learning project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning!

## 🎯 What You'll Learn

By building this project, you'll master:

✅ **Backend Development**
- RESTful API design
- Database modeling & relationships
- Authentication & authorization
- Middleware patterns
- Error handling
- Security best practices

✅ **Frontend Development**
- Next.js App Router
- TypeScript
- State management
- Form handling
- API integration
- Modern UI with Tailwind & shadcn/ui

✅ **DevOps**
- Docker containerization
- Multi-service orchestration
- Environment configuration
- CI/CD pipelines

✅ **Software Engineering**
- Project structure
- Code organization
- Testing strategies
- Documentation
- Version control

---

**Built with ❤️ for learning traditional backend development**

Questions? Open an issue or reach out!
