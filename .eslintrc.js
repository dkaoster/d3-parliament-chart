module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
  extends: ['eslint-config-airbnb-base'],
  rules: {
    'object-curly-newline': 0,
    'no-return-assign': 0,
    'no-multi-spaces': 0,
  },
};
