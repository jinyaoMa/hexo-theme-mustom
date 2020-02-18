'use strict';

var pangunode = require('./plugin/pangunode');

hexo.extend.filter.register('after_post_render', function(data) {
  data.title = pangunode(data.title);
  data.excerpt = pangunode(data.excerpt);
  data.content = pangunode(data.content);
});
