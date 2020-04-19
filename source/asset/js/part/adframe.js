import part from "../common/part.js";

let tag = 'adframe';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);

    element.onclick = e => {
      if (element.classList.contains('close')) {
        element.classList.remove('close');
      } else {
        element.classList.add('close');
      }
    };

    callback && callback(element);
  });
};

export default {
  tag,
  init
};