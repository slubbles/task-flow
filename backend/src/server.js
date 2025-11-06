// ========================================
// MAIN SERVER FILE
// ========================================
// This is the entry point of your backend application

// Load environment variables from .env file
// This must be first!
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes (we'll create these next)
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');

// Import middleware
const errorHandler = require('./middleware/error.middleware');
const logger = require('./utils/logger');

// ========================================
// CREATE EXPRESS APP
// ========================================
const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// MIDDLEWARE
// ========================================
// Middleware runs BEFORE your route handlers
// Think of it as security checkpoints before entering a building

// 1. HELMET - Adds security headers
//    Protects against common web vulnerabilities
app.use(helmet());

// 2. CORS - Allow frontend to access this API
//    Without this, browsers block requests from different origins
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true  // Allow cookies
}));

// 3. BODY PARSERS - Convert request body to JavaScript objects
//    Express needs this to read JSON from requests
app.use(express.json());  // For JSON payloads
app.use(express.urlencoded({ extended: true }));  // For form submissions

// 4. MORGAN - Log HTTP requests
//    Logs every request (GET /api/users, POST /api/login, etc.)
//    'dev' format shows: METHOD URL STATUS RESPONSE_TIME
app.use(morgan('dev'));

// ========================================
// ROUTES
// ========================================
// Routes define your API endpoints

// Health check endpoint
// Used to verify server is running
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Task Management API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);      // Authentication: /api/auth/login, /api/auth/register
app.use('/api/users', userRoutes);     // User management: /api/users/profile, etc.
app.use('/api/projects', projectRoutes); // Projects: /api/projects, /api/projects/:id
app.use('/api/tasks', taskRoutes);     // Tasks: /api/tasks, /api/tasks/:id

// 404 handler - No matching route found
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// ========================================
// ERROR HANDLER
// ========================================
// This catches all errors that happen in routes
// Must be last middleware!
app.use(errorHandler);

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  // In production, you might want to exit the process
  // process.exit(1);
});

module.exports = app;  // Export for testing
