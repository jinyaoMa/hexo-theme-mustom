import part from "../common/part.js";

let tag = 'extension';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    if (params && params.data && params.data.length) {
      let content = element.querySelector('.p-extension-content');
      params.data.forEach(item => {
        let img = document.createElement('img');
        img.src = item.icon;
        let span = document.createElement('span');
        let a = document.createElement('a');
        a.target = '_blank';
        a.href = item.link;
        span.innerText = a.title = item.name;
        a.appendChild(img);
        a.appendChild(span);
        content.appendChild(a);
      });
    }
    callback && callback(element);
  });
};

export default {
  tag,
  init
};