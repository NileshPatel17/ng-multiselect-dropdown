const jestConfig = {
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": [
    "<rootDir>/src/setup-jest.ts"
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/dist-lib/",
    "<rootDir>/src/test.ts"
  ],
  "globals": {
    "ts-jest": {
      "tsConfig": "<rootDir>/src/tsconfig.spec.json",
      "stringifyContentPathRegex": "\\.html$",
      "astTransformers": [
        "<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer"
      ]
    }
  }
}

module.exports = jestConfig;