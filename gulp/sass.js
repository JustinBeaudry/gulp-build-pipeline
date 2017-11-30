'use strict';

const sass       = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat     = require('gulp-concat');
const path       = require('path');
const bourbon    = require('bourbon');
const neat       = require('bourbon-neat');
const env        = require('./utils/env');

/**
 * @task sass
 * @description compile .scss from SRC_DIR and concat to BUILD_DIR/main.css
 */
module.exports = (gulp) => {

	gulp.task('sass', () => {
		const neatIncludePaths    = [path.dirname(require.resolve('bourbon-neat'))];
		const bourbonIncludePaths = [bourbon.includePaths];
		const includePaths        = [].concat.apply(bourbonIncludePaths, neatIncludePaths);

		let options = {
			includePaths: includePaths
		};

		if (env.NODE_ENV === 'prod') {
			Object.assign(options, {
				outputStyle: 'compressed',
				sourceComments: false
			});
		}

		return gulp.src(path.join(env.SRC_DIR, 'sass/**/*.scss'))
			.pipe(sourcemaps.init())
			.pipe(sass(options).on('error', sass.logError))
			.pipe(concat(path.join(env.BUILD_DIR, 'main.css')))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(path.join(env.BUILD_DIR, 'css')));
	});

	gulp.task('watch:sass', () => {
		gulp.watch(path.join(env.SRC_DIR, 'sass/**/*.scss'), ['sass']);
	});
};