'use strict';

hexo.extend.renderer.register('ejs', 'html', require('./renderer/$partplus'), true);

hexo.extend.renderer.register('tpl', 'js', require('./renderer/$template'), true);