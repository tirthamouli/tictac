module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': 0,
    'no-await-in-loop': 0,
    'import/prefer-default-export': 0,
    'no-alert': 0,
    'no-param-reassign': 0,
    'linebreak-style': 0,
  },
};
