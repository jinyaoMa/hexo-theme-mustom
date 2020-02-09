'use strict';

/**
 * $word4site Helper
 * 
 * Syntax:
 * <% $word4site(site); %>
 */

var $count = require('./$count');

module.exports = function (site) {
  let count = 0;
  site.posts.forEach(function (post) {
    let counts = $count(post.content);
    count += counts.zh + counts.en;
  });
  if (count < 1000) {
    return count;
  }
  return Math.round(count / 100) / 10 + 'k';
};