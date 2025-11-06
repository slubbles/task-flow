// ========================================
// AUTHENTICATION MIDDLEWARE
// ========================================
// Protects routes - only logged-in users can access

const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

/**
 * WHAT THIS DOES:
 * 1. Check if request has Authorization header
 * 2. Extract JWT token from header
 * 3. Verify token is valid
 * 4. Get user from database
 * 5. Attach user to request object
 * 6. Continue to next middleware/route handler
 */

const authenticate = async (req, res, next) => {
  try {
    // 1. Get token from header
    // Header format: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'No token provided. Please login first.' 
      });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    // 2. Verify token
    // This checks if token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // decoded contains: { userId: '123', email: 'user@example.com', iat: 1234567890 }

    // 3. Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true
        // Don't include password!
      }
    });

    if (!user) {
      return res.status(401).json({ 
        error: 'User not found. Token may be invalid.' 
      });
    }

    // 4. Attach user to request
    // Now any route can access req.user
    req.user = user;

    // 5. Continue to next middleware/route
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    }

    return res.status(500).json({ error: 'Authentication failed' });
  }
};

/**
 * ROLE-BASED AUTHORIZATION
 * Only allow users with specific roles
 * 
 * Usage: authorize('ADMIN', 'MANAGER')
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Forbidden. You do not have permission to access this resource.' 
      });
    }

    next();
  };
};

module.exports = { authenticate, authorize };
