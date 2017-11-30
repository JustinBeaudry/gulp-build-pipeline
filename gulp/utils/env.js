'use strict';

const path = require('path');

module.exports = {
  BUILD_DIR : process.env.BUILD_DIR || path.join(process.cwd(), 'build'),
  SRC_DIR   : process.env.SRC_DIR   || path.join(process.cwd(), 'src'),
  GULP_DIR  : process.env.GULP_DIR  || path.join(process.cwd(), 'gulp'),
  NODE_ENV  : process.env.NODE_ENV  || 'dev',
  WRITABLE  : process.env.WRITABLE  || true
};
