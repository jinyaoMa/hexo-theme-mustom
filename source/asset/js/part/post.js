import part from "../common/part.js";
import util from "../common/util.js";
import _run_socialShare from "../plugin/socialShare.min.js";

let tag = 'post';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    _run_socialShare();

    if (params && params.post) {
      let post = params.post;
      element.querySelector('.p-post-title').innerText = post.title;
      element.querySelector('.p-post-date span').innerText = post.date;
      element.querySelector('.p-post-updated span').innerText = post.updated;
      element.querySelector('.p-post-wordcount span').innerText = post.word4post;
      element.querySelector('.p-post-min2read span').setAttribute('data-lang-params', post.min2read);
      element.querySelector('.p-post-content').innerHTML = post.content;
      let categories = element.querySelector('.p-post-categories span');
      post.categories.forEach((cat, j) => {
        let a = document.createElement('a');
        a.href = cat.url;
        a.innerText = cat.name;
        j !== 0 && categories.append(' , ');
        categories.appendChild(a);
      });
      if (!post.categories.length) {
        let c = element.querySelector('.p-post-categories');
        c && (c.style.display = 'none');
      }

      element.querySelector('.p-post-friend-button').onclick = e => {
        let qrcode = element.querySelector('.p-post-friend-qrcode');
        if (qrcode.classList.contains('active')) {
          qrcode.classList.remove('active');
        } else {
          qrcode.classList.add('active')
        }
        params.onFriend && params.onFriend();
      };

      let a = document.createElement('a');
      a.innerText = window.location.href;
      a.href = post.url;
      element.querySelector('.p-post-license-link-text').appendChild(a);

      let tags = element.querySelector('.p-post-tags');
      post.tags.forEach(tag => {
        let a = document.createElement('a');
        a.href = tag.url;
        a.innerText = tag.name;
        tags.appendChild(a);
      });

      let navigator = element.querySelector('.p-post-navigator');
      if (post.prev_post) {
        let a = document.createElement('a');
        a.href = post.prev_post.url;
        a.innerText = a.title = post.prev_post.title;
        navigator.querySelector('.p-post-navigator-prev').appendChild(a);
      } else {
        util.runOnDesktop(d => {
          navigator.querySelector('.p-post-navigator-prev').style.opacity = 0;
        });
        util.runOnMobile(m => {
          navigator.querySelector('.p-post-navigator-prev').style.display = 'none';
        });
      }
      if (post.next_post) {
        let a = document.createElement('a');
        a.href = post.next_post.url;
        a.innerText = a.title = post.next_post.title;
        navigator.querySelector('.p-post-navigator-next').appendChild(a);
      } else {
        util.runOnDesktop(d => {
          navigator.querySelector('.p-post-navigator-next').style.opacity = 0;
        });
        util.runOnMobile(m => {
          navigator.querySelector('.p-post-navigator-next').style.display = 'none';
        });
      }

      let scripts = element.querySelectorAll('script');
      let currentIndex = 0;
      (function run() {
        if (currentIndex < scripts.length) {
          let s = document.createElement('script');
          if (scripts[currentIndex].src === '') {
            s.innerHTML = scripts[currentIndex].innerHTML;
            scripts[currentIndex].parentElement.append(s);
            scripts[currentIndex].remove();
            currentIndex += 1;
            run();
          } else {
            s.async = true;
            s.src = scripts[currentIndex].src;
            s.onload = o => {
              currentIndex += 1;
              run();
            };
            scripts[currentIndex].parentElement.append(s);
            scripts[currentIndex].remove();
          }
        }
      })();

      element.querySelectorAll('link[rel~="stylesheet"]').forEach(style => {
        let s = document.createElement('link');
        s.ref = "stylesheet";
        s.href = style.href;
        style.parentElement.append(s);
        style.remove();
      });

      let fns = element.querySelectorAll('[href^="#fn"]');
      fns.forEach(fn => {
        fn.classList.add('footnote');
        fn.href = `javascript:scrollTo(0, document.querySelector('${fn.href.replace(window.location.href, '')}').offsetTop - ${params.offset || 96})`;
      });
    }

    const readmode = element.querySelector('.p-post-readmode');
    readmode.onclick = o => {
      const root = document.documentElement;
      if (root.classList.contains('readmode')) {
        root.classList.remove('readmode');
        readmode.classList.remove('active');
      } else {
        root.classList.add('readmode');
        readmode.classList.add('active');
      }
    };

    callback && callback(element);
  });
};

const updateShare = languageData => {
  if (element && element.querySelector('.p-post-share')) {
    let div = document.createElement('div');
    let img = element.querySelector('.p-post-content img');
    let description = document.querySelector('meta[name="description"]');
    let config = {
      url: window.location.href,
      source: window.location.origin,
      title: document.title,
      description: description ? description.getAttribute('content') : document.title,
      image: img ? img.src : document.querySelector('img').src,
      wechatQrcodeTitle: languageData.post.share.title,
      wechatQrcodeHelper: languageData.post.share.helper
    };
    element.querySelector('.p-post-share').innerHTML = '';
    element.querySelector('.p-post-share').appendChild(div);
    util.delay(600, o => {
      window.socialShare(div, config);
    });
  }
};

export default {
  tag,
  init,
  updateShare
};