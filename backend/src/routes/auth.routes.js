// ========================================
// AUTHENTICATION ROUTES
// ========================================
// Defines endpoints for auth operations

const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { requestPasswordReset, resetPassword } = require('../services/password-reset.service');

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

// PUT /api/auth/change-password - Change password (protected route)
router.put('/change-password', authenticate, authController.changePassword);

// GET /api/auth/verify-email/:token - Verify email address (public)
router.get('/verify-email/:token', authController.verifyEmail);

// POST /api/auth/forgot-password - Request password reset
router.post(
  '/forgot-password',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail()
  ],
  async (req, res, next) => {
    try {
      const { email } = req.body;
      await requestPasswordReset(email);
      
      res.json({
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/auth/reset-password - Reset password with token
router.post(
  '/reset-password',
  [
    body('token')
      .notEmpty()
      .withMessage('Reset token is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      await resetPassword(token, password);
      
      res.json({
        message: 'Password has been reset successfully. You can now login with your new password.'
      });
    } catch (error) {
      if (error.message === 'Invalid or expired reset token') {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  }
);

module.exports = router;
