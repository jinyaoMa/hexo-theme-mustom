import part from "../common/part.js";
import util from "../common/util.js";

let tag = 'comment';
let element = null;
let appid = '';
let appkey = '';
let onupdate = null;
const valine = {
  _dom: null,
  newDom() {
    if (this._dom) {
      this._dom.remove();
    }
    this._dom = document.createElement('div');
    this._dom.id = `valine_${Date.now()}`;
    element.querySelector('.p-comment-valine').appendChild(this._dom);
    return this._dom.id;
  }
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    if (params) {
      let result = util.decodePass(params.valine.pass, params.valine.pointer);
      appid = result.appid;
      appkey = result.appkey;
      params.onupdate && (onupdate = params.onupdate);
    }
    callback && callback(element);
  });
};

const update = langData => {
  if (!element) return;
  let v = document.querySelector('.leancloud_visitors');
  if (v) {
    v.id = window.location.pathname.replace(/\/[^\/]+.html$/, '/');
    v.setAttribute('data-flag-title', document.title.replace(/ - [^-]+$/, '').trim());
    onupdate && onupdate(appid, appkey, langData, valine.newDom());
  } else {
    onupdate && onupdate(appid, appkey, langData, valine.newDom());
  }
};

export default {
  tag,
  init,
  update
};