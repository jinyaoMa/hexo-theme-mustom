import part from "../common/part.js";

let tag = 'audioplayer';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);
    callback && callback(element);
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