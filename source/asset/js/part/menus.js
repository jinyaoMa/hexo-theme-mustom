import part from "../common/part.js";
import util from "../common/util.js";

let tag = 'menus';
let element = null;

const update = o => {
  if (!element) return;
  let active = element.querySelector('[data-menu-key].active');
  active && active.classList.remove('active');
  let currentKey = util.getPageKey();
  util.forEach(element.querySelectorAll('[data-menu-key]'), el => {
    if (currentKey === el.getAttribute('data-menu-key')) {
      el.classList.add('active');
      return true;
    }
  });
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    callback && callback(element);
  });
};

export default {
  tag,
  init,
  update
};