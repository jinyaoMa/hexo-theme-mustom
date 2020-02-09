'use strict';

/**
 * $min2read Helper
 * 
 * Syntax:
 * <% $min2read(content[, countObject]); %>
 * <% $min2read(content, {
 *  zh: 999,
 *  en: 999
 * }); %>
 */

var $count = require('./$count');

module.exports = function (content, { zh = 300, en = 160 } = {}) {
  let counts = $count(content);
  let readingTime = counts.zh / zh + counts.en / en;
  return readingTime < 1 ? '1' : parseInt(readingTime, 10);
};