'use strict';

var hexo = hexo || {};

hexo.config.permalink = 'posts/:abbrlink/';

hexo.extend.filter.register('before_post_render', require('./lib/logic'), 15);
