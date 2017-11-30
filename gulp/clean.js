'use strict';

const gutil = require('gulp-util')
const async = require('async');
const path  = require('path');
const rmrf  = require('rimraf');
const fs    = require('fs');
const env   = require('./utils/env');

/**
 * @task clean
 * @description remove all files within BUILD_DIR and ensures BUILD_DIR exists
 */
module.exports = (gulp) => {

	gulp.task('clean', (callback) => {
		async.series([
			rmDir,
      isDir
		], callback);
  });
};

function rmDir(callback) {
	rmrf(path.join(env.BUILD_DIR, '**/*'), (err) => done(err, callback));
}

function isDir(callback) {
  fs.access(env.BUILD_DIR, (err) => {
    if (err) {
      return mkDir(callback);
    }
    callback();
  });
}

function mkDir(callback) {
	fs.mkdir(env.BUILD_DIR, (err) => done(err, callback));
}

function done(err, callback) {
	if (err) {
		gutil.log(gutil.colors.magenta(err));
    gulp.fail = true;
	}
	callback();
}