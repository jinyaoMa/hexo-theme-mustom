'use strict';

/**
 * $css Helper
 * 
 * Syntax:
 *  <%- $css(path [, isExternal]) %>
 *  path - can be string or array for internal .css file, but string only for external
 * 
 * e.g. <%- $css('https://example/index.css', true) %>
 * e.g. <%- $css(['layout', '/index.css']) %>
 * e.g. <%- $css('layout') %>
 */

const DATE = Date.now();
const START = '/';
const FOLDER = 'asset/css/';
const END = '.css';
const ERROR = '<!-- Error:Helper/$css -->';

/**
 * Generate a HTML <link rel="stylesheet"> tag for a path
 * 
 * @param {string} path 
 * @param {boolean} isExternal 
 */
const makeHtmlTag = (path, isExternal) => {
  if (typeof path === 'string') {
    if (isExternal) {
      return '<link rel="stylesheet" href="' + path + '">';
    }
    if (!path.startsWith(START)) {
      if (!path.startsWith(FOLDER)) {
        path = FOLDER + path;
      }
      path = START + path;
    }
    if (!path.endsWith(END)) {
      path = path + END;
    }
    return '<link rel="stylesheet" href="' + path + '?t=' + DATE + '">';
  }
  return ERROR;
};

module.exports = function (path, isExternal = false) {
  if (isExternal) {
    return makeHtmlTag(path, true);
  }
  if (typeof path === 'object' && path.length) {
    let result = '';
    path.forEach(p => {
      result += makeHtmlTag(p, false);
    });
    return result;
  } else {
    return makeHtmlTag(path, false);
  }
};