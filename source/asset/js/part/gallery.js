import part from "../common/part.js";

let tag = 'gallery';
let element = null;

const _setRecord = (dom, image) => {
  let name = dom.querySelector('.p-gallery-caption span');
  let a = dom.querySelector('.p-gallery-image a');
  let img = a.querySelector('img');

  a.title = name.innerText = image.name;
  img.src = a.href = image.url;
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);

    if (params && params.data && params.data.length) {
      let cache = element.querySelector('.p-gallery-item');
      params.data.forEach((image, i) => {
        if (i + 1 === params.data.length) {
          _setRecord(cache, image);
        } else {
          let temp = cache.cloneNode(true);
          _setRecord(temp, image);
          cache.before(temp);
        }
      });
    }

    callback && callback(element);
  });
};

export default {
  tag,
  init
};