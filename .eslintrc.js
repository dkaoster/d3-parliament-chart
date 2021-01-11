module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: [
    'svelte3',
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  env: {
    es6: true,
  },
  extends: ['eslint-config-airbnb-base'],
  rules: {
    'object-curly-newline': 0,
    'no-return-assign': 0,
    'no-multi-spaces': 0,
    'import/first': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
