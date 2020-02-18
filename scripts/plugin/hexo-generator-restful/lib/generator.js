'use strict';

var pagination = require('hexo-pagination');

var toc = require('../../toc');

var $min2read = require('../../../helper/$min2read');

var $word4post = require('../../../helper/$word4post');

var $word4site = require('../../../helper/$word4site');

var $encode = require('../../../helper/$encode');

function filterHTMLTags(str) {
  return str ? str
    .replace(/\r?\n|\r/g, '')
    .replace(/<img[^>]*>(<br>)*/g, '') : null
}
function fetchCovers(str) {
  var temp,
    imgURLs = [],
    rex = /<img[^>]+src="?([^"\s]+)"(.*)>/g;
  while (temp = rex.exec(str)) {
    imgURLs.push(temp[1]);
  }
  return imgURLs.length > 0 ? imgURLs : null;
}
function fetchCover(str) {
  var covers = fetchCovers(str)
  return covers ? covers[0] : null;
}

module.exports = function (cfg, site) {

  var restful = {
    site: true,
    posts_props: {
      title: true,
      slug: true,
      date: true,
      updated: true,
      cover: true,
      path: true,
      excerpt: true,
      content: false,
      categories: true,
      tags: true
    },
    categories: true,
    use_category_slug: false,
    tags: true,
    use_tag_slug: false,
    post: true,
    pages: true,
  },

    posts = site.posts.sort('-date').filter(function (post) {
      return post.published;
    }),

    posts_props = (function () {
      var props = restful.posts_props;

      return function (name, val) {
        return props[name] ? (typeof val === 'function' ? val() : val) : null;
      }
    })(),

    postMap = function (post) {
      return {
        title: posts_props('title', post.title),
        slug: posts_props('slug', post.slug),
        date: posts_props('date', post.date.format('YYYY-MM-DD')),
        updated: posts_props('updated', post.updated.format('YYYY-MM-DD')),
        path: posts_props('path', 'api/posts/' + post.abbrlink + '.json'),
        excerpt: posts_props('excerpt', filterHTMLTags(post.excerpt)),
        cover: posts_props('cover', post.cover || fetchCover(post.content)),
        content: posts_props('content', post.content),
        min2read: $min2read(post.content),
        word4post: $word4post(post.content),
        url: cfg.root + post.path,
        categories: posts_props('categories', function () {
          return post.categories.map(function (cat) {
            const name = (
              restful.use_category_slug && cat.slug
            ) ? cat.slug : cat.name;
            return {
              name: name,
              path: 'api/categories/' + name + '.json',
              url: cfg.root + cat.path
            };
          });
        }),
        tags: posts_props('tags', function () {
          return post.tags.map(function (tag) {
            const name = (
              restful.use_tag_slug && tag.slug
            ) ? tag.slug : tag.name;
            return {
              name: name,
              path: 'api/tags/' + name + '.json',
              url: cfg.root + tag.path
            };
          });
        })
      };
    },

    cateReduce = function (cates, kind) {
      return cates.reduce(function (result, item) {
        if (!item.length) return result;

        let use_slug = null;
        switch (kind) {
          case 'categories':
            use_slug = restful.use_category_slug;
            break;
          case 'tags':
            use_slug = restful.use_tag_slug;
            break;
        }

        const name = (use_slug && item.slug) ? item.slug : item.name;

        return result.concat(pagination(item.path, posts, {
          perPage: 0,
          data: {
            name: name,
            url: cfg.root + item.path,
            path: 'api/' + kind + '/' + item.slug + '.json',
            postlist: item.posts.sort('-date').filter(function (post) {
              return post.published;
            }).map(postMap)
          }

        }));
      }, []);
    },

    catesMap = function (item) {
      return {
        name: item.data.name,
        url: item.data.url,
        path: item.data.path,
        count: item.data.postlist.length
      };
    },

    cateMap = function (item) {
      var itemData = item.data;
      return {
        path: itemData.path,
        data: JSON.stringify({
          name: itemData.name,
          postlist: itemData.postlist
        })
      };
    },

    apiData = [];


  if (restful.site) {
    // Encode baidu translate
    let encodeBaiduTranslate = {
      pass: '',
      pointer: ''
    };
    let baidu_translate = cfg.baidu_translate;
    if (baidu_translate && baidu_translate.appid && baidu_translate.appkey) {
      let appidLen = (baidu_translate.appid + '').length;
      let appkeyLen = (baidu_translate.appkey + '').length;
      if (appidLen && appkeyLen) { // Something there...
        encodeBaiduTranslate.pass = $encode(baidu_translate.appid + '', baidu_translate.appkey + '');
        encodeBaiduTranslate.pointer = appidLen;
      }
    }
    // Encode valine
    let encodeValine = {
      pass: '',
      pointer: ''
    };
    let valine = cfg.valine;
    if (valine && valine.appid && valine.appkey) {
      let appidLen = (valine.appid + '').length;
      let appkeyLen = (valine.appkey + '').length;
      if (appidLen && appkeyLen) { // Something there...
        encodeValine.pass = $encode(valine.appid + '', valine.appkey + '');
        encodeValine.pointer = appidLen;
      }
    }
    apiData.push({
      path: 'api/site.json',
      data: JSON.stringify({
        word4site: $word4site(site),
        numOfPosts: posts.length,
        numOfCategories: site.categories.length,
        numOfTags: site.tags.length,
        abbrMatch: (o => {
          let result = {};
          posts.forEach(function (post) {
            result[post.abbrlink] = post.title;
          });
          return result;
        })(),
        menus: cfg.menus,
        baidu_translate: encodeBaiduTranslate,
        valine: encodeValine,
        swPath: `${cfg.serviceWorker.path}?t=${Date.now()}`
      })
    });
  }

  if (restful.categories) {

    var cates = cateReduce(site.categories, 'categories');

    if (!!cates.length) {
      apiData.push({
        path: 'api/categories.json',
        data: JSON.stringify(cates.map(catesMap))
      });

      apiData = apiData.concat(cates.map(cateMap));
    }

  }

  if (restful.tags) {
    var tags = cateReduce(site.tags, 'tags');

    if (tags.length) {
      apiData.push({
        path: 'api/tags.json',
        data: JSON.stringify(tags.map(catesMap))
      });

      apiData = apiData.concat(tags.map(cateMap));
    }

  }

  var postlist = posts.map(function (post) {
    return {
      title: posts_props('title', post.title),
      slug: posts_props('slug', post.slug),
      date: posts_props('date', post.date.format('YYYY-MM-DD')),
      updated: posts_props('updated', post.updated.format('YYYY-MM-DD')),
      path: posts_props('path', 'api/posts/' + post.abbrlink + '.json'),
      excerpt: posts_props('excerpt', filterHTMLTags(post.excerpt)),
      cover: posts_props('cover', post.cover || fetchCover(post.content)),
      url: cfg.root + post.path,
      abbrlink: post.abbrlink,
      categories: posts_props('categories', function () {
        return post.categories.map(function (cat) {
          const name = (
            restful.use_category_slug && cat.slug
          ) ? cat.slug : cat.name;
          return {
            name: name,
            path: 'api/categories/' + name + '.json',
            url: cfg.root + cat.path
          };
        });
      }),
      tags: posts_props('tags', function () {
        return post.tags.map(function (tag) {
          const name = (
            restful.use_tag_slug && tag.slug
          ) ? tag.slug : tag.name;
          return {
            name: name,
            path: 'api/tags/' + name + '.json',
            url: cfg.root + tag.path
          };
        });
      })
    };
  });

  apiData.push({
    path: 'api/posts.json',
    data: JSON.stringify(postlist)
  });

  var searchlist = posts.map(function (post) {
    return {
      title: post.title,
      url: cfg.root + post.path,
      content: post._content,
      categories: post.categories.map(function (cat) {
        return cat.name;
      }),
      tags: post.tags.map(function (tag) {
        return tag.name;
      })
    };
  });

  apiData.push({
    path: 'api/search.json',
    data: JSON.stringify(searchlist)
  });

  if (cfg.manifest) {
    apiData.push({
      path: 'manifest.json',
      data: JSON.stringify(cfg.manifest)
    });
  }

  if (restful.post) {
    apiData = apiData.concat(posts.map(function (post) {
      var path = 'api/posts/' + post.abbrlink + '.json';
      return {
        path: path,
        data: JSON.stringify({
          title: post.title,
          slug: post.slug,
          date: post.date.format('YYYY-MM-DD'),
          updated: post.updated.format('YYYY-MM-DD'),
          comments: post.comments,
          path: path,
          excerpt: filterHTMLTags(post.excerpt),
          cover: fetchCover(post.content),
          covers: fetchCovers(post.content),
          content: post.content,
          url: cfg.root + post.path,
          min2read: $min2read(post.content),
          word4post: $word4post(post.content),
          prev_post: post.prev ? (o => {
            return {
              title: post.prev.title,
              url: cfg.root + post.prev.path
            };
          })() : null,
          next_post: post.next ? (o => {
            return {
              title: post.next.title,
              url: cfg.root + post.next.path
            };
          })() : null,
          toc: toc(post.content),
          categories: post.categories.map(function (cat) {
            return {
              name: cat.name,
              path: 'api/categories/' + cat.name + '.json',
              url: cfg.root + cat.path
            };
          }),
          tags: post.tags.map(function (tag) {
            return {
              name: tag.name,
              path: 'api/tags/' + tag.name + '.json',
              url: cfg.root + tag.path
            };
          })
        })
      };
    }));
  }

  if (restful.pages) {
    apiData = apiData.concat(site.pages.data.map(function (page) {
      if (page.path.split('/').length !== 1 && page.name) {
        var safename = page.name.replace(/[^a-zA-Z0-9]/ig, '-');
        var path = 'api/pages/' + safename + '.json';
  
        return {
          path: path,
          data: JSON.stringify({
            title: page.title,
            path: path,
            url: cfg.root + page.path,
            content: page.content
          })
        };
      } else {
        return {};
      }
    }));
  }

  return apiData;
};