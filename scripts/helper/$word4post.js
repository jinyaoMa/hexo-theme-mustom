'use strict';

/**
 * $word4post Helper
 * 
 * Syntax:
 * <% $word4post(content); %>
 */

var $count = require('./$count');

module.exports = function (content) {
  let counts = $count(content);
  let count = counts.zh + counts.en;
  if (count < 1000) {
    return count;
  }
  return Math.round(count / 100) / 10 + 'k';
};