import part from "../common/part.js";

let tag = 'xsearch';
let element = null;
let setClick = null;
let listener = null;
let state = false;
let preventScroll = null;

const setup = o => {
  // PreventScroll
  preventScroll = function (e) {
    e.preventDefault();
  };

  // SetClick
  element.removeEventListener('click', setClick);
  setClick = function () {
    state = !state;
    state ? on() : off();
  };
  element.addEventListener('click', setClick);
}

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

const on = o => {
  state = true;
  document.body.addEventListener('touchmove', preventScroll, false);
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  element && element.classList.add('active');
  listener && listener(state);
};

const off = o => {
  state = false;
  document.body.removeEventListener('touchmove', preventScroll, false);
  document.body.style.position = 'initial';
  document.body.style.width = 'auto';
  element && element.classList.remove('active');
  listener && listener(state);
};

export default {
  tag,
  init,
  on,
  off
};