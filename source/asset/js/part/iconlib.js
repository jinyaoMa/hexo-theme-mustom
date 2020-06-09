import part from "../common/part.js";
import ajax from "../common/ajax.js";

let tag = 'iconlib';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);

    if (params) {
      if (params.readme) {
        let dom = new DOMParser().parseFromString(params.readme, 'text/html');
        dom.querySelectorAll('a[aria-hidden]').forEach(a => {
          a.remove();
        });
        dom.querySelectorAll('a:not([aria-hidden])').forEach(a => {
          a.target = '_blank';
        });

        let readme = element.querySelector('.p-iconlib-readme');
        let more = element.querySelector('.p-iconlib-more');
        more.onclick = e => {
          if (readme.classList.contains('active')) {
            readme.classList.remove('active');
          } else {
            readme.classList.add('active');
          }
        };
        readme.insertBefore(dom.body.firstElementChild, more);

        let iframe = element.querySelector('.p-iconlib-iframe');
        iframe.src = '//ma-jinyao.cn/icon-lib/';
      }
    }

    callback && callback(element);
  });
};

export default {
  tag,
  init
};