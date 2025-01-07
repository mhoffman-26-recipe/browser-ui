module.exports = {
    testMatch: ['<rootDir>/backend/routes/**/test/*integration.test.ts'],
    testEnvironment: 'node', // Use 'node' since this is for server-side testing
    moduleFileExtensions: ['js', 'ts', 'json'], // Add 'ts' for TypeScript support
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to transform TypeScript files
    },
    verbose: true, // Enable verbose output for better insights during testing
};
