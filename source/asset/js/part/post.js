import part from "../common/part.js";
import util from "../common/util.js";
import _run_socialShare from "../plugin/socialShare.min.js";

let tag = 'post';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);
    _run_socialShare();

    if (params && params.post) {
      let post = params.post;
      element.querySelector('[p-post-title]').innerText = post.title;
      element.querySelector('[p-post-date] span').innerText = post.date;
      element.querySelector('[p-post-updated] span').innerText = post.updated;
      element.querySelector('[p-post-wordcount] span').innerText = post.word4post;
      element.querySelector('[p-post-min2read] span').setAttribute('data-lang-params', post.min2read);
      element.querySelector('[p-post-content]').innerHTML = post.content;
      let categories = element.querySelector('[p-post-categories] span');
      post.categories.forEach((cat, j) => {
        let a = document.createElement('a');
        a.href = cat.url;
        a.innerText = cat.name;
        j !== 0 && categories.append(' , ');
        categories.appendChild(a);
      });
      if (!post.categories.length) {
        let c = element.querySelector('[p-post-categories]');
        c && (c.style.display = 'none');
      }

      element.querySelector('[p-post-friend-button]').onclick = e => {
        let qrcode = element.querySelector('[p-post-friend-qrcode]');
        if (qrcode.classList.contains('active')) {
          qrcode.classList.remove('active');
        } else {
          qrcode.classList.add('active')
        }
      };

      let a = document.createElement('a');
      a.innerText = window.location.href;
      a.href = post.url;
      element.querySelector('[p-post-license-link-text]').appendChild(a);

      let tags = element.querySelector('[p-post-tags]');
      post.tags.forEach(tag => {
        let a = document.createElement('a');
        a.href = tag.url;
        a.innerText = tag.name;
        tags.appendChild(a);
      });

      let navigator = element.querySelector('[p-post-navigator]');
      if (post.prev_post) {
        let a = document.createElement('a');
        a.href = post.prev_post.url;
        a.innerText = a.title = post.prev_post.title;
        navigator.querySelector('[p-post-navigator-prev]').appendChild(a);
      } else {
        util.runOnDesktop(d => {
          navigator.querySelector('[p-post-navigator-prev]').style.opacity = 0;
        });
        util.runOnMobile(m => {
          navigator.querySelector('[p-post-navigator-prev]').style.display = 'none';
        });
      }
      if (post.next_post) {
        let a = document.createElement('a');
        a.href = post.next_post.url;
        a.innerText = a.title = post.next_post.title;
        navigator.querySelector('[p-post-navigator-next]').appendChild(a);
      } else {
        util.runOnDesktop(d => {
          navigator.querySelector('[p-post-navigator-next]').style.opacity = 0;
        });
        util.runOnMobile(m => {
          navigator.querySelector('[p-post-navigator-next]').style.display = 'none';
        });
      }
    }

    callback && callback(element);
  });
};

const updateShare = languageData => {
  if (element && element.querySelector('[p-post-share]')) {
    let div = document.createElement('div');
    let img = element.querySelector('[p-post-content] img');
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
    element.querySelector('[p-post-share]').innerHTML = '';
    element.querySelector('[p-post-share]').appendChild(div);
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