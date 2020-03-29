'use strict';

const fs = require('fs');
const folder = 'gallery';
const matchPath = `source\\${folder}`;
const regex = /^.+\.(bmp|png|jpeg|jpg|gif|svg|webp)$/;

/**
 * $gallery Helper
 * 
 * Syntax:
 * <% $gallery(); %>
 */

module.exports = function (path) {
  let result = [];
  if (path.includes(matchPath)) {
    if (fs.existsSync(path)) {
      let stats = fs.statSync(path);
      if (stats.isDirectory()) {
        let ls = fs.readdirSync(path);
        if (ls && ls.length) {
          ls.forEach(filename => {
            regex.test(filename) && result.push({
              name: filename,
              url: `/${folder}/${filename}`
            });
          });
        }
      }
    }
  }
  return result;
};