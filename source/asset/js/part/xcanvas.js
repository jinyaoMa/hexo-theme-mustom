import part from "../common/part.js";

let tag = 'xcanvas';
let element = null;
let noCanvas = false;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    
    if (params && typeof params.noCanvas === 'boolean' && typeof params.onchange === 'function') {
      noCanvas = params.noCanvas;
      params.onchange(noCanvas, element);

      element.onclick = e => {
        noCanvas = !noCanvas;
        params.onchange(noCanvas, element);
      };
    }

    callback && callback(element);
  });
};

export default {
  tag,
  init
};