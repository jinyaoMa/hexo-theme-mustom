import part from "../common/part.js";
import storage from "../common/storage.js";

let tag = 'adframe';
let element = null;

const stateKey = 'adFrameState';
const isClose = storage.get(stateKey) || false;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);

    if (isClose) {
      element.classList.add('close');
    }
    element.onclick = e => {
      if (element.classList.contains('close')) {
        element.classList.remove('close');
        storage.set(stateKey, false);
      } else {
        element.classList.add('close');
        storage.set(stateKey, true);
      }
    };

    callback && callback(element);
  });
};

export default {
  tag,
  init
};