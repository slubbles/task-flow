// ========================================
// PASSWORD RESET SERVICE
// ========================================

const crypto = require('crypto');
const { sendPasswordResetEmail } = require('./email.service');
const prisma = require('../config/database');
const logger = require('../utils/logger');

/**
 * Request Password Reset
 * Generates token and sends email
 */
const requestPasswordReset = async (email) => {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if email exists (security best practice)
      logger.info(`Password reset requested for non-existent email: ${email}`);
      return { success: true }; // Still return success
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpiry: resetTokenExpiry
      }
    });

    // Send reset email
    await sendPasswordResetEmail(user.email, user.name, resetToken);

    logger.info(`Password reset email sent to: ${email}`);
    return { success: true };

  } catch (error) {
    logger.error('Password reset request failed:', error);
    throw error;
  }
};

/**
 * Reset Password with Token
 */
const resetPassword = async (token, newPassword) => {
  try {
    // Find user with valid token
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiry: {
          gt: new Date() // Token not expired
        }
      }
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    // Hash new password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiry: null
      }
    });

    logger.info(`Password reset successful for user: ${user.email}`);
    return { success: true };

  } catch (error) {
    logger.error('Password reset failed:', error);
    throw error;
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword
};
