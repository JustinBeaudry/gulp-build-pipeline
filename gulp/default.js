'use strict';

const usage = require('./utils/usage');

module.exports = (gulp) => {
  gulp.task('default', () => {
    usage();
  });
};
