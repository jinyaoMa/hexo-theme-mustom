import part from "../common/part.js";
import ajax from "../common/ajax.js";

let tag = 'hitokoto';
let element = null;

let looper = null;
let isLooping = false;
const time = 160;

let timer = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    callback && callback(element);
  });
};

const clear = o => {
  window.clearTimeout(timer);
  window.clearInterval(looper);
  isLooping = false;
};

const update = o => {
  if (!element || isLooping) return;
  window.clearTimeout(timer);
  window.clearInterval(looper);
  let type = element.getAttribute('data-type');
  ajax({
    url: element.getAttribute('data-api'),
    method: 'get',
    dataType: 'json',
    data: {
      c: type === null || type === 'r' ? '' : type
    },
    success: data => {
      data.hitokoto = data.hitokoto.trim();
      let pointer = 0;
      looper = window.setInterval(o => {
        if (element.querySelector('.p-hitokoto-content').innerText.length === 0) {
          window.clearInterval(looper);
          looper = window.setInterval(o => {
            if (pointer > data.hitokoto.length) {
              window.clearInterval(looper);
              window.clearTimeout(timer);
              isLooping = false;
              timer = window.setTimeout(update, time * 600);
            } else {
              element.querySelector('.p-hitokoto-content').innerText = data.hitokoto.substr(0, pointer++);
            }
          }, time);
          if (data.from_who === undefined || data.from_who === null || data.from_who.trim() === '') {
            element.querySelector('.p-hitokoto-name').innerText = data.from.trim();
          } else {
            element.querySelector('.p-hitokoto-name').innerText = data.from_who.trim();
          }
        } else {
          let temp = element.querySelector('.p-hitokoto-content').innerText;
          element.querySelector('.p-hitokoto-content').innerText = temp.substr(0, temp.length - 1);
          isLooping = true;
        }
      }, time);
    }
  });
};

export default {
  tag,
  init,
  update,
  clear
};