import part from "../common/part.js";

let tag = 'goingto';
let element = null;
let step = 0;
let timerTop = null;
let timerBottom = null;
let go2Top = null;
let go2Bottom = null;

const setup = o => {
  let goingtoTop = element.querySelector('[p-goingto-top]');
  let goingtoBottom = element.querySelector('[p-goingto-bottom');

  cancelAnimationFrame(timerTop);
  cancelAnimationFrame(timerBottom);
  timerTop = null;
  timerBottom = null;

  // Set go2Top
  goingtoTop.removeEventListener('click', go2Top);
  go2Top = function () {
    let target = document.querySelector(':root');
    let scrollHeight = target.scrollHeight;
    let viewHeight = window.innerHeight;
    step = Math.floor(scrollHeight / viewHeight) * 64; // set speed here, e.g. 16

    cancelAnimationFrame(timerTop);
    cancelAnimationFrame(timerBottom);
    timerTop = null;
    timerBottom = null;
    timerTop = requestAnimationFrame(function fn() {
      if (target.scrollTop > 0) {
        target.scrollTo(0, target.scrollTop - step);
        timerTop = requestAnimationFrame(fn);
      } else {
        cancelAnimationFrame(timerTop);
        timerTop = null;
      }
    });
  };
  goingtoTop.addEventListener('click', go2Top);

  // Set go2Bottom
  goingtoBottom.removeEventListener('click', go2Bottom);
  go2Bottom = function () {
    let target = document.querySelector(':root');
    let scrollHeight = target.scrollHeight;
    let viewHeight = window.innerHeight;
    let len = scrollHeight - viewHeight;
    step = Math.floor(scrollHeight / viewHeight) * 64; // set speed here, e.g. 16

    cancelAnimationFrame(timerTop);
    cancelAnimationFrame(timerBottom);
    timerTop = null;
    timerBottom = null;
    timerBottom = requestAnimationFrame(function fn() {
      if (target.scrollTop < len) {
        target.scrollTo(0, target.scrollTop + step);
        timerBottom = requestAnimationFrame(fn);
      } else {
        cancelAnimationFrame(timerBottom);
        timerBottom = null;
      }
    });
  };
  goingtoBottom.addEventListener('click', go2Bottom);
};

const init = (params, callback)=> {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);
    setup();
    callback && callback(element);
  });
};

export default {
  tag,
  init
};