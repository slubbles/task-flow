// ========================================
// PRISMA CLIENT SINGLETON
// ========================================
// This creates ONE instance of Prisma Client
// Reusing the same instance is more efficient

const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

// Create Prisma instance
// In development, log all queries to see what's happening
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn']  // Log SQL queries in dev
    : ['error']  // Only log errors in production
});

// Test database connection
prisma.$connect()
  .then(() => {
    logger.info('✅ Database connected successfully');
  })
  .catch((err) => {
    logger.error('❌ Database connection failed:', err);
    process.exit(1);  // Exit if can't connect to database
  });

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  logger.info('Database disconnected');
});

module.exports = prisma;
