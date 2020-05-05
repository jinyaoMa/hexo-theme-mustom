'use strict';

/**
 * $encodeHTML Helper
 * 
 * Syntax:
 * <% $encodeHTML(strings); %>
 */

module.exports = strings => {
  let result = [];
  if (typeof strings === 'object') {
    strings.forEach(string => {
      result.push(encodeURI(string.trim()));
    });
    result = encodeURI(JSON.stringify(result));
  } else {
    result = encodeURI(strings.trim());
  }
  return result;
};