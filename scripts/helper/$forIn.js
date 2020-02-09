'use strict';

/**
 * $forIn Helper
 * 
 * Syntax:
 * <% $forIn(object, (key, value) => {}); %>
 */

module.exports = function (object, callback) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      callback && callback(key, object[key]);
    }
  }
};