// jest.config.ts or jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // ✅ Add this line for alias support
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!src/app/api/**',           // Skip API routes
    '!src/app/**/layout.tsx',    // Optional: skip layout files
    '!src/app/**/page.tsx',      // Optional: skip static page files
    '!src/graphql/schema/*.ts',   // skip schema
    '!src/lib/*.ts',              // skip config files
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageReporters: ['text', 'lcov'],
};

module.exports = createJestConfig(customJestConfig);
