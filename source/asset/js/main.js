import { L2Dwidget } from "./plugin/L2Dwidget.min.js";
import _run_APlayer from "./plugin/APlayer.min.js";
import _run_Meting from "./plugin/Meting.min.js";
import _run_AV from "./plugin/av-min.js";
import _run_Valine from "./plugin/Valine.min.js";
import evanyou from "./plugin/evanyou.js";
import util from "./common/util.js";
import lang from "./common/lang.js";
import fetch from "./common/fetch.js";
import api from "./common/api.js";
import config from "./common/config.js";
import ajax from "./common/ajax.js";
import goingto from "./part/goingto.js";
import extension from "./part/extension.js";
import search from "./part/search.js";
import xdrawer from "./part/xdrawer.js";
import xaside from "./part/xaside.js";
import xsearch from "./part/xsearch.js";
import sitename from "./part/sitename.js";
import brand from "./part/brand.js";
import menus from "./part/menus.js";
import skin from "./part/skin.js";
import settings from "./part/settings.js";
import footer from "./part/footer.js";
import pather from "./part/pather.js";
import panels from "./part/panels.js";
import audioplayer from "./part/audioplayer.js";
import toc from "./part/toc.js";
import comment from "./part/comment.js";
import translater from "./part/translater.js";
import hitokoto from "./part/hitokoto.js";
import recentposts from "./part/recentposts.js";
import timeline from "./part/timeline.js";
import post from "./part/post.js";
import page from "./part/page.js";
import records from "./part/records.js";
import gallery from "./part/gallery.js";

_run_APlayer();
_run_AV();
_run_Valine();

const lock_wait = 600;

const history = window.history;

const navigator = window.navigator;

const registerServiceWorker = swPath => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(swPath)
      .then(function () { console.log('ServiceWorker Register Successfully.') })
      .catch(function (e) { console.error(e) });
  }
};

const baiduPush = o => {
  let curProtocol = window.location.protocol.split(':')[0], url;
  if (curProtocol === 'https') {
    url = 'https://zz.bdstatic.com/linksubmit/push.js';
  }
  else {
    url = 'http://push.zhanzhang.baidu.com/push.js';
  }
  fetch(url, null, null, true);
};

const root = document.querySelector(':root');

const pathname = o => window.location.pathname;

const topping = o => root.querySelector('.m-center').offsetTop + root.querySelector('.m-header').offsetTop;

const launch = {
  _close: null,
  disable(flag) {
    if (flag) {
      let that = this;
      let hidden;
      if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
        hidden = 'hidden';
      } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
      } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
      } else {
        hidden = 'nohiddren';
      }
      if (!document[hidden]) {
        root.querySelector('.m-launch').classList.add('disabled');
      } else {
        that._close = window.setInterval(e => {
          if (!document[hidden]) {
            root.querySelector('.m-launch').classList.add('disabled');
            window.clearInterval(that._close);
            that._close = null;
          }
        }, lock_wait);
      }
    } else {
      root.querySelector('.m-launch').classList.remove('disabled');
    }
  }
};

const activateSpinner = flag => {
  flag ? root.querySelector('.m-spinner').classList.add('active') : root.querySelector('.m-spinner').classList.remove('active');
};

const progress = {
  current: 0,
  to(num) {
    if (num < 0 || num > 100) return;
    root.querySelector('.m-progress-current').style.width = num + '%';
    this.current = num;
  },
  step(num) {
    let next = this.current + num;
    if (next < 0 || next > 100) return;
    root.querySelector('.m-progress-current').style.width = next + '%';
    this.current = next;
  }
};

const applyConfig = o => {
  settings.set('night', config.get('night'));
  settings.set('langshift', config.get('langshift'));
  settings.set('transfigure', config.get('transfigure'));
  settings.set('lyride', config.get('lyride'));
  settings.set('autoplay', config.get('autoplay'));
  config.get('closeDrawer') ? xdrawer.on() : xdrawer.off();
  util.runOnDesktop(d => {
    config.get('closeAside') ? xaside.on() : xaside.off();
    skin.set(config.get('skin'));
  });
};

const sticky = e => {
  let main = root.querySelector('.m-main');
  let drawer = root.querySelector('.m-drawer');
  let aside = root.querySelector('.m-aside');
  let topOffset = topping();
  drawer.classList.remove('sticky');
  aside.classList.remove('sticky-top');
  aside.classList.remove('sticky-bottom');
  if (main.offsetHeight >= drawer.offsetHeight && main.offsetHeight >= aside.offsetHeight) {
    let totalDrawerHeight = drawer.offsetHeight + topOffset;
    if (totalDrawerHeight > window.innerHeight) {
      if (totalDrawerHeight < window.scrollY + window.innerHeight) {
        drawer.classList.add('sticky');
      } else {
        drawer.classList.remove('sticky');
      }
    }
    let totalAsideHeight = aside.offsetHeight + topOffset;
    if (totalAsideHeight > window.innerHeight) {
      aside.classList.remove('sticky-top');
      if (totalAsideHeight < window.scrollY + window.innerHeight) {
        aside.classList.add('sticky-bottom');
      } else {
        aside.classList.remove('sticky-bottom');
      }
    } else {
      aside.classList.add('sticky-top');
    }
  }
};

const setSticky = o => {
  document.removeEventListener('scroll', sticky);
  document.addEventListener('scroll', sticky);
};

const fixMainHeight = o => {
  util.runOnDesktop(p => {
    let main = root.querySelector('.m-main');
    let drawer = root.querySelector('.m-drawer');
    let aside = root.querySelector('.m-aside');
    let footer = root.querySelector('.m-footer');
    let maxHeight = drawer.scrollHeight > aside.scrollHeight ? drawer.scrollHeight : aside.scrollHeight;
    main.style.minHeight = (maxHeight - footer.offsetHeight) * 1.35 + 'px';
  });
};

const scrolling = e => {
  util.runOnDesktop(o => {
    let aside = root.querySelector('.m-aside');
    aside.scrollTop = window.scrollY * 0.65; // offset 0.35

    let drawer = root.querySelector('.m-drawer');
    //let content = root.querySelector('.m-content');
    //let drawerTop = (drawer.scrollHeight - drawer.offsetHeight) * window.scrollY / (content.offsetHeight + content.offsetTop - window.innerHeight);
    let drawerTop = window.scrollY * 0.65; // offset 0.35
    drawer.scrollTop = drawerTop;
  });
};

const setScrolling = o => {
  document.removeEventListener('scroll', scrolling);
  document.addEventListener('scroll', scrolling);
};

const final_load = o => util.layoutParts(parts => {
  let checklist = (o => {
    let result = {};
    parts.forEach(name => {
      result[name] = false;
    });
    return result;
  })();
  let looper = window.setInterval(o => {
    let flag = true;
    util.forIn(checklist, value => {
      if (value === false) {
        flag = false;
        return true;
      }
    });
    if (flag) {
      window.clearInterval(looper);
      evanyou.draw();
      listen2Links();
      launch.disable(true);
      activateSpinner(false);
      applyConfig();
      baiduPush();
    }
  }, lock_wait);
  let stepping = 30 / Object.keys(checklist).length;

  if (/^\/(index.html)?$/.test(pathname())) {
    parts.includes('hitokoto') && hitokoto.init(null, el => {
      hitokoto.update();
      checklist.hitokoto = true;
      progress.step(stepping);
    });

    api('posts', pdata => {
      parts.includes('recentposts') && recentposts.init({
        posts: pdata,
        onMore() {
          listen2Links();
        }
      }, el => {
        checklist.recentposts = true;
        progress.step(stepping);
      });
    });
  }

  if (/^\/(posts)\//.test(pathname())) {
    api(pathname().substring(1, pathname().lastIndexOf('/')), pdata => {
      parts.includes('post') && post.init({
        post: pdata,
        onFriend() {
          scrolling();
        }
      }, el => {
        checklist.post = true;
        toc.show();
        toc.update(pdata.toc, topping());
        progress.step(stepping);
      });
    });
  } else {
    toc.hide();
  }

  if (/^\/(categories|tags)\//.test(pathname())) {
    api(pathname().substring(1, pathname().lastIndexOf('/')), pdata => {
      parts.includes('timeline') && timeline.init({
        posts: pdata.postlist
      }, el => {
        checklist.timeline = true;
        progress.step(stepping);
      });
    });
  } else if (/^\/(archives)\//.test(pathname())) {
    api('posts', pdata => {
      parts.includes('timeline') && timeline.init({
        posts: pdata
      }, el => {
        checklist.timeline = true;
        progress.step(stepping);
      });
    });
  }

  if (/^\/(about)\//.test(pathname())) {
    api('pages/about', padata => {
      parts.includes('page') && page.init({
        title: padata.title,
        content: padata.content
      }, el => {
        checklist.page = true;
        progress.step(stepping);
      });
    });
  }

  if (/^\/(resume)\//.test(pathname())) {
    api('pages/resume', prdata => {
      parts.includes('page') && page.init({
        title: prdata.title,
        content: prdata.content
      }, el => {
        checklist.page = true;
        progress.step(stepping);
      });
    });
  }

  if (/^\/(letter)\//.test(pathname())) {
    api('pages/letter', pldata => {
      parts.includes('page') && page.init({
        title: pldata.title,
        content: pldata.content
      }, el => {
        checklist.page = true;
        progress.step(stepping);
      });
    });
  }

  if (/^\/(records)\//.test(pathname())) {
    api('pages/records', pldata => {
      parts.includes('page') && page.init({
        title: pldata.title,
        content: pldata.content
      }, el => {
        checklist.page = true;
        progress.step(stepping);
      });
    });
    ajax({
      url: `/records/content.json`,
      method: 'get',
      dataType: 'json',
      success(data) {
        parts.includes('records') && records.init({
          data
        }, el => {
          checklist.records = true;
          progress.step(stepping);
        });
      }
    });
  }

  if (/^\/(gallery)\//.test(pathname())) {
    api('pages/gallery', pldata => {
      parts.includes('page') && page.init({
        title: pldata.title,
        content: pldata.content
      }, el => {
        checklist.page = true;
        progress.step(stepping);
      });
    });
    ajax({
      url: `/gallery/content.json`,
      method: 'get',
      dataType: 'json',
      success(data) {
        parts.includes('gallery') && gallery.init({
          data
        }, el => {
          checklist.gallery = true;
          progress.step(stepping);
        });
      }
    });
  }

});

const pjax = {
  isRunning: false,
  queue: [],
  _run() {
    if (this.queue.length) {
      this.isRunning = true;
      let _do = this.queue.shift();
      _do.work(o => {
        this._run();
      });
    } else {
      this.isRunning = false;
    }
  },
  run(url, callback) {
    let that = this;
    that.queue.push({
      callback,
      work(cb) {
        let _that = this;
        let mainContent = root.querySelector('.m-content');
        let parts = root.querySelector('meta[name="layout-parts"]');
        let keywords = root.querySelector('meta[name="keywords"]');
        let description = root.querySelector('meta[name="description"]');
        progress.to(60);
        activateSpinner(true);
        ajax({
          url,
          method: 'get',
          dataType: 'document',
          success(data) {
            _that.callback && _that.callback(data);
            cb && cb(data);
            if (that.queue.length === 0) {
              document.title = data.title;
              parts.setAttribute('content', data.querySelector('meta[name="layout-parts"]').getAttribute('content'));
              keywords.setAttribute('content', data.querySelector('meta[name="keywords"]').getAttribute('content'));
              description.setAttribute('content', data.querySelector('meta[name="description"]').getAttribute('content'));
              mainContent.innerHTML = data.querySelector('.m-content').innerHTML;
              final_load();
            }
          }
        });
      }
    });
    !that.isRunning && that._run();
  }
};

const linksStore = {
  noPopState: true,
  setClick(e) {
    e.preventDefault();
    let url = this.href;
    if (url !== window.location.href) {
      pjax.run(url, data => {
        history.pushState({ url }, data.title, url);
      });
    }
    xsearch.off();
  }
};

const listen2Links = o => {
  if (linksStore.noPopState) {
    window.onpopstate = function (e) {
      history.state && history.state.url && pjax.run(history.state.url);
    };
    linksStore.noPopState = false;
  }
  root.querySelectorAll('.highlight a:not([target="_blank"])').forEach(link => {
    link.target = "_blank";
  });
  root.querySelectorAll('a:not([target="_blank"]):not([href*="extension/"]):not([data-listened="true"]):not(.toc-link)').forEach(link => {
    link.onclick = linksStore.setClick;
    link.setAttribute('data-listened', true);
  });
};

const listen2Title = o => {
  let origin = document.title;
  let timer = null;
  document.onvisibilitychange = function () {
    if (document.hidden) {
      document.title = config.get('langshift') ? '╭(°A°`)╮ Opps, page crashes ~' : '╭(°A°`)╮ 页面崩溃啦 ~';
      window.clearTimeout(timer);
    }
    else {
      document.title = (config.get('langshift') ? '(ฅ>ω<*ฅ) Eh, restore again~ ' : '(ฅ>ω<*ฅ) 噫又好了~ ') + origin;
      timer = window.setTimeout(e => {
        document.title = origin;
      }, 2000);
    }
  };
};

util.run(next => { // DEFAULT
  L2Dwidget.init({
    model: {
      scale: 1,
      jsonPath: '/asset/live2d/haruto.model.json'
    },
    display: {
      width: 200,
      height: 400,
      position: 'right',
      hOffset: 50,
      vOffset: 0
    },
    mobile: {
      show: false
    }
  });
  progress.to(10);
  activateSpinner(true);

  let checklist = {
    xsearch: false,
    sitename: false,
    brand: false,
    footer: false,
    comment: false,
    menus: false,
    panels: false,
    audioplayer: false,
    toc: false,
    search: false
  };
  let looper = window.setInterval(o => {
    let flag = true;
    util.forIn(checklist, value => {
      if (value === false) {
        flag = false;
        return true;
      }
    });
    if (flag) {
      window.clearInterval(looper);
      progress.to(20);
      //setSticky();
      setScrolling();
      next();
    }
  }, lock_wait);

  xsearch.init({
    onclick(state) {
      state ? search.on() : search.off();
    }
  }, el => {
    checklist.xsearch = true;
  });
  sitename.init(null, el => {
    checklist.sitename = true;
  });
  api('site', sdata => {
    registerServiceWorker(sdata.swPath);
    brand.init({
      numOfPosts: sdata.numOfPosts,
      numOfCategories: sdata.numOfCategories,
      numOfTags: sdata.numOfTags
    }, el => {
      checklist.brand = true;
    });
    footer.init(null, el => {
      fetch("//busuanzi.ibruce.info/busuanzi", {
        jsonpCallback: "BusuanziCallback_" + Math.floor(1099511627776 * Math.random())
      }, result => {
        footer.update({
          site_pv: result && result.site_pv ? result.site_pv : '∞',
          site_uv: result && result.site_uv ? result.site_uv : '∞',
          site_wd: sdata && sdata.word4site ? sdata.word4site : '∞',
        });
      }, true);
      checklist.footer = true;
    });
    comment.init({
      valine: {
        pass: sdata.valine.pass,
        pointer: sdata.valine.pointer
      },
      onupdate(appid, appkey, languageData, valineId) {
        let language = config.get('langshift') ? 'en' : 'zh-cn';
        if (languageData) {
          new Valine({
            av: AV,
            el: `#${valineId}`,
            notify: false,
            verify: false,
            app_id: appid,
            app_key: appkey,
            placeholder: languageData.comment.placeholder,
            lang: language,
            path: pathname().replace(/index.html$/, ''),
            visitor: true
          });
        }
      }
    }, el => {
      checklist.comment = true;
    });
  });
  menus.init(null, el => {
    checklist.menus = true;
  });
  api('categories', cdata => {
    api('tags', tdata => {
      panels.init({
        categories: cdata,
        tags: tdata
      }, el => {
        checklist.panels = true;
      });
    });
  });
  audioplayer.init(null, el => {
    _run_Meting();
    checklist.audioplayer = true;
  });
  toc.init(null, el => {
    checklist.toc = true;
  });
  api('search', sdata => {
    search.init({
      search: sdata,
      onsearch(k) {
        listen2Links();
      }
    }, el => {
      checklist.search = true;
    });
  });

}, { // NEXT
  desktop(final) { // DESKTOP
    let checklist = {
      goingto: false,
      extension: false,
      xdrawer: false,
      xaside: false,
      translater: false,
      skin: false,
      settings: false,
      pather: false
    };
    let looper = window.setInterval(o => {
      let flag = true;
      util.forIn(checklist, value => {
        if (value === false) {
          flag = false;
          return true;
        }
      });
      if (flag) {
        window.clearInterval(looper);
        progress.to(60);
        final();
      }
    }, lock_wait);

    evanyou.init('.m-evanyou-canvas');

    goingto.init(null, el => {
      checklist.goingto = true;
    });
    ajax({
      url: `/extension/content.json`,
      method: 'get',
      dataType: 'json',
      success(data) {
        extension.init({
          data
        }, el => {
          checklist.extension = true;
        });
      }
    });
    xdrawer.init({
      onclick(state) {
        config.set('closeDrawer', state);
      }
    }, el => {
      checklist.xdrawer = true;
    });
    xaside.init({
      onclick(state) {
        config.set('closeAside', state);
      }
    }, el => {
      checklist.xaside = true;
    });
    api('site', sdata => {
      translater.init({
        baidu_translate: {
          pass: sdata.baidu_translate.pass,
          pointer: sdata.baidu_translate.pointer
        },
        onstart(el) {
          activateSpinner(true);
        },
        onended() {
          activateSpinner(false);
        }
      }, el => {
        checklist.translater = true;
      });
      pather.init({
        abbrMatch: sdata.abbrMatch,
        menus: sdata.menus
      }, el => {
        checklist.pather = true;
      });
    });
    skin.init({
      onclick(newKey) {
        config.set('skin', newKey);
      }
    }, el => {
      checklist.skin = true;
    });
    settings.init({
      onclick(key, flag) {
        if (key === 'night') {
          flag ? root.classList.add('night') : root.classList.remove('night');
        } else if (key === 'langshift') {
          progress.to(90);
          menus.update();
          pather.update();
          lang(flag ? 'en' : 'zh-cn', ldata => {
            comment.update(ldata);
            post.updateShare(ldata);
            //sticky();
            scrolling();
            fixMainHeight();
            listen2Links();
            listen2Title();
            progress.to(100);
          });
        } else if (key === 'transfigure') {
          flag ? root.classList.add('transfigure') : root.classList.remove('transfigure');
        } else if (key === 'lyride') {
          flag ? root.classList.add('lyride') : root.classList.remove('lyride');
          scrolling();
          fixMainHeight();
        } else if (key === 'autoplay') {
          flag && audioplayer.play();
        }
        config.set(key, flag);
      }
    }, el => {
      checklist.settings = true;
    });

  },
  mobile(final) { // MOBILE
    let checklist = {
      xdrawer: false,
      settings: false
    };
    let looper = window.setInterval(o => {
      let flag = true;
      util.forIn(checklist, value => {
        if (value === false) {
          flag = false;
          return true;
        }
      });
      if (flag) {
        window.clearInterval(looper);
        launch.disable(true);
        progress.to(60);
        final();
      }
    }, lock_wait);

    xdrawer.init({
      onclick(state) {
        config.set('closeDrawer', state);
        root.scrollTop = 0;
      }
    }, el => {
      checklist.xdrawer = true;
    });
    settings.init({
      onclick(key, flag) {
        if (key === 'night') {
          flag ? root.classList.add('night') : root.classList.remove('night');
        } else if (key === 'langshift') {
          progress.to(90);
          menus.update();
          lang(flag ? 'en' : 'zh-cn', ldata => {
            comment.update(ldata);
            post.updateShare(ldata);
            listen2Links();
            progress.to(100);
          });
        } else if (key === 'lyride') {
          flag ? root.classList.add('lyride') : root.classList.remove('lyride');
        }
        config.set(key, flag);
      }
    }, el => {
      checklist.settings = true;
    });

  }
}, (final) => { // FINAL
  history.replaceState({
    url: window.location.href
  }, document.title, window.location.href);
  final_load();
});