'use strict';

const eslint = require('gulp-eslint');
const path   = require('path');
const env    = require('./utils/env');

/**
 * @task lint
 * @description eslint SRC_DIR
 */
module.exports = (gulp) => {

	gulp.task('lint', () => {
		return gulp.src(path.join(env.SRC_DIR, '**/*.js'))
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	});
};