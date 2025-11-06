// ========================================
// AUTHENTICATION CONTROLLER
// ========================================
// Handles user registration, login, and profile

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const prisma = require('../config/database');
const logger = require('../utils/logger');

/**
 * REGISTER NEW USER
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    // 1. Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email already exists' 
      });
    }

    // 3. Hash password
    // NEVER store plain passwords!
    // bcrypt adds salt and hashes - very secure
    const hashedPassword = await bcrypt.hash(password, 10);
    // 10 = salt rounds (higher = more secure but slower)

    // 4. Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'MEMBER'  // Default role
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
        // Don't return password!
      }
    });

    // 5. Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },  // Payload (data stored in token)
      process.env.JWT_SECRET,                  // Secret key
      { expiresIn: process.env.JWT_EXPIRES_IN } // Token expires in 7 days
    );

    logger.info(`New user registered: ${email}`);

    // 6. Send response
    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });

  } catch (error) {
    next(error);  // Pass to error handler
  }
};

/**
 * LOGIN USER
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    // 1. Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // 2. Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // 3. Compare passwords
    // bcrypt.compare hashes the input and compares with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // 4. Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    logger.info(`User logged in: ${email}`);

    // 5. Send response (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    next(error);
  }
};

/**
 * GET CURRENT USER PROFILE
 * GET /api/auth/me
 * Requires authentication
 */
const getProfile = async (req, res, next) => {
  try {
    // req.user is set by authenticate middleware
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({ user });

  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE USER PROFILE
 * PUT /api/auth/profile
 * Requires authentication
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    // Update only allowed fields
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name && { name }),
        ...(avatar && { avatar })
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        updatedAt: true
      }
    });

    logger.info(`User profile updated: ${req.user.email}`);

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
