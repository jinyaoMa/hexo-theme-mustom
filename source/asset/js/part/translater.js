import part from "../common/part.js";
import util from "../common/util.js";

let tag = 'translater';
let element = null;
let credential = {};
let onstart = null;
let onended = null;

const data = {
  isInside: false,
  isPathIn: (path, el) => {
    let flag = false;
    if (path) {
      for (let i = 0; i < path.length; i++) {
        if (path[i] === el) {
          flag = true;
          break;
        }
      }
    }
    return flag;
  },
  setMousedown: null,
  setMouseup: null
};

const setContent = (show, content) => {
  if (element) {
    let translaterResult = element.querySelector('.p-translater-result');
    if (show) {
      translaterResult.style.display = 'block';
      translaterResult.innerHTML = content;
      element.classList.add('active');
    } else {
      translaterResult.style.display = 'none';
      translaterResult.innerHTML = '';
      element.classList.remove('active');
    }
  }
};

const setup = o => {
  let target = document.querySelector('.m-main');

  target.removeEventListener('mousedown', data.setMousedown);
  data.setMousedown = function (e) {
    data.isInside = true;
    setContent(false);
    let epath = e.path || (e.composedPath && e.composedPath());
    if (!data.isPathIn(epath, element)) {
      window.getSelection().empty();
    }
  };
  target.addEventListener('mousedown', data.setMousedown);

  document.removeEventListener('mouseup', data.setMouseup);
  data.setMouseup = function (e) {
    let query = window.getSelection().toString().trim();
    if (data.isInside && query.length > 0) {
      let epath = e.path || (e.composedPath && e.composedPath());
      let rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      element.classList.add('moved');
      element.style.transform = 'translateY(' + (window.scrollY + rect.y + rect.height - element.offsetTop + 16) + 'px)'; // set offset to target e.g. 8px
      if (data.isPathIn(epath, element.querySelector('.p-translater-bar-copy')) && query.length > 0) {
        if (document.execCommand('copy')) {
          setContent(true, '<p>Copied! 复制成功！</p>');
        }
      } else if (data.isPathIn(epath, element.querySelector('.p-translater-bar-zh'))) {
        onstart(element);
        util.baiduTranslate(credential, query, 'zh', (data) => {
          onended(element);
          if (data.error) {
            setContent(true, data.error);
          } else if (data.result) {
            setContent(true, data.result);
          }
        });
      } else if (data.isPathIn(epath, element.querySelector('.p-translater-bar-en'))) {
        onstart(element);
        util.baiduTranslate(credential, query, 'en', (data) => {
          onended(element);
          if (data.error) {
            setContent(true, data.error);
          } else if (data.result) {
            setContent(true, data.result);
          }
        });
      } else if (data.isPathIn(epath, element.querySelector('.p-translater-bar-jp'))) {
        onstart(element);
        util.baiduTranslate(credential, query, 'jp', (data) => {
          onended(element);
          if (data.error) {
            setContent(true, data.error);
          } else if (data.result) {
            setContent(true, data.result);
          }
        });
      } else {
        setContent(false);
      }
    } else {
      element.classList.remove('moved');
      element.style.transform = 'translateY(0)';
      setContent(false);
    }
    data.isInside = false;
  };
  document.addEventListener('mouseup', data.setMouseup);
};

const init = (params, callback) => {
  part(tag, el => {
    element = el;
    document.querySelector(tag) && document.querySelector(tag).replaceWith(element);
    if (params) {
      credential = util.decodePass(params.baidu_translate.pass, params.baidu_translate.pointer);
      params.onstart && (onstart = params.onstart);
      params.onended && (onended = params.onended);
      setup();
    }
    callback && callback(element);
  });
};

export default {
  tag,
  init
};