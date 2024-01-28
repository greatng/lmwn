/** @type {import('jest').Config} */
const config = {
    verbose: true,
    coveragePathIgnorePatterns: ['(/.*)*/*.models.ts'],
    setupFiles: ['dotenv/config'],
    testEnvironment: 'node',
};

module.exports = config;

