import part from "../common/part.js";

let tag = 'audioplayer';
let element = null;

const _check = o => {
  if (!element) return;
  let timeout = 19999;
  let step = 600;
  let looper = window.setInterval(o => {
    let mjs = element.querySelector('meting-js');
    if (!mjs.aplayer) {
      timeout -= step;
    }
    if (timeout < 0) {
      window.clearInterval(looper);
      mjs.innerText = 'Σ(っ °Д °;)っ [ METING API ERROR ]！';
      mjs.style.cssText = 'display:block;padding:12px;font-size:0.88em;color:brown;text-align:center;white-space:nowrap';
    }
  }, step);
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    callback && callback(element);
    _check();
  });
};

const play = o => {
  if (element && element.querySelector('meting-js').aplayer) {
    element.querySelector('meting-js').aplayer.play();
    return;
  }
  let looper = window.setInterval(o => {
    if (element && element.querySelector('meting-js').aplayer) {
      element.querySelector('meting-js').aplayer.play();
      window.clearInterval(looper);
    }
  }, 16);
};

const pause = o => {
  if (element && element.querySelector('meting-js').aplayer) {
    element.querySelector('meting-js').aplayer.pause();
    return;
  }
  let looper = window.setInterval(o => {
    if (element && element.querySelector('meting-js').aplayer) {
      element.querySelector('meting-js').aplayer.pause();
      window.clearInterval(looper);
    }
  }, 16);
};

export default {
  tag,
  init,
  play,
  pause
};