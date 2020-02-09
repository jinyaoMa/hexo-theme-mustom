import part from "../common/part.js";

let tag = 'footer';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag).replaceWith(element);
    if (params) {
      element.querySelector('[p-footer-pv]').innerText = params.site_pv;
      element.querySelector('[p-footer-uv]').innerText = params.site_uv;
      element.querySelector('[p-footer-wd]').innerText = params.site_wd;
    }
    callback && callback(element);
  });
};

export default {
  tag,
  init
};