import part from "../common/part.js";

let tag = 'footer';
let element = null;

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    callback && callback(element);
  });
};

const update = data => {
  if (!element) return;
  data.site_pv !== undefined && (element.querySelector('.p-footer-pv').innerText = data.site_pv);
  data.site_uv !== undefined && (element.querySelector('.p-footer-uv').innerText = data.site_uv);
  data.site_wd !== undefined && (element.querySelector('.p-footer-wd').innerText = data.site_wd);
};

export default {
  tag,
  init,
  update
};