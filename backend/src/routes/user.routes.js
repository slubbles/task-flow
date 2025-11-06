// ========================================
// USER ROUTES
// ========================================
// Manage users (admin functionality)

const express = require('express');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const prisma = require('../config/database');

const router = express.Router();

/**
 * GET /api/users - Get all users
 * Only ADMIN and MANAGER can access
 */
router.get('/', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ users, count: users.length });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/users/:id - Get user by ID
 */
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true,
        _count: {
          select: {
            ownedProjects: true,
            assignedTasks: true,
            createdTasks: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
