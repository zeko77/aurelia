module.exports = {
  extends: [
    '../../.eslintrc.js'
  ],
  rules: {
    'import/no-nodejs-modules': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  }
};
