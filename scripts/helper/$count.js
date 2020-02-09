'use strict';

/**
 * $count Helper
 * 
 * Syntax:
 * <% $count(content); %>
 */

var util = require('hexo-util');

module.exports = function (content) {
  content = util.stripHTML(content);
  const zh = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
  const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length;
  return {
    zh,
    en
  };
};