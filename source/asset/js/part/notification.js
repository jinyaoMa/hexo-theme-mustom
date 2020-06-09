import part from "../common/part.js";

let tag = 'notification';
let element = null;

let firstNotify = true;
let canHide = true;
let looper = null;
const clearTime = 1200;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    let msg = element.querySelector('.p-notification-message');
    msg.onmouseover = e => {
      canHide = false;
    };
    msg.onmouseout = e => {
      canHide = true;
    };
    callback && callback(element);
  });
};

const show = (text, onClose, time = 10000) => {
  if (!element) return;
  element.querySelector('.p-notification-text').innerHTML = text;
  element.classList.add('active');
  window.clearInterval(looper);
  looper = window.setInterval(o => {
    if (canHide) {
      element.classList.remove('active');
      window.clearInterval(looper);
      typeof onClose === 'function' && onClose(element);
      window.setTimeout(o => {
        let temp = element.querySelector('.p-notification-text');
        if (temp.innerHTML === text) {
          temp.innerHTML = '';
        }
      }, clearTime);
    }
  }, time);
  firstNotify && (firstNotify = false);
};

const isFirstNotify = o => {
  return firstNotify;
};

export default {
  tag,
  init,
  show,
  isFirstNotify
};