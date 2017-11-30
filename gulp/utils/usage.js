'use strict';

const gutil = require('gulp-util');
const os    = require('os');
const env   = require('./env');
const util  = require('./util');

let TAB_LENGTH = 8;

module.exports = usage;

/**
 *  Generate and print a usage string based on the tasks
 */
function usage() {

  let tasks  = util.getTasks(true);
  let usages = getUsageComments(tasks);
  let envObjects = Object.keys(env).map((e) => {
    return {
      name: e,
      description: env[e]
    };
  });

  gutil.log([
    gutil.colors.underline.green('USAGE:'),
    '',
    '\t' + gutil.colors.underline.yellow('Environment:'),
    '',
    setTabs(envObjects).map((e) => { return formatTask(e, gutil.colors.yellow); }).join(os.EOL),
    '',
    '\t' + gutil.colors.underline('Tasks:'),
    '',
    setTabs(usages).map((task) => { return formatTask(task, gutil.colors.white); }).join(os.EOL),
    ''
  ].join(os.EOL));
}

function getUsageComments(tasks) {
  let usages = [];

  const COMMENT_BEGIN   = /^\/[\*]+/g;
  const COMMENT_END     = /[^\S][\*]+\//g;
  const COMMENT_CONTENT = /^\s+\*\s+/g;

  tasks.forEach((task) => {

    let begin = false;
    let end = false;
    let commentChunks = []

    task.split(os.EOL).forEach(function (line) {
      if (end) {
        return;
      }

      if (COMMENT_BEGIN.test(line)) {
        begin = true;
        return;
      }

      if (COMMENT_END.test(line)) {
        end = true;
        return;
      }

      if (begin && !end) {
        commentChunks.push(line.replace(COMMENT_CONTENT, ''));
      }
    });

    if (commentChunks.length > 0) {
      usages.push(parseComment(commentChunks));
    }
  });
  return usages;
}

function parseComment(commentChunks) {
  let TASK = /^\s*@(?:task|name)\s+([\w\W\d\D]+)/g;
  let DESCRIPTION = /^\s*@(?:taskDescription|description)\s+([\w\W\d\D]+)/g;

  let task = {
    name: null,
    description: null
  };

  commentChunks.forEach((chunk) => {
    let name = TASK.exec(chunk);
    let description = DESCRIPTION.exec(chunk);

    if (name) {
      task.name = name[1];
    }
    if (description) {
      task.description = description[1];
    }
  });

  return task;
}

function formatTask(task, nameColor, descColor) {
  nameColor = nameColor || gutil.colors.yellow;
  descColor = descColor || gutil.colors.gray;
  return `\t${nameColor(task.name)}${task.tabs}-\t${descColor(task.description)}`;
}

function setTabs(tasks) {
  let min = 1;
  let max = 1;
  let printed = false;

  // the goal of this is to make the output even
  // the name should have a tab prior to it's print
  // setting the tabs of the description is the real goal of this
  // if a name is 8 chars long, this is the length of the tab character
  // and it should print 2 tab characters,
  return tasks.map((task) => {
    let nameLength = task.name.length ;
    let count = Math.ceil(nameLength / TAB_LENGTH);

    // if the nameLength is a prefect multiple of TAB_LENGTH, we need to add an additional tab
    if (nameLength % TAB_LENGTH === 0) {
      count++;
    }

    if (count > max) {
      max = count;
    } else if (count < max && count < min) {
      min = count;
    }

    task.tabs = count;

    return task;
  }).map((task) => {
    let tab = '';

    if (task.tabs === max) {
      task.tabs = min;
    } else if (task.tabs === min) {
      task.tabs = max;
    } else {
      task.tabs = max - min;
    }

    while (task.tabs > 0) {
      tab += '\t';
      task.tabs--;
    }

    task.tabs = tab;

    return task;
  });
}
