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
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
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
  let root = document.querySelector(':root');
  if (key === 'default') {
    colorIcons.clear();
    root.classList.remove('gray');
    root.classList.remove('colorful');
  } else if (key === 'gray') {
    colorIcons.clear();
    root.classList.remove('colorful');
    root.classList.add('gray');
  } else if (key === 'colorful') {
    colorIcons.run();
    root.classList.remove('gray');
    root.classList.add('colorful');
  }
  listener && listener(key);
};

const colorIcons = {
  queue: (o => {
    let result = [];
    for (let i = 1; i <= 5; i++) { // 5 colors, 1 - 5
      result.push(i);
    }
    return result;
  })(),
  run() {
    let that = this;
    let is = document.querySelectorAll('i.fas:not([data-colored="true"]), i.fab:not([data-colored="true"]), i.far:not([data-colored="true"])');
    is.forEach(i => {
      let next = that.queue.shift();
      i.classList.add('color_' + next);
      i.setAttribute('data-colored', true);
      that.queue.push(next);
    });
  },
  clear() {
    let is = document.querySelectorAll('i[data-colored="true"]');
    is.forEach(i => {
      i.className = i.className.replace(/\scolor_[1-5]/, ''); // 5 colors, 1 - 5
      i.setAttribute('data-colored', false);
    });
  }
};

export default {
  tag,
  init,
  set,
  colorIcons
};