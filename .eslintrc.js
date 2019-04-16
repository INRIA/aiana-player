module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
        version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': { allowExpressions: true },
    '@typescript-eslint/explicit-member-accessibility': 'no-public',
    '@typescript-eslint/interface-name-prefix' : 'always',
    '@typescript-eslint/no-explicit-any': false,
    '@typescript-eslint/no-non-null-assertion': false,
    '@typescript-eslint/no-use-before-define': false,
    'react/display-name': false
  }
};
