'use strict';

const gulp  = require('gulp');
const gutil = require('gulp-util');
const path  = require('path');
const util  = require('./gulp/utils/util');

util.getTasks().forEach((task) => {
  task.call(this, gulp);
});

process.on('uncaughtException', (err) => {
  if (err) {
    gutil.log(err);
    process.exit(1);
  }
});

process.on('exit', () => {
  if (gulp.fail) {
    process.exit(1);
  }
});
