const lint = require('mocha-eslint');

const paths = [
  'server/**/*.js',
  'tests/**/*.test.js',
];

lint(paths, {});
