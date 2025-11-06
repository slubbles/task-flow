// ========================================
// EXAMPLE TEST - Authentication
// ========================================
// This shows you how to test API endpoints

const request = require('supertest');
// We'll uncomment this after installing dependencies
// const app = require('../src/server');

/**
 * WHAT ARE TESTS?
 * Tests automatically check if your code works correctly
 * 
 * Think of it like:
 * - You write code that calls your API
 * - Check if response is what you expect
 * - If something breaks, tests fail and tell you
 */

describe('Authentication API', () => {
  // This runs before all tests in this file
  beforeAll(async () => {
    // Setup: Connect to test database, etc.
  });

  // This runs after all tests
  afterAll(async () => {
    // Cleanup: Disconnect, delete test data, etc.
  });

  /**
   * TEST: User Registration
   */
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      // Uncomment after backend is running
      /*
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });

      // Assertions (checks)
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.user).not.toHaveProperty('password');
      */
    });

    it('should fail with invalid email', async () => {
      // Test validation
    });

    it('should fail with duplicate email', async () => {
      // Test uniqueness constraint
    });
  });

  /**
   * TEST: User Login
   */
  describe('POST /api/auth/login', () => {
    it('should login with correct credentials', async () => {
      // Test successful login
    });

    it('should fail with wrong password', async () => {
      // Test authentication failure
    });
  });

  /**
   * TEST: Get Profile
   */
  describe('GET /api/auth/me', () => {
    it('should return user profile with valid token', async () => {
      // Test authenticated request
    });

    it('should fail without token', async () => {
      // Test authorization
    });
  });
});

// EXAMPLE TEST STRUCTURE:
// describe() - Groups related tests
// it() or test() - Individual test case
// expect() - Assertion (what you expect to happen)

// Common assertions:
// expect(value).toBe(expected) - Exact match
// expect(value).toEqual(expected) - Deep equality
// expect(value).toHaveProperty('key') - Object has property
// expect(array).toContain(item) - Array contains item
// expect(fn).toThrow() - Function throws error
