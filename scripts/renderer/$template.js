'use strict';

/**
 * Render .tpl files with ejs engine
 */

var ejs = require('ejs');

module.exports = function (data) {
  let posts = this.locals.get('posts').sort('-date').filter(post => post.published);
  let pages = this.locals.get('pages');
  return ejs.render(data.text, {
    precacheUrls: [this.config.root].concat(posts.map(post => this.config.root + post.path)).concat(pages.map(page => this.config.root + page.path)),
    opts: this.theme.config.serviceWorker.opts || {},
    routes: this.theme.config.serviceWorker.routes
  });
};