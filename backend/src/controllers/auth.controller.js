// ========================================
// AUTHENTICATION CONTROLLER
// ========================================
// Handles user registration, login, and profile

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const prisma = require('../config/database');
const logger = require('../utils/logger');
const { sendVerificationEmail, sendWelcomeEmail } = require('../services/email.service');

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

    // 4. Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // 5. Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'MEMBER',  // Default role
        emailVerified: false,  // Not verified yet
        verificationToken,
        verificationTokenExpiry
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true
        // Don't return password or tokens!
      }
    });

    // 6. Send verification email
    try {
      await sendVerificationEmail(email, name, verificationToken);
      logger.info(`Verification email sent to ${email}`);
    } catch (emailError) {
      logger.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails - user can request new email later
    }

    logger.info(`New user registered: ${email} (email verification required)`);

    // 7. Send response (NO TOKEN - must verify email first)
    res.status(201).json({
      message: 'Registration successful! Please check your email to verify your account.',
      user,
      requiresVerification: true
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

    // 3. Check if email is verified
    if (!user.emailVerified && user.provider !== 'github') {
      // OAuth users are auto-verified, but email/password users must verify
      return res.status(403).json({ 
        error: 'Please verify your email before logging in. Check your inbox for the verification link.',
        requiresVerification: true
      });
    }

    // 4. Compare passwords
    // bcrypt.compare hashes the input and compares with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password || '');

    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // 5. Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    logger.info(`User logged in: ${email}`);

    // 6. Send response (without password)
    const { password: _, verificationToken: __, verificationTokenExpiry: ___, ...userWithoutPassword } = user;
    
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

/**
 * VERIFY EMAIL
 * GET /api/auth/verify-email/:token
 */
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    // 1. Find user with this verification token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: {
          gt: new Date() // Token must not be expired
        }
      }
    });

    if (!user) {
      return res.status(400).json({ 
        error: 'Invalid or expired verification token. Please request a new verification email.' 
      });
    }

    // 2. Mark user as verified and clear token
    const verifiedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true
      }
    });

    // 3. Send welcome email
    try {
      await sendWelcomeEmail(verifiedUser.email, verifiedUser.name);
    } catch (emailError) {
      logger.error('Failed to send welcome email:', emailError);
      // Don't fail verification if welcome email fails
    }

    // 4. Generate JWT token so user can login immediately
    const jwtToken = jwt.sign(
      { userId: verifiedUser.id, email: verifiedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    logger.info(`Email verified for user: ${verifiedUser.email}`);

    res.json({
      message: 'Email verified successfully! You can now login.',
      user: verifiedUser,
      token: jwtToken // Auto-login after verification
    });

  } catch (error) {
    next(error);
  }
};

/**
 * CHANGE PASSWORD
 * PUT /api/auth/change-password
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 1. Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'New password must be at least 6 characters'
      });
    }

    // 2. Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user || !user.password) {
      return res.status(400).json({
        error: 'User not found or uses OAuth authentication'
      });
    }

    // 3. Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Current password is incorrect'
      });
    }

    // 4. Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 5. Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedNewPassword }
    });

    logger.info(`Password changed for user: ${req.user.email}`);

    res.json({
      message: 'Password changed successfully'
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  verifyEmail
};
