import part from "../common/part.js";

let tag = 'xaside';
let element = null;
let setClick = null;
let listener = null;

const setup = o => {
  let target = document.querySelector(':root');

  // SetClick
  element.removeEventListener('click', setClick);
  setClick = function () {
    if (target.classList.contains('closeAside')) {
      target.classList.remove('closeAside');
      element.classList.remove('active');
      listener && listener(false);
    } else {
      target.classList.add('closeAside');
      element.classList.add('active');
      listener && listener(true);
    }
  };
  element.addEventListener('click', setClick);
}

const on = o => {
  document.querySelector(':root').classList.add('closeAside');
  element && element.classList.add('active');
};

const off = o => {
  document.querySelector(':root').classList.remove('closeAside');
  element && element.classList.remove('active');
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

export default {
  tag,
  on,
  off,
  init
};