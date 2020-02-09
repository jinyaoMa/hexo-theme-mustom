import ajax from "./ajax.js";

const store = {};

const _update = (language, callback) => {
  let els = document.querySelectorAll('[data-lang]');
  let step = 8; // Set text appear step time
  let currentIndex = 0;
  let looper = window.setInterval(e => {
    if (currentIndex < els.length) {
      if (els[currentIndex].getAttribute('data-lang-sign') !== language) {
        let keys = els[currentIndex].getAttribute('data-lang').split('.');

        let text = null;
        keys.forEach(key => { // get language string
          if (text === null) {
            text = store[language][key];
          } else {
            text = text[key];
          }
        });

        if (els[currentIndex].hasAttribute('data-lang-params')) { // pass params into %s in the language string
          let params = els[currentIndex].getAttribute('data-lang-params');
          if (els[currentIndex].hasAttribute('data-lang-encoded')) {
            params = window.decodeURI(params);
          }
          try { // pass in an array
            params = JSON.parse(params);
            if (params.length) {
              params.forEach(p => {
                if (els[currentIndex].hasAttribute('data-lang-encoded')) {
                  text = text.replace('%s', window.decodeURI(p));
                } else {
                  text = text.replace('%s', p);
                }
              });
            } else if (!isNaN(params)) {
              if (els[currentIndex].hasAttribute('data-lang-encoded')) {
                text = text.replace('%s', window.decodeURI(params));
              } else {
                text = text.replace('%s', params);
              }
            }
          } catch (error) { // pass in a string
            if (els[currentIndex].hasAttribute('data-lang-encoded')) {
              text = text.replace('%s', window.decodeURI(params));
            } else {
              text = text.replace('%s', params);
            }
          }
        }

        if (els[currentIndex].hasAttribute('data-lang-titled')) { // set to attribute 'title'
          els[currentIndex].title = text;
        } else if (els[currentIndex].hasAttribute('data-lang-placeholdered')) { // set to attribute 'placeholder'
          els[currentIndex].placeholder = text;
        } else {
          els[currentIndex].innerHTML = `<span>${text}</span>`;
        }
        els[currentIndex].setAttribute('data-lang-sign', language);
      }
      currentIndex += 1;
    } else {
      window.clearInterval(looper);
      callback && callback(store[language]);
    }
  }, step);
};

export default (language, callback, isUpdate = true) => {
  if (language === 'zh-cn' ||
    language === 'en') {
    if (store[language]) {
      if (isUpdate) {
        _update(language, callback);
      } else {
        callback && callback(store[language]);
      }
    } else {
      ajax({
        url: `/asset/lang/${language}.json`,
        method: 'get',
        dataType: 'json',
        success(data) {
          store[language] = data;
          if (isUpdate) {
            _update(language, callback);
          } else {
            callback && callback(store[language]);
          }
        }
      });
    }
  }
};