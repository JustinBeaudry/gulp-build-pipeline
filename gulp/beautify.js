'use strict';

const gutil        = require('gulp-util');
const path         = require('path');
const prettify     = require('gulp-jsbeautifier');
const diff         = require('gulp-diff').diff;
const diffReporter = require('gulp-diff').reporter;
const env          = require('./utils/env');

/**
 * @task beautify
 * @description js-beautify JS, HTML, CSS from SRC_DIR
 */
module.exports = (gulp) => {
  gulp.task('beautify', () => {
    return gulp.src(path.join(env.SRC_DIR, '**/*'))
      .pipe(prettify({
        config: '.jsbeautifyrc',
        mode: 'VERIFY_AND_WRITE'
      }))
      .pipe(diff())
      .pipe(diffReporter())
      .pipe(env.WRITABLE ? gulp.dest(process.cwd()) : gutil.noop())
      .on('data', (data) => {
        if (data.diff && Object.keys(data.diff).length) {
          gulp.fail = true;
        }
      });
  });
};
