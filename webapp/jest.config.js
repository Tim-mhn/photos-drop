const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
    testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.*store.ts$",
  ],
};
module.exports = createJestConfig(customJestConfig);
