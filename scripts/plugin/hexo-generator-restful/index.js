'use strict';

var generator = require('./lib/generator');

hexo.config.index_generator.per_page = 0;
hexo.config.per_page = 0;
hexo.config.archive_generator = {
  per_page: 0,
  yearly: false,
  monthly: false,
  daily: false
};

hexo.extend.generator.register('restful', function (site) {
  return generator(Object.assign({}, hexo.config, hexo.theme.config), site);
});