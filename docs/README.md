# 📚 TaskFlow Documentation

Welcome to the TaskFlow documentation! This folder contains detailed guides for development, deployment, and testing.

## 📖 Available Documentation

### 🚀 [Deployment Guide](./DEPLOYMENT_ENV_VARS.md)
Complete guide for deploying TaskFlow to production, including:
- Environment variables configuration
- Database setup
- OAuth configuration
- Email service setup
- Deployment platforms (Vercel, Railway, Render)

### 📱 [Mobile Optimization Summary](./MOBILE_OPTIMIZATION_SUMMARY.md)
Details about the mobile-responsive design implementation:
- Responsive breakpoints used
- Mobile-first approach
- Component-by-component optimization
- Testing recommendations

### ✅ [Testing Checklist](./TESTING_CHECKLIST.md)
Comprehensive testing checklist covering:
- Manual testing scenarios
- Feature verification
- Edge cases
- Browser compatibility
- Mobile testing

### 🧪 [Testing Guide](./TESTING_GUIDE.md)
Technical testing documentation:
- Backend testing with Jest
- API endpoint testing
- Frontend testing strategies
- E2E testing setup

---

## 🔗 Quick Links

- [Main README](../README.md) - Project overview and getting started
- [Backend API Routes](../backend/src/routes/) - API implementation
- [Frontend Components](../frontend/components/) - React components
- [Database Schema](../backend/prisma/schema.prisma) - Prisma schema

---

## 📝 Additional Resources

### API Documentation
For API endpoint details, see the route files:
- `backend/src/routes/auth.routes.js` - Authentication endpoints
- `backend/src/routes/project.routes.js` - Project management endpoints
- `backend/src/routes/task.routes.js` - Task management endpoints
- `backend/src/routes/user.routes.js` - User management endpoints

### Database Schema
The complete database schema with relationships is available at:
`backend/prisma/schema.prisma`

### Configuration Files
- `backend/.env` - Backend environment variables
- `frontend/.env.local` - Frontend environment variables
- `docker-compose.yml` - Docker configuration

---

<div align="center">

**Need help?** [Open an issue](../../issues) or check the main [README](../README.md)

</div>
