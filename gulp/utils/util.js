'use strict';

const gutil = require('gulp-util');
const fs    = require('fs');
const path  = require('path');
const env   = require('./env');

module.exports = {
  getTasks: getTasks
};

/**
 * @description get all gulp tasks as functions or strings
 * @param asStrings
 */
function getTasks(asStrings) {
  let files = fs.readdirSync(env.GULP_DIR);
  if (!files) {
    gutil.log(gutil.colors.red('No gulp tasks found!'));
    process.exit(1);
  }
  return asStrings ? getTaskAsStrings(files) : getTasksAsFunctions(files);
}

/**
 * @description returns all gulp tasks as functions
 * @param files
 * @returns {Array}
 */
function getTasksAsFunctions(files) {
  return filterTasks(files).map((file) => { return require(path.join(env.GULP_DIR, file)); });
}

/**
 * @description returns all gulp tasks as strings
 * @param files
 * @returns {Array}
 */
function getTaskAsStrings(files) {
  return filterTasks(files).map((file) => { return fs.readFileSync(path.join(env.GULP_DIR, file), 'utf-8'); });
}

/**
 * @description returns only files with an extension .js and are not prefixed with an underscore
 * @param files
 * @returns {Array}
 */
function filterTasks(files) {
  return files.filter((file) => { return path.extname(file) === '.js'; });
}