export default {
  transform: {},
  extensionsToTreatAsEsm: [".js"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/app.js",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true,
};
