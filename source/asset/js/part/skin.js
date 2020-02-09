import part from "../common/part.js";

let tag = 'skin';
let element = null;
let listener = null;
let setClick = null;

const setup = o => {
  element.querySelectorAll('[data-skin-color]').forEach(item => {
    item.style.background = item.getAttribute('data-skin-color');
  });

  // SetClick
  element.querySelectorAll('[data-skin-key]').forEach(el => {
    el.removeEventListener('click', setClick);
  });
  setClick = function (e) {
    let newKey = this.getAttribute('data-skin-key');
    set(newKey);
  };
  element.querySelectorAll('[data-skin-key]').forEach(el => {
    el.addEventListener('click', setClick);
  });
}

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);
    setup();
    if (params) {
      params.onclick && (listener = params.onclick);
    }
    callback && callback(element);
  });
};

const set = key => {
  element.querySelectorAll('[data-skin-key].active').forEach(el => {
    el.classList.remove('active');
  });
  element.querySelector(`[data-skin-key="${key}"]`).classList.add('active');
  if (key === 'default') {
    document.querySelector(':root').classList.remove('colorful');
  } else if (key === 'colorful') {
    document.querySelector(':root').classList.add('colorful');
  }
  listener && listener(key);
}

export default {
  tag,
  init,
  set
};