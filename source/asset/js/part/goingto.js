import part from "../common/part.js";

let tag = 'goingto';
let element = null;
let timerTop = null;
let timerBottom = null;
let go2Top = null;
let go2Bottom = null;

const setup = o => {
  let goingtoTop = element.querySelector('.p-goingto-top');
  let goingtoBottom = element.querySelector('.p-goingto-bottom');

  cancelAnimationFrame(timerTop);
  cancelAnimationFrame(timerBottom);
  timerTop = null;
  timerBottom = null;

  // Set go2Top
  goingtoTop.removeEventListener('click', go2Top);
  go2Top = function () {
    let decay = 0.9;

    cancelAnimationFrame(timerBottom);
    timerBottom = null;

    cancelAnimationFrame(timerTop);
    timerTop = requestAnimationFrame(function fn() {
      if (window.scrollY > 1) {
        window.scrollTo(0, window.scrollY * decay);
        timerTop = requestAnimationFrame(fn);
      } else {
        window.scrollTo(0, 0);
        cancelAnimationFrame(timerTop);
        timerTop = null;
        //console.log('TOP!');
      }
    });
  };
  goingtoTop.addEventListener('click', go2Top);

  // Set go2Bottom
  goingtoBottom.removeEventListener('click', go2Bottom);
  go2Bottom = function () {
    let growth = 0.1;
    let min = 1;
    let total = document.body.scrollHeight - window.innerHeight;
    let left = total;

    cancelAnimationFrame(timerTop);
    timerTop = null;

    cancelAnimationFrame(timerBottom);
    timerBottom = requestAnimationFrame(function fn() {
      if (left > 1) {
        window.scrollTo(0, window.scrollY + left * growth + min);
        left = total - window.scrollY;
        timerBottom = requestAnimationFrame(fn);
      } else {
        window.scrollTo(0, document.body.scrollHeight);
        cancelAnimationFrame(timerBottom);
        timerBottom = null;
        //console.log('BOTTOM!');
      }
    });
  };
  goingtoBottom.addEventListener('click', go2Bottom);
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    setup();
    callback && callback(element);
  });
};

export default {
  tag,
  init
};