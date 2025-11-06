// ========================================
// PROJECT ROUTES
// ========================================
// CRUD operations for projects

const express = require('express');
const { body } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const prisma = require('../config/database');

const router = express.Router();

// All project routes require authentication
router.use(authenticate);

/**
 * GET /api/projects - Get all projects
 * Returns projects based on user role
 */
router.get('/', async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            tasks: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ projects, count: projects.length });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/projects - Create new project
 * Only ADMIN and MANAGER can create projects
 */
router.post(
  '/',
  authorize('ADMIN', 'MANAGER'),
  [
    body('name').trim().notEmpty().withMessage('Project name is required'),
    body('description').optional().trim()
  ],
  async (req, res, next) => {
    try {
      const { name, description } = req.body;

      const project = await prisma.project.create({
        data: {
          name,
          description,
          ownerId: req.user.id
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      res.status(201).json({
        message: 'Project created successfully',
        project
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/projects/:id - Get project by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        tasks: {
          include: {
            assignee: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/projects/:id - Update project
 * Only project owner or ADMIN can update
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    const projectId = req.params.id;

    // Check if project exists and user has permission
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Only owner or ADMIN can update
    if (existingProject.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to update this project' });
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(status && { status })
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/projects/:id - Delete project
 * Only project owner or ADMIN can delete
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (existingProject.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to delete this project' });
    }

    await prisma.project.delete({
      where: { id: projectId }
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
