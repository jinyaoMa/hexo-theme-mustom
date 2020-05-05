import part from "../common/part.js";
import ajax from "../common/ajax.js";

let tag = 'hitokoto';
let element = null;

let looper = null;
const time = 320;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);
    callback && callback(element);
  });
};

const update = o => {
  if (!element) return;
  let type = element.getAttribute('data-type');
  ajax({
    url: element.getAttribute('data-api'),
    method: 'get',
    dataType: 'json',
    data: {
      c: type === null || type === 'r' ? '' : type
    },
    success: data => {
      let pointer = 0;
      window.clearInterval(looper);
      looper = window.setInterval(o => {
        if (pointer > data.hitokoto.length) {
          window.clearInterval(looper);
        } else {
          element.querySelector('.p-hitokoto-content').innerText = data.hitokoto.substr(0, pointer++);
        }
      }, time);
      if (data.from_who === undefined || data.from_who === null || data.from_who.trim() === '') {
        element.querySelector('.p-hitokoto-name').innerText = data.from;
      } else {
        element.querySelector('.p-hitokoto-name').innerText = data.from_who;
      }
    }
  });
};

export default {
  tag,
  init,
  update
};