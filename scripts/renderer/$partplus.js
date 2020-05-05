'use strict';

/**
 * Render .ejs files located in folder asset/part
 */

var ejs = require('ejs');
var $forIn = require('../helper/$forIn');
var $encodeHTML = require('../helper/$encodeHTML');

module.exports = function (data, options) {
  if (!options) {
    if (/.*(source\\asset\\part\\).+/.test(data.path)) {
      // Set Options
      options = {
        config: this.config,
        theme: this.theme.config,
        $encodeHTML,
        $forIn,
        version: this.env.version
      };
    } else if (/.*(source\\browser.ejs)$/.test(data.path)) {
      // Set Options
      options = {
        config: this.config,
        theme: this.theme.config
      };
    }
  }
  return ejs.render(data.text, options);
};