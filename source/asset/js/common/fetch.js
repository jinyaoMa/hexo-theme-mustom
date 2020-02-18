/**
 * Fetch
 * 
 * @param {String} url 
 * @param {Object} params 
 * @param {Function} callback 
 * @param {Boolean} flush 
 * @param {Number} timeout 
 */
export default (url, params, callback, flush = false, timeout = 5000) => {
  let script = document.createElement('script');
  let data = '';
  let cb = null;
  let result = null;
  let isTimeout = true;
  let isNotResulted = true;
  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (data === '') {
          data += '?' + key + '=' + value;
        } else {
          data += '&' + key + '=' + value;
        }
        if (/(jsonp|callback)/.test(key.toLowerCase())) {
          cb = value;
        }
      }
    }
  }
  if (cb) {
    window[cb] = function (obj) {
      result = obj;
    };
  }
  script.onload = function () {
    if (result && isNotResulted) {
      isTimeout = false;
      callback && callback(result);
    }
    flush && script.remove();
  }
  script.onerror = function (e) {
    if (isNotResulted) {
      isTimeout = false;
      callback && callback(e);
    }
    flush && script.remove();
  }
  window.setTimeout(o => {
    if (isTimeout) {
      isNotResulted = false;
      callback && callback(null);
    }
  }, timeout);
  script.src = url + data;
  document.head.appendChild(script);
}