'use strict';

const path = require('path');
const env  = require('./utils/env');

const GLOB = ['**/*', '!**/*.scss'];

/**
 * @task move
 * @description move js, and html files from SRC_DIR to BUILD_DIR
 */
module.exports = (gulp) => {

  gulp.task('move', () => {
    return gulp.src(GLOB, {
      base: env.SRC_DIR
    })
      .pipe(gulp.dest(env.BUILD_DIR))
  });

  gulp.task('watch:move', () => {
    gulp.watch(path.join(env.SRC_DIR, GLOB), ['move']);
  });
};