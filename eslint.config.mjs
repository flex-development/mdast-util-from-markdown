/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * Root eslint configuration object.
 *
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  ...(await import('./eslint.base.config.mjs')).default,
  {
    ignores: [
      '!**/__fixtures__/**/dist/',
      '!**/__fixtures__/**/node_modules/',
      '!**/typings/**/dist/',
      '**/.yarn/',
      '**/coverage/',
      '**/dist/',
      '__fixtures__/*.md'
    ]
  },
  {
    files: ['**/__tests__/*.spec.ts'],
    languageOptions: {
      globals: {
        files: true
      }
    }
  },
  {
    files: ['__fixtures__/*.json'],
    rules: {
      'jsonc/sort-keys': 0
    }
  },
  {
    files: ['example.mjs'],
    rules: {
      'jsdoc/require-file-overview': 0
    }
  }
]
