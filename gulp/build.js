'use strict';

/**
 * @task build
 * @description runs clean -> beautify -> lint -> sass -> move
 */
module.exports = (gulp) => {
  gulp.task('build', ['clean', 'beautify', 'lint', 'sass', 'move']);
};