import part from "../common/part.js";

let tag = 'page';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);

    if (params) {
      params.title && (element.querySelector('[p-page-title]').innerText = params.title);
      params.content && (element.querySelector('[p-page-main]').innerHTML = params.content);
    }

    callback && callback(element);
  });
};

export default {
  tag,
  init
};