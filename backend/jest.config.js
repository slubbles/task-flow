// ========================================
// JEST CONFIGURATION
// ========================================

module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',  // Exclude entry point
    '!**/node_modules/**'
  ],
  
  // Coverage thresholds (goals)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // Test match patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Setup files
  // setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Timeout
  testTimeout: 10000,
  
  // Verbose output
  verbose: true
};
