// @TODO: try to add ts-check
const jestConfig = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.+(ts|js)?(x)',
    '<rootDir>/src/**/+(*.)+(spec|test).+(ts|js)?(x)',
  ],
  //  // moduleNameMapper: {
  // //     'app/(.*)': '<rootDir>/src/app/$1',
  // //     'assets/(.*)': '<rootDir>/src/assets/$1',
  // //     'environments/(.*)': '<rootDir>/src/environments/$1',
  // //   },
  // //   transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/out-tsc/',
    '<rootDir>/src/.*(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    'src/(setup-jest|jest-global-mocks).ts',
  ],
};

module.exports = jestConfig;