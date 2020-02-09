import part from "../common/part.js";

let tag = 'settings';
let element = null;
let listener = null;
let setClick = null;

const setup = o => {
  // SetClick
  element.querySelectorAll('[data-settings-key]').forEach(el => {
    el.removeEventListener('click', setClick);
  });
  setClick = function (e) {
    let newKey = this.getAttribute('data-settings-key');
    set(newKey, !e.srcElement.classList.contains('active'));
  };
  element.querySelectorAll('[data-settings-key]').forEach(el => {
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

const set = (key, flag) => {
  let target = element.querySelector(`[data-settings-key="${key}"]`);
  flag ? target.classList.add('active') : target.classList.remove('active');
  listener && listener(key, flag);
}

export default {
  tag,
  init,
  set
};