import part from "../common/part.js";
import ajax from "../common/ajax.js";

let tag = 'hitokoto';
let element = null;

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
      element.querySelector('.p-hitokoto-content').innerText = data.hitokoto;
      element.querySelector('.p-hitokoto-name').innerText = data.from;
    }
  });
};

export default {
  tag,
  init,
  update
};