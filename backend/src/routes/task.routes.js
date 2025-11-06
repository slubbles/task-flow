// ========================================
// TASK ROUTES
// ========================================
// CRUD operations for tasks

const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/auth.middleware');
const prisma = require('../config/database');

const router = express.Router();

// All task routes require authentication
router.use(authenticate);

/**
 * GET /api/tasks - Get all tasks
 * Query params: ?projectId=xxx&status=TODO&assigneeId=xxx
 */
router.get('/', async (req, res, next) => {
  try {
    const { projectId, status, assigneeId, priority } = req.query;

    // Build filter object
    const where = {};
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (assigneeId) where.assigneeId = assigneeId;
    if (priority) where.priority = priority;

    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ tasks, count: tasks.length });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/tasks - Create new task
 */
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Task title is required'),
    body('projectId').notEmpty().withMessage('Project ID is required'),
    body('description').optional().trim(),
    body('assigneeId').optional(),
    body('dueDate').optional().isISO8601(),
    body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  ],
  async (req, res, next) => {
    try {
      const { title, description, projectId, assigneeId, dueDate, priority } = req.body;

      // Verify project exists
      const project = await prisma.project.findUnique({
        where: { id: projectId }
      });

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const task = await prisma.task.create({
        data: {
          title,
          description,
          projectId,
          creatorId: req.user.id,
          ...(assigneeId && { assigneeId }),
          ...(dueDate && { dueDate: new Date(dueDate) }),
          ...(priority && { priority })
        },
        include: {
          project: {
            select: {
              id: true,
              name: true
            }
          },
          assignee: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          creator: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      res.status(201).json({
        message: 'Task created successfully',
        task
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/tasks/:id - Get task by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/tasks/:id - Update task
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, status, priority, assigneeId, dueDate } = req.body;
    const taskId = req.params.id;

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(assigneeId !== undefined && { assigneeId }),
        ...(dueDate && { dueDate: new Date(dueDate) })
      },
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/tasks/:id - Delete task
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id: taskId }
    });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/tasks/:id/comments - Add comment to task
 */
router.post('/:id/comments', async (req, res, next) => {
  try {
    const { content } = req.body;
    const taskId = req.params.id;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        taskId,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Comment added successfully',
      comment
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
