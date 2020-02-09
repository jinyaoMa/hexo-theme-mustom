'use strict';

/**
 * $encode Helper
 * 
 * Syntax:
 * <% $encode(appid, appkey); %>
 */

module.exports = (appid, appkey) => {
  if (typeof appid !== 'string' || typeof appkey !== 'string') return;
  let string = appid + appkey;
  let even = '';
  let odd = '';
  for (let i = 0; i < string.length; i++) {
    if (i % 2 === 0) {
      even += string.charAt(i);
    } else {
      odd += string.charAt(i);
    }
  }
  return even.length + ':' + even + odd;
};