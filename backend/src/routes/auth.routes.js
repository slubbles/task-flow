// ========================================
// AUTHENTICATION ROUTES
// ========================================
// Defines endpoints for auth operations

const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * VALIDATION RULES
 * These run before the controller
 * Checks if input is valid
 */
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * ROUTES
 */

// POST /api/auth/register - Register new user
router.post('/register', registerValidation, authController.register);

// POST /api/auth/login - Login user
router.post('/login', loginValidation, authController.login);

// GET /api/auth/me - Get current user (protected route)
// authenticate middleware checks if user is logged in
router.get('/me', authenticate, authController.getProfile);

// PUT /api/auth/profile - Update profile (protected route)
router.put('/profile', authenticate, authController.updateProfile);

module.exports = router;
